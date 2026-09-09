/**
 * Puts the Mohali website's gallery photos and testimonials into the CMS.
 *
 * Why this is separate from `import-mohali-site.ts`
 * -------------------------------------------------
 * That script only moves text between two databases. This one copies files:
 * each of the site's `public/gallery/*.png` is written into the CMS's uploads
 * directory and given a `media` row, which is what makes it appear in the
 * media library and editable like anything an admin uploaded themselves.
 *
 * Copied rather than referenced. A `media` row pointing at `/gallery/x.png`
 * would resolve against the website and work there, but the CMS resolves media
 * against its own origin — so every thumbnail in the library would be a broken
 * image, and an editor cannot pick a photo they cannot see.
 *
 * Idempotent. Matched on the original filename, kept in `media.folder`, so
 * re-running adds only what is missing and never duplicates an album.
 *
 * Usage
 * -----
 *   cd cms-techcadd/backend
 *   npm run db:import-mohali-media
 *
 *   DRY_RUN=1 npm run db:import-mohali-media
 */

import { randomUUID } from 'node:crypto'
import { copyFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'

import { execute, queryOne, pool, type Row } from '../src/db/pool.js'
import { config } from '../src/config.js'

// The site's own registries, read directly — same reasoning as the sibling
// import script: one source of truth for what the website currently shows.
import { galleryTiles } from '../../../src/lib/gallery.js'
import { testimonials } from '../../../src/lib/courses.js'
import { googleReviewsUrl } from '../../../src/lib/reviews.js'

const DRY_RUN = process.env.DRY_RUN === '1'
const now = () => new Date()

/** Where the website keeps the originals. */
const SITE_PUBLIC = resolve(import.meta.dirname, '../../../public')
/** Where the CMS serves uploads from. */
const UPLOAD_ROOT = resolve(config.UPLOAD_DIR)

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

const tally = { media: 0, images: 0, testimonials: 0, skipped: 0 }

/**
 * Copies one site image into the CMS and returns its media id.
 *
 * `folder` carries the original filename, which is what makes this repeatable:
 * the uploaded copy gets a random name like everything else in the library, so
 * without recording where it came from a second run could not tell that the
 * photo is already there.
 */
async function importMedia(publicPath: string, alt: string): Promise<string | null> {
  const marker = `site:${publicPath}`

  const existing = await queryOne<Row>('SELECT id FROM media WHERE folder = ? LIMIT 1', [marker])
  if (existing) {
    tally.skipped++
    return existing.id as string
  }

  const source = join(SITE_PUBLIC, publicPath.replace(/^\//, ''))

  let size: number
  try {
    size = (await stat(source)).size
  } catch {
    console.warn(`  ! missing on disk, skipped: ${publicPath}`)
    return null
  }

  const ext = extname(source).toLowerCase()
  const id = randomUUID()
  const storedName = `${id}${ext}`

  if (!DRY_RUN) {
    await mkdir(UPLOAD_ROOT, { recursive: true })
    await copyFile(source, join(UPLOAD_ROOT, storedName))

    await execute(
      `INSERT INTO media (id, filename, url, mime_type, size, alt, folder, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        storedName,
        `/uploads/${storedName}`,
        MIME[ext] ?? 'image/png',
        size,
        alt.slice(0, 255),
        marker,
        now(),
        now(),
      ],
    )
  }

  tally.media++
  console.log(`  + media  ${publicPath}`)
  return id
}

/* ------------------------------------------------------------------ */
/* Gallery                                                              */
/* ------------------------------------------------------------------ */

/**
 * One album holding the whole wall.
 *
 * The site's gallery is a single masonry wall with no grouping, so inventing
 * albums here would impose a structure the design does not have. An editor who
 * wants albums can split this one; an importer should not guess.
 */
async function importGallery(): Promise<void> {
  const slug = 'campus-life'

  let albumId = (
    await queryOne<Row>('SELECT id FROM gallery_albums WHERE slug = ? LIMIT 1', [slug])
  )?.id as string | undefined

  if (!albumId) {
    albumId = randomUUID()
    console.log(`  + album  ${slug}`)
    if (!DRY_RUN) {
      await execute(
        `INSERT INTO gallery_albums (id, title, slug, description, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'published', ?, ?)`,
        [
          albumId,
          'Campus & classrooms',
          slug,
          'Photographs from the Mohali centre — classrooms, labs, workshops and ceremonies.',
          now(),
          now(),
        ],
      )
    }
  }

  for (const [position, tile] of galleryTiles.entries()) {
    const mediaId = await importMedia(tile.src, tile.alt)
    if (!mediaId || DRY_RUN) continue

    const already = await queryOne<Row>(
      'SELECT id FROM gallery_images WHERE album_id = ? AND media_id = ? LIMIT 1',
      [albumId, mediaId],
    )
    if (already) continue

    await execute(
      `INSERT INTO gallery_images (id, album_id, media_id, caption, position)
       VALUES (?, ?, ?, ?, ?)`,
      [randomUUID(), albumId, mediaId, tile.alt.slice(0, 255), position],
    )
    tally.images++
  }
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */

/**
 * The home page's student quotes, as CMS testimonials.
 *
 * `video_url` is deliberately left empty. A testimonial video has to be a real
 * recording of a real student, and there is nothing to point at yet — the
 * field is there for the office to fill in from the CMS, and the reviews page
 * grows a play button the moment they do.
 */
async function importTestimonials(): Promise<void> {
  for (const quote of testimonials) {
    const existing = await queryOne<Row>(
      'SELECT id FROM testimonials WHERE student_name = ? LIMIT 1',
      [quote.name],
    )
    if (existing) {
      tally.skipped++
      continue
    }

    console.log(`  + testimonial  ${quote.name}`)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO testimonials
         (id, student_name, batch, rating, quote, google_review_url, featured, status, created_at, updated_at)
       VALUES (?, ?, ?, 5, ?, ?, 0, 'published', ?, ?)`,
      [
        randomUUID(),
        quote.name.slice(0, 120),
        // The site prints the role under the name; the CMS calls that field
        // `batch`, which is what the reviews page renders in the same place.
        `${quote.role} · ${quote.company}`.slice(0, 120),
        quote.quote,
        googleReviewsUrl,
        now(),
        now(),
      ],
    )
    tally.testimonials++
  }
}

/* ------------------------------------------------------------------ */

async function main(): Promise<void> {
  if (DRY_RUN) console.log('DRY RUN — nothing will be written.\n')

  await importGallery()
  await importTestimonials()

  console.log(
    `\nMedia ${tally.media}, gallery images ${tally.images}, ` +
      `testimonials ${tally.testimonials}, left alone ${tally.skipped}.`,
  )
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => pool.end())
