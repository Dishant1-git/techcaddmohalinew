import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { ApiError } from '../../api'
import type { CourseCreate } from '../../api/resources/courses'
import { AppearsOn } from '../../components/common/AppearsOn'
import { SectionMediaFields } from './SectionMediaFields'
import { Button } from '../../components/common/Button'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import { Alert } from '../../components/feedback/Alert'
import { Spinner } from '../../components/feedback/Spinner'
import { Checkbox } from '../../components/form/Checkbox'
import { FormField } from '../../components/form/FormField'
import { ImageField } from '../../components/form/ImageField'
import { Input } from '../../components/form/Input'
import { RichTextEditor } from '../../components/form/RichTextEditor'
import { Select } from '../../components/form/Select'
import { SeoFields } from '../../components/form/SeoFields'
import { Switch } from '../../components/form/Switch'
import { SlugInput } from '../../components/form/SlugInput'
import { TagInput } from '../../components/form/TagInput'
import { Textarea } from '../../components/form/Textarea'
import { FormFooter } from '../../components/layout/FormFooter'
import { PageHeader } from '../../components/layout/PageHeader'
import { useToast } from '../../hooks/useToast'
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges'
import { PreviewPane } from '../../components/preview/PreviewPane'
import { SITE_ORIGIN } from '../../components/preview/previewProtocol'
import { CourseLayoutEditor } from './CourseLayoutEditor'
import { CtaFields } from './CtaFields'
import { FactsEditor } from './FactsEditor'
import { MultiSelect } from '../../components/form/MultiSelect'
import { SectionBlock } from './SectionBlock'
import { SectionOrderEditor } from './SectionOrderEditor'
import { SectionListEditor } from './SectionListEditor'
import { SyllabusEditor } from './SyllabusEditor'
import {
  COURSE_SECTIONS,
  toPreviewDraft,
  type CourseSectionId,
} from './coursePreview'
import {
  courseSchema,
  emptyCourse,
  LEVEL_OPTIONS,
  MODE_OPTIONS,
  STATUS_OPTIONS,
  type CourseFormValues,
} from './courseSchema'
import { useCourse, useCourseReferenceData, useCreateCourse, useUpdateCourse } from './useCourses'

