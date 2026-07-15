'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, Plus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        // The marketplace is classified-only — Profile isn't a browsable nav destination.
        .filter((task) => task.enabled && task.key === 'classified')
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/85 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[74px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-accent-gradient)] shadow-[var(--slot4-accent-glow)] transition group-hover:scale-105">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain" />
          </span>
          <span className="editable-display text-[1.35rem] font-extrabold leading-none tracking-[-0.02em]">{SITE_CONFIG.name}</span>
        </Link>

        {/* Search (center, desktop) */}
        <form action="/search" className="ml-1 hidden min-w-0 flex-1 items-center md:flex">
          <div className="flex w-full max-w-xl items-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] transition focus-within:border-[var(--slot4-accent)]/70 focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.10)]">
            <Search className="ml-4 h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search listings…"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
            <button className="my-1 mr-1 shrink-0 rounded-full bg-[var(--slot4-accent-gradient)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110">
              Search
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {navItems.slice(0, 3).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hidden rounded-full px-3.5 py-2 text-sm font-semibold transition lg:inline-flex ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent-gradient)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--slot4-accent-glow)] transition hover:brightness-110 sm:inline-flex"
              >
                <Plus className="h-4 w-4" /> Post Ad
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]/60 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Register
              </Link>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent-gradient)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--slot4-accent-glow)] transition hover:brightness-110 sm:inline-flex"
              >
                <Plus className="h-4 w-4" /> Post Ad
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search listings…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Post Ad', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Register', href: '/signup' }, { label: 'Post Ad', href: '/create' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">Logout</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
