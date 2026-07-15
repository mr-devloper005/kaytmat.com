import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Baby, Bitcoin, BookOpen, Briefcase, Building2, Camera, Car,
  DollarSign, Dumbbell, Factory, Gamepad2, GraduationCap, HeartPulse, Home as HomeIcon,
  Laptop, MapPin, Music, Newspaper, Package, Palette, PawPrint, Plane, Scale, Search, Share2,
  Shirt, ShoppingBag, Sofa, Sparkles, Tag, Truck, UtensilsCrossed, Wrench,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ------------------------------- helpers -------------------------------- */
function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function fieldOf(post: SitePost, keys: string[]) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function priceOf(post: SitePost) {
  return fieldOf(post, ['price', 'amount', 'budget'])
}

function hasRealImage(post: SitePost) {
  const img = getEditablePostImage(post)
  return Boolean(img) && !img.includes('placeholder')
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

// Icon per category slug, with a graceful fallback so any list still renders.
const categoryIcon: Record<string, typeof Tag> = {
  business: Briefcase, health: HeartPulse, technology: Laptop, 'real-estate': Building2,
  'home-improvement': HomeIcon, automotive: Car, travel: Plane, blog: BookOpen, shopping: ShoppingBag,
  service: Wrench, lifestyle: Sparkles, beauty: Sparkles, 'pet-animal': PawPrint, food: UtensilsCrossed,
  furniture: Sofa, electric: Laptop, 'jobs-payroll': Briefcase, finance: DollarSign, crypto: Bitcoin,
  casino: Gamepad2, cbd: Package, 'social-media': Share2, 'game-sports': Dumbbell, arts: Palette,
  entertainment: Music, 'shipping-transportation': Truck, education: GraduationCap, 'family-parenting': Baby,
  'law-legal': Scale, fashion: Shirt, photography: Camera, adult: Sparkles, event: Sparkles, digital: Laptop,
  news: Newspaper, 'industry-manufacturing': Factory,
}

function ImageFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-[var(--slot4-media-bg)] ${className}`}>
      <Package className="h-8 w-8 text-[var(--slot4-soft-muted-text)]" />
    </div>
  )
}

/* ------------------------------- Hero ----------------------------------- */
export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  const titleWords = pagesContent.home.hero.title?.join(' ') || `Buy & sell anything on ${SITE_CONFIG.name}`
  const chips = CATEGORY_OPTIONS.slice(0, 6)

  return (
    <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.28),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.20),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--slot4-page-text)_1px,transparent_1px),linear-gradient(90deg,var(--slot4-page-text)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className={`relative py-20 text-center sm:py-24 lg:py-28 ${container}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.home.hero.badge || 'The premium marketplace'}
        </span>

        <h1 className="editable-display mx-auto mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          Buy &amp; Sell <span className="editable-gradient-text">Anything</span>,<br className="hidden sm:block" /> Anywhere
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
          {pagesContent.home.hero.description || titleWords}
        </p>

        {/* Search */}
        <form action="/search" className="mx-auto mt-9 flex w-full max-w-2xl items-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] focus-within:border-[var(--slot4-accent)]/70 focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.12)]">
          <Search className="ml-4 h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
          <input
            name="q"
            placeholder="What are you looking for?"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)] sm:text-base"
          />
          <button className="shrink-0 rounded-full bg-[var(--slot4-accent-gradient)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:px-8">
            Search
          </button>
        </form>

        {/* Quick category chips */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {chips.map((cat) => (
            <Link
              key={cat.slug}
              href={`${primaryRoute}?category=${cat.slug}`}
              className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/60 px-4 py-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/60 hover:text-[var(--slot4-page-text)]"
            >
              {cat.name}
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

/* --------------------------- Browse categories -------------------------- */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = CATEGORY_OPTIONS.slice(0, 16)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Explore</p>
            <h2 className="editable-display mt-2 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">Browse Categories</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] hover:underline sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = categoryIcon[cat.slug] || Tag
            return (
              <Link
                key={cat.slug}
                href={`${primaryRoute}?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-3 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/60 hover:shadow-[0_20px_50px_-24px_rgba(168,85,247,0.6)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-[var(--slot4-page-text)]">{cat.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Featured split: one big feature + horizontal list ----------- */
function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const price = priceOf(post)
  return (
    <Link
      href={href}
      className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] lg:min-h-full"
    >
      {hasRealImage(post) ? (
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
      ) : (
        <ImageFallback />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(5,5,10,0.55)_60%,rgba(5,5,10,0.94))]" />
      <div className="relative z-10 p-7 sm:p-9">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-gradient)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          Featured{category ? ` · ${category}` : ''}
        </span>
        <h3 className="editable-display mt-4 max-w-lg text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">{post.title}</h3>
        <p className="mt-3 line-clamp-2 max-w-md text-sm leading-7 text-white/75">{getExcerpt(post, 150)}</p>
        <div className="mt-5 flex items-center gap-4">
          {price ? <span className="editable-display text-2xl font-bold text-white">{price}</span> : null}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition group-hover:bg-white/20">
            View details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Horizontal / list-style card
function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const price = priceOf(post)
  const location = fieldOf(post, ['location', 'address', 'city'])
  return (
    <Link
      href={href}
      className="group flex gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/50 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)]"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
        {hasRealImage(post) ? (
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <ImageFallback />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {category ? <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{category}</p> : null}
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-[var(--slot4-muted-text)]">
          {price ? <span className="font-semibold text-[var(--slot4-page-text)]">{price}</span> : null}
          {location ? <span className="inline-flex items-center gap-1 truncate"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const all = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!all.length) return null
  const feature = all[0]
  const rest = all.slice(1, 6)
  return (
    <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Handpicked</p>
            <h2 className="editable-display mt-2 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">Featured Listings</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} />
          <div className="grid gap-3">
            {rest.map((post) => (
              <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Latest ads (image-first grid) -------------------- */
function ListingCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const price = priceOf(post)
  const location = fieldOf(post, ['location', 'address', 'city'])
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/50 hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.55)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        {hasRealImage(post) ? (
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        ) : (
          <ImageFallback />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-accent-gradient)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[var(--slot4-accent-glow)]">New</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {category ? <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{category}</p> : null}
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 96)}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--editable-border)] pt-3">
          <span className="editable-display text-lg font-bold text-[var(--slot4-page-text)]">{price || 'Contact'}</span>
          <span className="inline-flex items-center gap-1 text-xs text-[var(--slot4-muted-text)]">
            {location ? <><MapPin className="h-3 w-3" /> <span className="max-w-[110px] truncate">{location}</span></> : <ArrowUpRight className="h-4 w-4 text-[var(--slot4-accent)]" />}
          </span>
        </div>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Latest Ads' },
  browse: { eyebrow: 'Trending now', title: 'Popular This Month' },
  index: { eyebrow: 'Still available', title: 'More From the Archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to Explore' }
        return (
          <section key={section.key} className="bg-[var(--slot4-page-bg)]">
            <div className={`py-14 sm:py-16 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <ListingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.28),transparent_65%)] blur-2xl" />
          <div className="relative">
            <h2 className="editable-display mx-auto max-w-2xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Got something worth <span className="editable-gradient-text">selling?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
              Post a listing in minutes and reach buyers across the {SITE_CONFIG.name} community — free and simple.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-gradient)] px-7 py-3 text-sm font-bold text-white shadow-[var(--slot4-accent-glow)] transition hover:brightness-110">
                Post an ad <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]/60">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
