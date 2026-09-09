import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

import { FormField } from '../../components/form/FormField'
import { ImageField } from '../../components/form/ImageField'
import { Input } from '../../components/form/Input'

/**
 * The optional picture and video for one section of the course page.
 *
 * Sits inside the section it belongs to, under the fields that were already
 * there — not on a page of its own. Which is the point: an editor writing the
 * "Why this programme" copy should be able to attach its picture without going
 * anywhere else, and should be able to ignore both boxes entirely.
 *
 * Both are optional and independent: image only, video only, both, or neither.
 * A section with neither renders exactly as it does today.
 *
 * Alt text is not asked for here. It lives on the file in the media library —
 * the same rule the course thumbnail has always followed — so one description
 * serves every place the picture is used rather than drifting between them.
 */
export function SectionMediaFields<T extends FieldValues>({
  control,
  imageName,
  videoName,
  label,
  where,
}: {
  control: Control<T>
  imageName: Path<T>
  videoName: Path<T>
  /** Names the section in the field labels, e.g. "Why this programme". */
  label: string
  /** Where on the public page this pair appears, in a few words. */
  where?: string
}) {
  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/60 p-3">
      {/* Named, not just "Media".
          Six of these blocks sit on one long form, and an unlabelled pair of
          boxes gives an editor no way to tell which picture they are about to
          replace. */}
      <p className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
        {label} — media
      </p>
      {where && <p className="mt-1 text-xs text-slate-500">{where}</p>}

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <FormField
          label="Image"
          description={`Shown in the ${label} section on the course page.`}
        >
          <Controller
            control={control}
            name={imageName}
            render={({ field }) => (
              <ImageField value={field.value} onChange={field.onChange} aspect="video" />
            )}
          />
        </FormField>

        <FormField
          label="YouTube link"
          description={`Plays inside the ${label} section, not on YouTube.`}
        >
          <Controller
            control={control}
            name={videoName}
            render={({ field }) => (
              <Input
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder={`YouTube link for ${label}`}
                aria-label={`${label} YouTube link`}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  )
}
