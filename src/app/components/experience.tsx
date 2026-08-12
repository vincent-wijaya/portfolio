'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  date: string;
  /** Short label on the timeline rail */
  when: string;
  description: string;
  /** Role still going — open end on the rail */
  present?: boolean;
  logo?: string;
  logo_dark?: string;
  logoBg?: string;
  logoFit?: 'cover' | 'contain';
};

const experienceList: ExperienceItem[] = [
  {
    title: 'Technology Project Consultant',
    company: '180 Degrees Consulting Monash',
    location: 'Clayton, VIC',
    date: 'February 2024 — June 2024',
    when: 'Feb 2024',
    description:
      'Worked with Computer Science and Software Engineering students to develop a web app for Mobilise — volunteer and event management, plus volunteer signup for events.',
    logo: 'assets/180dc.jpeg',
    logo_dark: 'assets/180dc_dark.jpg',
    logoFit: 'cover',
  },
  {
    title: 'Full-stack Developer Intern',
    company: 'ByteCroniX',
    location: 'Melbourne, VIC',
    date: '2024',
    when: '2024',
    description:
      'Full-stack web development internship. Built and shipped features across frontend and backend stacks.',
    logo: 'assets/logos/bytecronix.jpg',
    logoBg: '#000000',
    logoFit: 'contain',
  },
  {
    title: 'Full-stack Developer',
    company: 'WESPI / WESP Indonesia',
    location: 'Remote',
    date: 'June 2024 — Present',
    when: 'Jun 2024 →',
    present: true,
    description:
      'Own inventory management platform end to end: Vue + Express + PostgreSQL. Purchase/request/delivery orders, multi-tenant orgs, PDF generation, websockets, CI/CD, and VPS deploys for staging and prod.',
    logo: 'assets/logos/wespi.png',
    logoBg: '#ffffff',
    logoFit: 'contain',
  },
  {
    title: 'Software Engineer',
    company: 'Carbon Edge',
    location: 'Melbourne, VIC',
    date: '2025 — Present',
    when: '2025 →',
    present: true,
    description:
      'Build full-stack product for farms and client sites. CropNexus charts and monitoring, shared nexus-charts library, video coaching platform, and headless Shopify storefront work.',
    logo: 'assets/logos/carbon-edge.png',
    logoBg: '#000000',
    logoFit: 'contain',
  },
];

function LogoTile({
  item,
  size = 56,
}: {
  item: ExperienceItem;
  size?: number;
}) {
  if (!item.logo) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] font-display font-semibold text-[var(--accent)]"
        style={{ width: size, height: size }}
      >
        {item.company.charAt(0)}
      </div>
    );
  }

  const isCover = item.logoFit === 'cover';
  const img = (
    <Image
      src={`/${item.logo}`}
      alt={item.company}
      width={size}
      height={size}
      className={
        isCover
          ? 'h-full w-full object-cover object-center'
          : 'h-[82%] w-[82%] object-contain'
      }
    />
  );

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl"
      style={{
        width: size,
        height: size,
        backgroundColor: item.logoBg ?? '#ffffff',
      }}
    >
      {item.logo_dark ? (
        <picture
          className={
            isCover
              ? 'block h-full w-full'
              : 'flex h-[82%] w-[82%] items-center justify-center'
          }
        >
          <source
            srcSet={`/${item.logo_dark}`}
            media="(prefers-color-scheme: dark)"
          />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
}

export default function Experience() {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length === 0) return;

      const focusY = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const center = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });

      setActiveIndex((prev) => (prev === best ? prev : best));

      const first = panels[0].getBoundingClientRect();
      const last = panels[panels.length - 1].getBoundingClientRect();
      const start = first.top + window.scrollY;
      const end = last.top + window.scrollY;
      const span = Math.max(end - start, 1);
      const current = window.scrollY + focusY - (first.top + window.scrollY);
      const next = Math.min(1, Math.max(0, current / span));
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const active = experienceList[activeIndex];
  const count = experienceList.length;
  const continuousFill = progress * 100;

  const jumpTo = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section id="experience" className="relative w-full">
      <div className="sticky top-14 z-20 bg-[rgb(var(--background-start-rgb))]/92 px-6 pb-6 pt-6 backdrop-blur-md sm:top-0">
        <h2 className="font-display text-3xl font-semibold text-[var(--sand)]">
          Experience
        </h2>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative px-2 sm:px-6">
            <div className="relative h-2 overflow-visible rounded-full bg-[var(--ink)]/8">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
                style={{ width: `${continuousFill}%` }}
                aria-hidden
              />
              {/* Open end — Present roles keep the rail “alive” past the last node */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-8 overflow-hidden rounded-r-full"
                aria-hidden
              >
                <div className="experience-rail-open h-full w-full" />
              </div>
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--accent)] shadow-[0_0_0_3px_rgba(212,132,106,0.25)] transition-[left] duration-200 ease-out"
                style={{
                  left: `clamp(0px, calc(${continuousFill}% - 7px), calc(100% - 14px))`,
                }}
                aria-hidden
              />
            </div>

            <ol className="mt-5 grid grid-cols-4 gap-2">
              {experienceList.map((item, index) => {
                const reached =
                  progress + 0.001 >= index / Math.max(count - 1, 1);
                const isActive = index === activeIndex;
                const isPresent = Boolean(item.present);
                return (
                  <li key={item.company} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => jumpTo(index)}
                      className={`relative flex w-full flex-col items-center gap-2 rounded-xl px-1 py-2 text-center transition ${
                        isActive
                          ? 'bg-[var(--accent)]/10'
                          : isPresent
                            ? 'bg-[var(--accent)]/[0.04]'
                            : 'hover:bg-black/[0.03]'
                      }`}
                      aria-label={`Jump to ${item.company}${isPresent ? ' (ongoing)' : ''}`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="relative">
                        <span
                          className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border transition duration-300 ${
                            isActive
                              ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                              : isPresent
                                ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                                : reached
                                  ? 'border-[var(--accent)]/50'
                                  : 'border-[var(--line)] opacity-60'
                          }`}
                          style={{
                            backgroundColor: item.logoBg ?? '#ffffff',
                          }}
                        >
                          <LogoTile item={item} size={40} />
                        </span>
                        {isPresent ? (
                          <span className="absolute -right-1 -top-1 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                            Now
                          </span>
                        ) : null}
                      </span>
                      <span
                        className={`text-[11px] font-semibold tracking-wide ${
                          isActive || isPresent
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--muted)]'
                        }`}
                      >
                        {item.when}
                      </span>
                      <span className="hidden truncate text-[10px] text-[var(--muted)] sm:block">
                        {item.company.split(' / ')[0]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="flex items-start gap-4">
            <LogoTile item={active} size={64} />
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
                <span>{active.date}</span>
                {active.present ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </span>
                    Present
                  </span>
                ) : null}
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--sand)] sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-1 text-lg italic text-[var(--accent)]">
                {active.company}
              </p>
              <p className="text-[var(--muted)]">{active.location}</p>
            </div>
          </div>
          <p
            key={active.company}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--sand)]/85 animate-[fade-up_0.35s_ease]"
          >
            {active.description}
          </p>
        </div>
      </div>

      <div className="relative">
        {experienceList.map((item, index) => (
          <div
            key={item.company}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            className="experience-snap h-[85svh] w-full"
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
}
