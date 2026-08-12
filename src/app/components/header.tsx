'use client';

import { useEffect, useMemo, useState } from 'react';

const menuItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeLabel = useMemo(
    () => menuItems.find((item) => item.id === activeSection)?.label ?? '',
    [activeSection]
  );

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Freeze project accordion thrash while we jump
    window.dispatchEvent(
      new CustomEvent('portfolio:nav-lock', { detail: { sectionId } })
    );

    const offset = 24;
    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });

    window.history.replaceState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const sectionIds = menuItems.map((item) => item.id);
    let frame = 0;
    let lockedUntil = 0;

    const onNavLock = (event: Event) => {
      const detail = (event as CustomEvent<{ sectionId?: string }>).detail;
      if (detail?.sectionId) {
        setActiveSection(detail.sectionId);
        // Ignore scroll-spy while smooth scroll settles
        lockedUntil = performance.now() + 700;
      }
    };

    const updateActive = () => {
      if (performance.now() < lockedUntil) return;

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, el } : null;
        })
        .filter((s): s is { id: string; el: HTMLElement } => s !== null);

      if (sections.length === 0) return;

      // Near page bottom → last section (short Contact never reaches focus line)
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Last section whose top passed the focus line — works for tall sticky Experience
      const focusY = Math.min(120, window.innerHeight * 0.25);
      let current = sections[0].id;
      for (const { id, el } of sections) {
        if (el.getBoundingClientRect().top <= focusY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    window.addEventListener('portfolio:nav-lock', onNavLock);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActive();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('portfolio:nav-lock', onNavLock);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--ink-soft)]/85 px-4 backdrop-blur-md sm:hidden">
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md"
        >
          <span
            className={`block h-0.5 w-5 bg-[var(--sand)] transition ${
              isMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--sand)] transition ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--sand)] transition ${
              isMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
        <span className="font-display text-sm font-semibold text-[var(--sand)]">
          {activeLabel}
        </span>
        <span className="w-10" aria-hidden />
      </div>

      {isMenuOpen ? (
        <nav
          className="fixed inset-x-0 top-14 z-50 border-b border-[var(--line)] bg-[var(--ink-soft)]/95 px-4 py-3 backdrop-blur-md sm:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToSection(item.id);
                    }}
                    className={`block rounded-md px-3 py-2.5 text-base transition ${
                      active
                        ? 'bg-[var(--accent)]/10 font-semibold text-[var(--accent)]'
                        : 'text-[var(--sand)]/80'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {/* Desktop — left tick rail (option 6), no section card */}
      <nav
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-svh sm:block"
        aria-label="Primary"
        onMouseLeave={() => setHoveredId(null)}
      >
        <div className="pointer-events-auto absolute left-3 top-1/2 flex -translate-y-1/2 flex-col items-start gap-0.5">
          {menuItems.map((item) => {
            const active = activeSection === item.id;
            const hovered = hoveredId === item.id;
            const showLabel = active || hovered;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToSection(item.id);
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                className="relative flex w-28 items-center py-0.5"
                aria-current={active ? 'true' : undefined}
                aria-label={item.label}
              >
                <span
                  className={`block w-2 shrink-0 rounded-full bg-[var(--accent)] transition-[height] duration-300 ease-out ${
                    active ? 'h-6' : hovered ? 'h-4' : 'h-2'
                  }`}
                  aria-hidden
                />
                <span
                  className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-sm font-semibold tracking-tight transition-opacity duration-200 ${
                    showLabel ? 'opacity-100' : 'opacity-0'
                  } ${
                    active
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--sand)]'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