/** Schema keys as they are labelled on this page, for the error summary. */
const FIELD_LABELS: Record<string, string> = {
  overview: 'Overview',
  videoUrl: 'Video URL',
  videoTitle: 'Video title',
  hiddenSections: 'Hidden sections',
  scheduledFor: 'Publish date',
  sectionOrder: 'Section order',
  sections: 'Page blocks',
  title: 'Course title',
  slug: 'URL slug',
  categoryId: 'Category',
  segment: 'Section',
  tagline: 'Tagline',
  eyebrow: 'Hero label',
  badge: 'Hero badge',
  h1: 'Hero heading',
  intro: 'Hero description',
  ctaPrimary: 'Primary button',
  ctaSecondary: 'Secondary button',
  facts: 'Quick facts',
  faqIds: 'FAQs',
  reviewIds: 'Reviews',
  relatedIds: 'Related courses',
  plans: 'Course plans',
  syllabusIntro: 'Syllabus introduction',
  audience: 'Who it is for',
  benefits: 'What you get',
  careerRoles: 'Career outcomes',
  projects: 'Projects',
  workflow: 'How the work runs',
  whyPoints: 'Why techcadd',
  comparisonRows: 'Comparison',
  toolItems: 'Tools, in detail',
  demand: 'Who hires for it',
  careers: 'Careers',
  tools: 'Tools',
  salary: 'Salary',
  shortDescription: 'Short description',
  description: 'Full description',
  duration: 'Duration',
  level: 'Level',
  mode: 'Delivery mode',
  thumbnail: 'Thumbnail',
  syllabus: 'Syllabus',
  highlights: 'Highlights',
  eligibility: 'Eligibility',
  certification: 'Certification',
  featured: 'Featured course',
  seo: 'SEO',
  status: 'Status',
}

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const toast = useToast()

  const existing = useCourse(id)
  const create = useCreateCourse()
  const update = useUpdateCourse()
  const { categoryOptions, faqOptions, reviewOptions, courseOptions } =
    useCourseReferenceData()

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: emptyCourse(),
    mode: 'onBlur',
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = form

  /*
    Populate once the record arrives; `reset` also clears the dirty flag so the
    guard does not fire on an untouched form.

    Layered over `emptyCourse()` rather than used raw. A course saved before a
    field existed — or fetched from an API that does not send one — arrives
    without it, and `undefined` fails the schema for every required array on
    the record. That produced a save that refused with "check the highlighted
    fields" while highlighting nothing, because the field at fault has no
    input to highlight. Defaults fill those gaps; anything the record does
    carry still wins.
  */
  /**
   * The mirror of `forApi`: the record's numbers become the form's strings.
   *
   * Without this a saved plan comes back with `months: 6` where the form's
   * schema wants text, and the whole record fails validation on load — which
   * presents as a form that will not save a course nobody has edited.
   */
  function fromApi(record: Record<string, unknown>) {
    const toText = (value: unknown) =>
      value === null || value === undefined ? '' : String(value)

    /**
     * Fills whichever of an array item's text fields the API left out.
     *
     * The same gap `fromPlan` was patched for below, generalised: a record
     * saved before a field existed, or whose field was simply never given a
     * value, arrives without the key at all, and `undefined` fails the
     * schema the same way a number does. Blank is a valid answer for these
     * fields; missing the key is not, so this turns every gap into the
     * former. Only touches keys actually named — arrays and booleans (topics,
     * tags, popular) are left to their own field-level handling.
     */
    function withText(list: unknown, keys: string[]) {
      if (!Array.isArray(list)) return undefined
      return list.map((item) => {
        if (item === null || typeof item !== 'object') return item
        const patch: Record<string, unknown> = {}
        for (const key of keys) patch[key] = toText((item as Record<string, unknown>)[key])
        return { ...item, ...patch }
      })
    }

    /** Same gap, for the one-off objects (the two hero buttons) rather than a list. */
    function withTextObject(value: unknown, keys: string[]) {
      if (value === null || typeof value !== 'object') return undefined
      const patch: Record<string, unknown> = {}
      for (const key of keys) patch[key] = toText((value as Record<string, unknown>)[key])
      return { ...(value as Record<string, unknown>), ...patch }
    }

    const patchedFields = {
      plans: withText(record.plans, ['months', 'summary', 'badge']),
      syllabus: withText(record.syllabus, ['fromPlan', 'body', 'project']),
      facts: withText(record.facts, ['label', 'value', 'icon', 'suffix']),
      audience: withText(record.audience, ['body']),
      benefits: withText(record.benefits, ['body']),
      careerRoles: withText(record.careerRoles, ['body', 'salaryStart', 'salarySenior', 'market']),
      // videoUrl is the one project field the API has always been free to
      // leave out — see 'A project's own walkthrough' on projectSchema — so a
      // project saved before an editor filled it in arrives without the key.
      projects: withText(record.projects, ['body', 'demoUrl', 'videoUrl']),
      workflow: withText(record.workflow, ['body']),
      whyPoints: withText(record.whyPoints, ['body']),
      comparisonRows: withText(record.comparisonRows, ['feature', 'ours', 'theirs']),
      toolItems: withText(record.toolItems, ['category', 'url']),
      // The API omits `url` entirely for a button that has never had one typed
      // in — 'enquiry' and 'contact' never need it — which otherwise arrives
      // as `undefined` and fails the schema the same way a missing array-item
      // field does.
      ctaPrimary: withTextObject(record.ctaPrimary, ['url']),
      ctaSecondary: withTextObject(record.ctaSecondary, ['url']),
      // Same gap on the social preview fields: nobody has to fill these in,
      // so a course that never had its og/twitter copy written arrives with
      // the keys missing rather than blank.
      seo: withTextObject(record.seo, ['ogTitle', 'ogDescription', 'twitterTitle', 'twitterDescription']),
    }
    const definedPatchedFields = Object.fromEntries(
      Object.entries(patchedFields).filter(([, value]) => value !== undefined),
    )

    /** Back to the wall-clock string the input understands, in local time. */
    const scheduledFor = record.scheduledFor
      ? (() => {
          const when = new Date(record.scheduledFor as string)
          if (Number.isNaN(when.getTime())) return ''
          const pad = (n: number) => String(n).padStart(2, '0')
          return (
            `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}` +
            `T${pad(when.getHours())}:${pad(when.getMinutes())}`
          )
        })()
      : ''

    return {
      ...record,
      scheduledFor,
      ...definedPatchedFields,
    } as Partial<CourseFormValues>
  }

  useEffect(() => {
    if (existing.data) {
      reset({ ...emptyCourse(), ...fromApi(existing.data as unknown as Record<string, unknown>) })
    }
  }, [existing.data, reset])

  const blocker = useUnsavedChanges(isDirty && !isSubmitting)

  // `useWatch` rather than `watch()` — the latter subscribes outside React's
  // knowledge and the hook rules reject it.
  const title = useWatch({ control, name: 'title' })
  const slug = useWatch({ control, name: 'slug' })
  const shortDescription = useWatch({ control, name: 'shortDescription' })
  /** Feeds the "starts from" select on each module. */
  const watchedPlans = useWatch({ control, name: 'plans' }) ?? []
  /** Decides whether the schedule date is asked for. */
  const watchedStatus = useWatch({ control, name: 'status' })

  const saving = create.isPending || update.isPending

  const [section, setSection] = useState<CourseSectionId>('basics')
  const sectionRefs = useRef(new Map<string, HTMLElement | null>())

  /** Scrolls the editor column; the preview follows via PreviewPane's focus. */
  function goToSection(id: CourseSectionId) {
    setSection(id)
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }


  // Feeds the "where this appears" note — it shows the live URL, which moves

  // with the slug as it is typed.

  const watched = useWatch({ control }) as Record<string, unknown>

  /**
   * What the preview renders.
   *
   * Recomputed on every keystroke, which is the point — but memoised on the
   * watched values so an unrelated re-render does not post an identical draft
   * into the frame and restart its animations.
   */
  const previewDraft = useMemo(
    () => toPreviewDraft(watched as Parameters<typeof toPreviewDraft>[0], categoryOptions),
    [watched, categoryOptions],
  )

  const previewAnchor = COURSE_SECTIONS.find((s) => s.id === section)?.anchor


  /**

   * Publishes and saves in one action.

   *

   * Setting the status select and then pressing Save is two steps that read as

   * one, and the step people miss is the first.

   */

  const publish =

    watched.status === 'published'

      ? undefined

      : () => {

          setValue('status', 'published', { shouldDirty: true })

          void handleSubmit(onSubmit)()

        }

  /**
   * Turns the form's strings into the numbers the API expects.
   *
   * `months` and `fromPlan` are typed and selected as text — a number input
   * that has been cleared holds '', not 0, and a <select> value is always a
   * string. Converting here rather than in the schema keeps the form's own
   * validation working on what the editor actually sees.
   */
  function forApi(values: CourseFormValues) {
    const toNumber = (value: string) => {
      const parsed = Number(value)
      return value.trim() !== '' && Number.isFinite(parsed) ? parsed : undefined
    }

    return {
      ...values,
      /**
       * `datetime-local` gives a wall-clock string with no zone. The API wants
       * an instant, so it is read in the editor's own timezone — which is what
       * they meant by "10am on Monday".
       */
      scheduledFor:
        values.status === 'scheduled' && values.scheduledFor.trim()
          ? new Date(values.scheduledFor).toISOString()
          : undefined,
      plans: values.plans.map((plan) => ({ ...plan, months: toNumber(plan.months) })),
      syllabus: values.syllabus.map((module) => ({
        ...module,
        fromPlan: toNumber(module.fromPlan ?? ''),
      })),
    }
  }

  async function onSubmit(values: CourseFormValues) {
    try {
      if (isEdit && id) {
        // forApi deliberately returns the API's numeric shape, which is not
        // the form entity's — see the note on forApi.
        await update.mutateAsync({ id, input: forApi(values) as unknown as Partial<CourseCreate> })
        toast.success('Course updated.')
      } else {
        await create.mutateAsync(forApi(values) as unknown as CourseCreate)
        toast.success('Course created.')
      }
      navigate('/courses')
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors) {
        // Map server-side validation back onto the offending inputs.
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          setError(field as keyof CourseFormValues, { message })
        }
        toast.error('Please fix the highlighted fields.')
        return
      }
      toast.error('Could not save this course', {
        description: error instanceof Error ? error.message : 'Please try again.',
      })
    }
  }

  if (isEdit && existing.isLoading) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-slate-500">
        <Spinner />
        Loading course…
      </div>
    )
  }

  if (isEdit && existing.error) {
    return (
      <Alert tone="error" title="Could not load this course">
        <p>{(existing.error as Error).message}</p>
        <Link to="/courses" className="mt-3 inline-block">
          <Button variant="secondary" size="sm">
            Back to courses
          </Button>
        </Link>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
      <PageHeader
        title={isEdit ? 'Edit Course' : 'Add Course'}
        breadcrumb={[{ label: 'Courses', to: '/courses' }, { label: isEdit ? 'Edit' : 'New' }]}
      />

      <AppearsOn module="courses" record={watched} saved={isEdit} />

      {Object.keys(errors).length > 0 && (
        <Alert tone="error" title="This course could not be saved">
          {/*
            Named, not just "check the highlighted fields".

            Not every field in the schema has an input on this page, so a
            failure on one of those left the editor reading an instruction they
            could not act on. Listing the labels means the message is always
            actionable, even when the offending value is one the form does not
            show.
          */}
          <p>Please fix:</p>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <strong className="font-medium">{FIELD_LABELS[field] ?? field}</strong>
                {(error as { message?: string })?.message
                  ? ` — ${(error as { message?: string }).message}`
                  : ''}
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {/*
        Editor on the left, the live website on the right.

        The preview is the real site in a frame, not a rebuilt approximation,
        so the question "what will this look like" is answered here rather than
        by saving and going to look. Below xl the two stack: at that width a
        split pane leaves neither side usable.
      */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* Section switcher. Selecting one scrolls this column and tells the
              preview to scroll to the part of the page it controls. */}
          <nav
            aria-label="Course sections"
            className="sticky top-0 z-10 -mx-1 flex gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white/95 p-1 backdrop-blur"
          >
            {COURSE_SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                aria-current={section === item.id ? 'true' : undefined}
                className={
                  'shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ' +
                  (section === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700')
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <section
            id="section-basics"
            ref={(node) => { sectionRefs.current.set('basics', node) }}
            aria-label="Basics"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader title="Basics" />
            <CardBody className="space-y-5">
              <FormField label="Course title" error={errors.title?.message}>
                <Input {...register('title')} placeholder="e.g. MERN Stack Development" />
              </FormField>

              <FormField label="URL slug" error={errors.slug?.message}>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <SlugInput
                      value={field.value}
                      onChange={field.onChange}
                      source={title}
                      baseUrl="techcadd.com/courses/"
                    />
                  )}
                />
              </FormField>

              <FormField
                label="Short description"
                description="Shown on course cards and search listings."
                error={errors.shortDescription?.message}
              >
                <Textarea
                  {...register('shortDescription')}
                  rows={3}
                  maxLength={200}
                  showCount
                  placeholder="A practical, project-based introduction to Python for beginners — live projects, mentor review and placement support."
                />
              </FormField>

              <FormField label="Full description" error={errors.description?.message}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="The long-form description shown further down the course page — what the course covers, who it's for, and what a student walks away with."
                    />
                  )}
                />
              </FormField>
            </CardBody>
          </Card>
          </section>

          <section
            id="section-page-copy"
            ref={(node) => { sectionRefs.current.set('page-copy', node) }}
            aria-label="Course page copy"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader
              title="Course page copy"
              subtitle="What the public course page is built from — the rest of the page is generated around these"
            />
            <CardBody className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
                <FormField
                  label="Hero label"
                  description="The small line above the heading. Blank uses the course name."
                  error={errors.eyebrow?.message}
                >
                  <Input {...register('eyebrow')} placeholder="Artificial Intelligence" />
                </FormField>

                <FormField
                  label="Badge"
                  error={errors.badge?.message}
                >
                  <Input {...register('badge')} placeholder="New" />
                </FormField>
              </div>

              <FormField
                label="Hero heading"
                description="The page's main heading. Blank generates one from the course name and section."
                error={errors.h1?.message}
              >
                <Input
                  {...register('h1')}
                  placeholder="Artificial Intelligence Course in Mohali with Live Projects & Placement Support"
                />
              </FormField>

              <FormField
                label="Hero description"
                description="The paragraph under the heading. Blank falls back to the short description."
                error={errors.intro?.message}
              >
                <Textarea
                  {...register('intro')}
                  rows={3}
                  placeholder="Job-oriented training built on live projects — small batches, daily lab practice and 100% placement assistance."
                />
              </FormField>

              <div className="grid gap-5 lg:grid-cols-2">
                <CtaFields
                  legend="Primary button"
                  name="ctaPrimary"
                  control={control}
                  register={register}
                  errors={errors.ctaPrimary}
                  fallback="Book a free demo class"
                />
                <CtaFields
                  legend="Secondary button"
                  name="ctaSecondary"
                  control={control}
                  register={register}
                  errors={errors.ctaSecondary}
                  fallback="Talk to a counsellor"
                />
              </div>

              <FormField
                label="Quick facts"
                description="The strip under the hero. Leave empty to use the generated four."
                error={errors.facts?.message}
              >
                <Controller
                  control={control}
                  name="facts"
                  render={({ field }) => (
                    <FactsEditor value={field.value} onChange={field.onChange} />
                  )}
                />
              </FormField>

              <FormField
                label="Tagline"
                description="One line: what this course actually is."
                error={errors.tagline?.message}
              >
                <Input
                  {...register('tagline')}
                  placeholder="the language behind almost every AI and backend job advertised today"
                />
              </FormField>

              <FormField
                label="Who hires for it"
                description="One sentence on demand in the local market."
                error={errors.demand?.message}
              >
                <Textarea
                  {...register('demand')}
                  rows={3}
                  placeholder="Every mid-size company in Punjab now runs on this, and most cannot hire fast enough locally."
                />
              </FormField>

          <Card flush>
            <CardHeader
              title="Hero image"
              subtitle="The picture beside the course title in the hero — also used on course cards across the site"
            />
            <CardBody>
              <FormField
                label="Hero image"
                description="Appears on the right-hand side of the hero, beside the heading."
                error={errors.thumbnail?.message}
              >
                <Controller
                  control={control}
                  name="thumbnail"
                  render={({ field }) => (
                    <ImageField value={field.value} onChange={field.onChange} aspect="video" />
                  )}
                />
              </FormField>

              {/* The wide band under the hero. It has always reused the hero
                  picture; this gives it one of its own. */}
              <SectionMediaFields
                control={control}
                imageName="highlightsImage"
                videoName="highlightsVideoUrl"
                label="Highlights band"
                where="The wide band under the hero, beside the What you get list."
              />
            </CardBody>
          </Card>

              {/* The overview and its walkthrough video, which the page shows
                  directly under the hero and before the band below. */}
              <FormField
                label="Overview"
                description="Replaces the generated overview paragraphs. One paragraph per line. Leave empty to keep the generated copy."
                error={errors.overview?.message}
              >
                <Textarea
                  {...register('overview')}
                  rows={5}
                  placeholder={
                    "techcadd's Python Course in Mohali is a practical, project-based introduction to programming for beginners.\n" +
                    "It opens with core syntax and data structures, then moves into scripts you actually run against real problems.\n" +
                    "You finish with a small application of your own, CV preparation and interview practice."
                  }
                />
              </FormField>

              <FormField
                label="Walkthrough video"
                description="A YouTube or Vimeo address. Shown in the overview section."
                error={errors.videoUrl?.message}
              >
                <Input
                  {...register('videoUrl')}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </FormField>

              <FormField label="Video title" error={errors.videoTitle?.message}>
                <Input {...register('videoTitle')} placeholder="Course walkthrough" />
              </FormField>

              <SectionBlock label="What you get" description="Benefit cards. Choose whether each sits in the hero or in its own section.">
                <Controller
                  control={control}
                  name="benefits"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      numbered={false}
                      blank={() => ({ placement: 'what-you-get' as const, title: '', body: '' })}
                      addLabel="Add benefit"
                      emptyTitle="No benefit cards"
                      emptyDescription="The page reads well without them."
                      fields={[
                        { key: 'title', label: 'Benefit', width: 'half', placeholder: 'Live project portfolio' },
                        { key: 'placement', label: 'Where', kind: 'select', width: 'half',
                          options: [
                            { value: 'what-you-get', label: 'In its own section' },
                            { value: 'hero', label: 'In the hero' },
                          ] },
                        {
                          key: 'body',
                          label: 'Description',
                          kind: 'textarea',
                          placeholder: "You'll leave with 2–3 real projects to show in an interview, not just a certificate.",
                        },
                      ]}
                      getError={(i, key) => errors.benefits?.[i]?.[key]?.message}
                    />
                  )}
                />
              </SectionBlock>


              <SectionBlock label="Who it is for" description="Numbered on the page in this order. Leave empty to use the generated groups.">
                <FormField label="Lead paragraph" error={errors.audienceIntro?.message}>
                  <Textarea
                    {...register('audienceIntro')}
                    rows={2}
                    placeholder="This course works for a specific starting point — here's who gets the most out of it."
                  />
                </FormField>
                <Controller
                  control={control}
                  name="audience"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      blank={() => ({ title: '', body: '' })}
                      addLabel="Add group"
                      emptyTitle="Using the generated audience"
                      emptyDescription="The page describes who the course suits from its category. Add a group to write your own."
                      fields={[
                        { key: 'title', label: 'Group', placeholder: 'Students after 12th' },
                        {
                          key: 'body',
                          label: 'Description',
                          kind: 'textarea',
                          placeholder: 'Fresh graduates who want a structured, practical route into the industry.',
                        },
                      ]}
                      getError={(i, key) => errors.audience?.[i]?.[key]?.message}
                    />
                  )}
                />
              </SectionBlock>


              <SectionBlock label="Tools, in detail" description="The Tools list above is enough for most courses; add rows to give each a category and a link.">
                <Controller
                  control={control}
                  name="toolItems"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      numbered={false}
                      blank={() => ({ name: '', category: '', url: '' })}
                      addLabel="Add tool"
                      emptyTitle="Using the Tools list"
                      emptyDescription="The names in Tools above are what the page shows."
                      fields={[
                        { key: 'name', label: 'Tool', width: 'half', placeholder: 'Python' },
                        { key: 'category', label: 'Category', width: 'half', placeholder: 'Programming language' },
                        { key: 'url', label: 'Link', placeholder: 'https://www.python.org' },
                        { key: 'media', idKey: 'mediaId', label: 'Image', kind: 'image' },
                      ]}
                      getError={(i, key) => errors.toolItems?.[i]?.[key]?.message}
                    />
                  )}
                />
              </SectionBlock>


              <SectionBlock label="Career outcomes" description="Roles this course leads to, with the salary bands shown on the page.">
                <Controller
                  control={control}
                  name="careerRoles"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      blank={() => ({ role: '', body: '', salaryStart: '', salarySenior: '', market: '' })}
                      addLabel="Add role"
                      emptyTitle="Using the generated outcomes"
                      emptyDescription="The page lists careers from the Careers field with one shared salary line. Add a role here to give each its own."
                      fields={[
                        { key: 'role', label: 'Job title', placeholder: 'Data Analyst' },
                        {
                          key: 'body',
                          label: 'What the role does',
                          kind: 'textarea',
                          placeholder: 'Cleans and analyses business data, and builds the dashboards decisions get made from.',
                        },
                        { key: 'salaryStart', label: 'Starting salary', width: 'half', placeholder: '₹2.4 LPA' },
                        { key: 'salarySenior', label: 'With experience', width: 'half', placeholder: '₹6 LPA' },
                        { key: 'market', label: 'Market', width: 'half', placeholder: 'Mohali & Punjab' },
                      ]}
                      getError={(i, key) => errors.careerRoles?.[i]?.[key]?.message}
                    />
                  )}
                />

                <SectionMediaFields
                  control={control}
                  imageName="careerImage"
                  videoName="careerVideoUrl"
                  label="Career and future scope"
                  where="Section 8 - Future outcomes."
                />

                <SectionMediaFields
                  control={control}
                  imageName="reviewsImage"
                  videoName="reviewsVideoUrl"
                  label="Student reviews"
                  where="Section 11 - the reviews band."
                />

              </SectionBlock>


              <SectionBlock label="Projects" description="What a student builds and shows.">
                <Controller
                  control={control}
                  name="projects"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      blank={() => ({ title: '', body: '', tags: [], demoUrl: '', videoUrl: '' })}
                      addLabel="Add project"
                      emptyTitle="Using the generated projects"
                      emptyDescription="The page suggests projects from the course tools. Add one here to list the real brief."
                      fields={[
                        { key: 'title', label: 'Project', placeholder: 'E-commerce Product Catalog' },
                        {
                          key: 'body',
                          label: 'What it involves',
                          kind: 'textarea',
                          placeholder: 'Build a searchable product listing with a cart and checkout flow.',
                        },
                        { key: 'tags', label: 'Technologies', kind: 'tags' },
                        { key: 'demoUrl', label: 'Demo link', placeholder: 'https://your-demo-link.com' },
                        /* Media. Both optional, and both stored in columns the
                           project table has always had. */
                        {
                          key: 'videoUrl',
                          label: 'YouTube link',
                          placeholder: 'https://www.youtube.com/watch?v=…',
                        },
                        { key: 'media', idKey: 'mediaId', label: 'Image', kind: 'image' },
                      ]}
                      getError={(i, key) => errors.projects?.[i]?.[key]?.message}
                    />
                  )}
                />
              </SectionBlock>


              <SectionBlock label="How the work runs" description="The numbered steps a student moves through.">
                <Controller
                  control={control}
                  name="workflow"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      blank={() => ({ title: '', body: '' })}
                      addLabel="Add step"
                      emptyTitle="Using the generated steps"
                      emptyDescription="Add a step to describe how this course in particular is run."
                      fields={[
                        { key: 'title', label: 'Step', placeholder: 'Understand' },
                        {
                          key: 'body',
                          label: 'What happens',
                          kind: 'textarea',
                          placeholder: 'Review the brief, ask questions, and confirm what "done" looks like before writing code.',
                        },
                      ]}
                      getError={(i, key) => errors.workflow?.[i]?.[key]?.message}
                    />
                  )}
                />

                <SectionMediaFields
                  control={control}
                  imageName="learningImage"
                  videoName="learningVideoUrl"
                  label="How the work runs"
                  where="Above the Find your pace duration guide."
                />

              </SectionBlock>


              <SectionBlock label="Why techcadd" description="Why this institute, for this course.">
                <FormField label="Lead paragraph" error={errors.whyIntro?.message}>
                  <Textarea
                    {...register('whyIntro')}
                    rows={2}
                    placeholder="What makes this course at techcadd different from a typical alternative."
                  />
                </FormField>
                <Controller
                  control={control}
                  name="whyPoints"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      numbered={false}
                      blank={() => ({ title: '', body: '' })}
                      addLabel="Add reason"
                      emptyTitle="Using the site-wide reasons"
                      emptyDescription="Add a point to say something specific to this course."
                      fields={[
                        { key: 'title', label: 'Reason', placeholder: 'Mentors who still ship client work' },
                        {
                          key: 'body',
                          label: 'Detail',
                          kind: 'textarea',
                          placeholder: 'Not full-time lecturers — trainers who are still doing the job they teach.',
                        },
                      ]}
                      getError={(i, key) => errors.whyPoints?.[i]?.[key]?.message}
                    />
                  )}
                />

                <SectionMediaFields
                  control={control}
                  imageName="whyImage"
                  videoName="whyVideoUrl"
                  label="Why this programme"
                  where="Section 4 - Why this programme is worth your year."
                />

                <SectionMediaFields
                  control={control}
                  imageName="caseImage"
                  videoName="caseVideoUrl"
                  label="The case for it banner"
                  where="Section 4b - the Why now banner below it."
                />

              </SectionBlock>


              <SectionBlock label="Comparison" description="Feature by feature against what is typically offered elsewhere.">
                <FormField label="Lead paragraph" error={errors.comparisonIntro?.message}>
                  <Textarea
                    {...register('comparisonIntro')}
                    rows={2}
                    placeholder="What actually differs between this course at techcadd and a typical alternative."
                  />
                </FormField>
                <FormField
                  label="Second column heading"
                  description="Blank shows Other institutes."
                  error={errors.comparisonOthers?.message}
                >
                  <Input {...register('comparisonOthers')} placeholder="Other institutes" />
                </FormField>
                <Controller
                  control={control}
                  name="comparisonRows"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      numbered={false}
                      blank={() => ({ feature: '', ours: '', theirs: '' })}
                      addLabel="Add row"
                      emptyTitle="Using the generated comparison"
                      emptyDescription="Add a row to compare on something specific to this course."
                      fields={[
                        { key: 'feature', label: 'Feature', width: 'half', placeholder: 'Live project work' },
                        { key: 'ours', label: 'At techcadd', width: 'half', placeholder: 'Every course, from week one' },
                        { key: 'theirs', label: 'Elsewhere', width: 'half', placeholder: 'Varies, often only at the end' },
                      ]}
                      getError={(i, key) => errors.comparisonRows?.[i]?.[key]?.message}
                    />
                  )}
                />
                <FormField label="Closing note" error={errors.comparisonNote?.message}>
                  <Input
                    {...register('comparisonNote')}
                    placeholder="Every comparison here is about substance, not marketing language."
                  />
                </FormField>
              </SectionBlock>

              <SectionBlock
                label="FAQs, reviews and related courses"
                description="Chosen from the FAQ, Review and Course modules rather than retyped here — edit the record itself and every course showing it updates."
              >
                <FormField
                  label="FAQs"
                  description="Shown in this order. Leave empty and the page picks the questions filed under this course's category."
                  error={errors.faqIds?.message}
                >
                  <Controller
                    control={control}
                    name="faqIds"
                    render={({ field }) => (
                      <MultiSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={faqOptions}
                        placeholder="Choose questions…"
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Reviews"
                  description="Leave empty to use the site-wide selection."
                  error={errors.reviewIds?.message}
                >
                  <Controller
                    control={control}
                    name="reviewIds"
                    render={({ field }) => (
                      <MultiSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={reviewOptions}
                        placeholder="Choose reviews…"
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Related courses"
                  description="Leave empty and the page suggests courses that share careers and tools with this one."
                  error={errors.relatedIds?.message}
                >
                  <Controller
                    control={control}
                    name="relatedIds"
                    render={({ field }) => (
                      <MultiSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={courseOptions}
                        placeholder="Choose courses…"
                        maxItems={6}
                      />
                    )}
                  />
                </FormField>
              </SectionBlock>


              <FormField label="Careers" description="Job titles this course leads to.">
                <Controller
                  control={control}
                  name="careers"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      maxTags={12}
                      placeholder="e.g. Data Analyst"
                    />
                  )}
                />
              </FormField>

              <FormField label="Tools" description="Software and frameworks taught.">
                <Controller
                  control={control}
                  name="tools"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      maxTags={20}
                      placeholder="e.g. Python"
                    />
                  )}
                />
              </FormField>

              <SectionBlock
                label="Course plans"
                description="Enrolment lengths this course offers. Add plans first — each module below then says which plan it starts from, and the comparison table is built from that."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Syllabus introduction" error={errors.syllabusIntro?.message}>
                    <Textarea
                      {...register('syllabusIntro')}
                      rows={2}
                      placeholder="A short paragraph introducing the module breakdown below."
                    />
                  </FormField>
                  <FormField label="Closing note" error={errors.syllabusNote?.message}>
                    <Input
                      {...register('syllabusNote')}
                      placeholder="Every module includes hands-on practice, not just theory."
                    />
                  </FormField>
                </div>

                <SectionMediaFields
                  control={control}
                  imageName="syllabusImage"
                  videoName="syllabusVideoUrl"
                  label="Syllabus"
                  where="Above the plan comparison table."
                />

                <Controller
                  control={control}
                  name="plans"
                  render={({ field }) => (
                    <SectionListEditor
                      value={field.value}
                      onChange={field.onChange}
                      blank={() => ({ label: '', months: '', summary: '', badge: '', popular: false })}
                      addLabel="Add plan"
                      emptyTitle="One length only"
                      emptyDescription="Most courses run one way. Add plans to offer several enrolment lengths and compare what each covers."
                      fields={[
                        { key: 'label', label: 'Plan name', placeholder: 'Practitioner', width: 'half' },
                        { key: 'months', label: 'Months', placeholder: '3', width: 'half' },
                        {
                          key: 'summary',
                          label: 'Summary',
                          kind: 'textarea',
                          placeholder: 'A fast, focused path for someone who already knows the basics.',
                        },
                        { key: 'badge', label: 'Badge', placeholder: 'Most popular', width: 'half' },
                      ]}
                      getError={(i, key) => errors.plans?.[i]?.[key]?.message}
                    />
                  )}
                />
              </SectionBlock>

              <FormField
                label="Salary band"
                description="A realistic fresher range for the region."
                error={errors.salary?.message}
              >
                <Input {...register('salary')} placeholder="₹2.4–4.2 LPA" />
              </FormField>
            </CardBody>
          </Card>
          </section>

          <section
            id="section-curriculum"
            ref={(node) => { sectionRefs.current.set('curriculum', node) }}
            aria-label="Curriculum"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader title="Syllabus" subtitle="Drag to reorder; each module can list its topics" />
            <CardBody>
              <Controller
                control={control}
                name="syllabus"
                render={({ field }) => (
                  <SyllabusEditor
                    value={field.value}
                    onChange={field.onChange}
                    plans={watchedPlans}
                    getError={(i) => errors.syllabus?.[i]?.title?.message}
                  />
                )}
              />
            </CardBody>
          </Card>
          </section>

          <section
            id="section-layout"
            ref={(node) => { sectionRefs.current.set('layout', node) }}
            aria-label="Page layout"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader
              title="Page layout"
              subtitle="Every section of the course page, in order. Drag to rearrange, switch one off, or add your own between any two."
            />
            <CardBody className="space-y-6">
              <SectionBlock
                label="Section order"
                description="Drag to change the order these appear on the page. Sections you have switched off keep their place, so you can see where one would land before turning it back on."
              >
                <Controller
                  control={control}
                  name="sectionOrder"
                  render={({ field }) => (
                    <Controller
                      control={control}
                      name="hiddenSections"
                      render={({ field: hiddenField }) => (
                        <SectionOrderEditor
                          value={field.value ?? []}
                          onChange={field.onChange}
                          hidden={hiddenField.value ?? []}
                        />
                      )}
                    />
                  )}
                />
              </SectionBlock>

              <Controller
                control={control}
                name="sections"
                render={({ field: sectionsField }) => (
                  <Controller
                    control={control}
                    name="hiddenSections"
                    render={({ field: hiddenField }) => (
                      <CourseLayoutEditor
                        sections={sectionsField.value ?? []}
                        hidden={hiddenField.value ?? []}
                        onSectionsChange={sectionsField.onChange}
                        onHiddenChange={hiddenField.onChange}
                        // No cast: these really are FieldError objects, and
                        // pretending they were strings is what put one into
                        // JSX as a child.
                        errors={errors.sections}
                      />
                    )}
                  />
                )}
              />
            </CardBody>
          </Card>
          </section>

          <section
            id="section-details"
            ref={(node) => { sectionRefs.current.set('details', node) }}
            aria-label="Details"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader title="Details" />
            <CardBody className="grid gap-5 sm:grid-cols-2">
              <FormField label="Duration" error={errors.duration?.message}>
                <Input {...register('duration')} placeholder="e.g. 6 months" />
              </FormField>

              <FormField label="Level">
                <Select {...register('level')} options={LEVEL_OPTIONS} />
              </FormField>

              <FormField label="Highlights" className="sm:col-span-2">
                <Controller
                  control={control}
                  name="highlights"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. Placement assistance"
                    />
                  )}
                />
              </FormField>

              <FormField label="Eligibility">
                <Input {...register('eligibility')} placeholder="e.g. 12th pass" />
              </FormField>

              <FormField label="Certification">
                <Input {...register('certification')} placeholder="e.g. techcadd certificate" />
              </FormField>
              {/* Photographs of the two certificates. With none, the page
                  keeps the drawn mock-ups. */}
              <SectionMediaFields
                control={control}
                imageName="certImage"
                videoName="certVideoUrl"
                label="Course certificate"
                where="The certificate visuals - replaces the drawn mock-up."
              />

              <FormField label="Project certificate image">
                <Controller
                  control={control}
                  name="certProjectImage"
                  render={({ field }) => (
                    <ImageField value={field.value} onChange={field.onChange} aspect="video" />
                  )}
                />
              </FormField>

            </CardBody>
          </Card>
          </section>

          <section
            id="section-media"
            ref={(node) => { sectionRefs.current.set('media', node) }}
            aria-label="Media"
            className="scroll-mt-4"
          >
          </section>

          <section
            id="section-publishing"
            ref={(node) => { sectionRefs.current.set('publishing', node) }}
            aria-label="Publishing"
            className="scroll-mt-4"
          >
          <Card flush>
            <CardHeader title="Publishing" />
            <CardBody className="space-y-5">
              <FormField label="Status">
                <Select {...register('status')} options={STATUS_OPTIONS} />
              </FormField>

              {/* Only asked for when it is the only thing that makes sense —
                  a date beside "Draft" invites one to be set and ignored. */}
              {watchedStatus === 'scheduled' && (
                <FormField
                  label="Goes live"
                  description="The course stays hidden until this moment, then publishes itself the next time the website asks for courses."
                  error={errors.scheduledFor?.message}
                >
                  <Input type="datetime-local" {...register('scheduledFor')} />
                </FormField>
              )}

              <FormField
                label="Section"
                description="Which part of the site this course appears under."
              >
                <Select
                  {...register('segment')}
                  options={[
                    { value: 'courses', label: 'Courses' },
                    { value: 'internship-training', label: 'Internship training' },
                    { value: 'after-12th-courses', label: 'After 12th' },
                  ]}
                />
              </FormField>

              <FormField label="Delivery mode">
                <Select {...register('mode')} options={MODE_OPTIONS} />
              </FormField>

              <FormField
                label="Category"
                description={
                  categoryOptions.length === 0 ? 'No categories exist yet.' : undefined
                }
              >
                {/* Controlled — see the note on FacultyFormPage's branch select. */}
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ?? ''}
                      options={categoryOptions}
                      placeholder="Uncategorised"
                      disabled={categoryOptions.length === 0}
                    />
                  )}
                />
              </FormField>

              <Controller
                control={control}
                name="featured"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="Featured course"
                    description="Pinned to the homepage."
                  />
                )}
              />
            </CardBody>
          </Card>
          </section>

          <section
            id="section-seo"
            ref={(node) => { sectionRefs.current.set('seo', node) }}
            aria-label="SEO"
            className="scroll-mt-4"
          >
          <Controller
            control={control}
            name="seo"
            render={({ field }) => (
              <SeoFields
                value={field.value}
                onChange={field.onChange}
                previewUrl={`techcadd.com/courses/${slug || 'your-slug'}`}
                fallbackTitle={title}
                fallbackDescription={shortDescription}
                errors={{
                  metaTitle: errors.seo?.metaTitle?.message,
                  metaDescription: errors.seo?.metaDescription?.message,
                }}
              />
            )}
          />

          <Card flush className="mt-6">
            <CardHeader
              title="Search and social"
              subtitle="Blank means the page keeps doing what it does now."
            />
            <CardBody className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <FormField
                  label="Social title"
                  description="Used when the page is shared. Blank uses the meta title."
                  error={errors.seo?.ogTitle?.message}
                >
                  <Input
                    {...register('seo.ogTitle')}
                    placeholder="Best Python Course in Mohali | techcadd"
                  />
                </FormField>
                <FormField
                  label="Social description"
                  error={errors.seo?.ogDescription?.message}
                >
                  <Input
                    {...register('seo.ogDescription')}
                    placeholder="Learn Python with live projects, mentor review and 100% placement assistance."
                  />
                </FormField>
                <FormField
                  label="Twitter title"
                  description="Blank uses the social title, then the heading."
                  error={errors.seo?.twitterTitle?.message}
                >
                  <Input
                    {...register('seo.twitterTitle')}
                    placeholder="Best Python Course in Mohali | techcadd"
                  />
                </FormField>
                <FormField
                  label="Twitter description"
                  error={errors.seo?.twitterDescription?.message}
                >
                  <Input
                    {...register('seo.twitterDescription')}
                    placeholder="Learn Python with live projects, mentor review and 100% placement assistance."
                  />
                </FormField>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-5">
                <Controller
                  control={control}
                  name="seo.robotsIndex"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      label="Let search engines index this page"
                      description="Off sends noindex. The page still works for anyone with the link."
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="seo.inSitemap"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      label="List it in sitemap.xml"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="seo.faqSchema"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      label="Publish FAQ structured data"
                      description="Only applies when the course shows FAQs."
                    />
                  )}
                />
              </div>
            </CardBody>
          </Card>
          </section>
        </div>

        {/*
          Sticky, and its own scroll container, so the page under review stays
          in view while the editor works down the form. `liveUrl` is only
          offered once the course exists and is published — a link to a page
          that would 404 is worse than no link.
        */}
        <PreviewPane
          kind="course"
          draft={previewDraft}
          focus={previewAnchor}
          liveUrl={
            isEdit && watched.status === 'published' && slug
              ? `${SITE_ORIGIN}/${watched.segment ?? 'courses'}/${slug}`
              : undefined
          }
          className="h-[70vh] xl:sticky xl:top-4 xl:h-[calc(100vh-7rem)]"
        />
      </div>

      <FormFooter
        onPublish={publish}
        cancelTo="/courses"
        submitLabel={isEdit ? 'Save changes' : 'Create course'}
        saving={saving}
        dirty={isDirty}
        blocker={blocker}
        entityLabel="course"
      />
    </form>
  )
}
