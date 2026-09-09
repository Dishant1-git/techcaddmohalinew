/**
 * Do the two halves of the preview protocol still agree?
 *
 * The CMS and the website do not share a module graph, so the constants that
 * name each postMessage exist twice. Nothing enforces that the copies match,
 * and the failure when they drift is silent in the worst way: the pane posts a
 * draft, the frame is listening for a different string, and the preview simply
 * shows nothing — no error in either console, because neither side did
 * anything wrong on its own.
 *
 * That is not hypothetical. The website's half did not exist at all until it
 * was written, and the pane had been framing a 404 ever since it shipped.
 *
 * Run: npm run check:protocol
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const CMS = join(import.meta.dirname, '../src/components/preview/previewProtocol.ts')
const SITE = join(import.meta.dirname, '../../../components/preview/preview-protocol.ts')

/** Every `export const NAME = 'value'` in a file, as a map. */
function constants(path: string): Map<string, string> {
  const source = readFileSync(path, 'utf8')
  const found = new Map<string, string>()
  // Either quote style: the two codebases format differently, and a checker
  // that only understood one would report drift where there is none.
  for (const match of source.matchAll(/export const ([A-Z_]+)\s*=\s*['"]([^'"]*)['"]/g)) {
    found.set(match[1]!, match[2]!)
  }
  return found
}

let failed = false

try {
  const cms = constants(CMS)
  const site = constants(SITE)

  // Only the message names have to agree. Origins and device sizes are each
  // app's own business, and requiring those to match would fail for no reason.
  const shared = [...cms.keys()].filter((name) => name.startsWith('PREVIEW_'))

  if (shared.length === 0) {
    console.log('FAIL  no PREVIEW_* constants found in the CMS half — has it moved?')
    failed = true
  }

  for (const name of shared) {
    const theirs = site.get(name)
    if (theirs === undefined) {
      console.log(`FAIL  ${name} is missing from the website's half`)
      failed = true
    } else if (theirs !== cms.get(name)) {
      console.log(`FAIL  ${name} differs: CMS "${cms.get(name)}" vs site "${theirs}"`)
      failed = true
    }
  }

  if (!failed) {
    console.log(`PASS  both halves agree on ${shared.length} messages (${shared.join(', ')})`)
  }
} catch (error) {
  console.log(`FAIL  could not read a protocol file: ${(error as Error).message}`)
  failed = true
}

if (failed) process.exitCode = 1
