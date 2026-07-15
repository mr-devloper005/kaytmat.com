import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Dark-premium marketplace system: deep near-black canvas, layered graphite
  // surfaces, hairline luminous borders, and a violet→magenta gradient accent.
  // Everything downstream reads these variables so the whole site re-themes here.
  '--slot4-page-bg': '#08080e',
  '--slot4-page-text': '#f4f4fb',
  '--slot4-panel-bg': '#0e0e18',
  '--slot4-surface-bg': '#12121f',
  '--slot4-muted-text': '#9a9ab6',
  '--slot4-soft-muted-text': '#6f6f8c',
  '--slot4-accent': '#a855f7',
  '--slot4-accent-fill': '#8b5cf6',
  '--slot4-accent-soft': '#1a1430',
  '--slot4-accent-2': '#d946ef',
  '--slot4-on-accent': '#ffffff',
  '--slot4-accent-gradient': 'linear-gradient(135deg,#7c3aed 0%,#a855f7 45%,#d946ef 100%)',
  '--slot4-accent-glow': '0 10px 40px -12px rgba(168,85,247,0.55)',
  '--slot4-dark-bg': '#05050a',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#181826',
  '--slot4-cream': '#0e0e18',
  '--slot4-warm': '#0b0b14',
  '--slot4-lavender': '#0e0e18',
  '--slot4-gray': '#0b0b14',
  '--slot4-body-gradient':
    'radial-gradient(120% 70% at 50% -10%, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0) 55%), radial-gradient(90% 50% at 100% 0%, rgba(217,70,239,0.10) 0%, rgba(217,70,239,0) 50%)',
  '--editable-page-bg': '#08080e',
  '--editable-page-text': '#f4f4fb',
  '--editable-container': '1320px',
  '--editable-border': '#242438',
  '--editable-nav-bg': '#0a0a12',
  '--editable-nav-text': '#f4f4fb',
  '--editable-nav-active': '#a855f7',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#8b5cf6',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#12121f',
  '--editable-footer-bg': '#0a0a12',
  '--editable-footer-text': '#f4f4fb',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_18px_40px_-24px_rgba(0,0,0,0.9)]',
  shadowStrong: 'shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(5,5,10,0.05),rgba(5,5,10,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl border ${editablePalette.border} ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-gradient)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[var(--slot4-accent-glow)] transition duration-200 hover:brightness-110 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-gradient)] px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] shadow-[var(--slot4-accent-glow)] transition duration-200 hover:brightness-110 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
