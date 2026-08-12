'use client';

import Image from 'next/image';
import { useState } from 'react';

type EducationItem = {
  school: string;
  degree: string;
  date: string;
  location: string;
  description: string;
  logo: string;
  logo_dark: string;
  url: string;
  videos?: { title: string; url: string }[];
};

const educationList: EducationItem[] = [
  {
    school: 'Monash University',
    degree: 'Bachelor of Software Engineering (Honours)',
    date: 'February 2020 — December 2024',
    location: 'Clayton, VIC',
    description: 'GPA: 3.38, WAM: 77.56',
    logo: 'assets/monash.svg',
    logo_dark: 'assets/monash_dark.png',
    url: 'https://www.monash.edu/',
  },
  {
    school: 'Monash College',
    degree: 'Diploma of Engineering',
    date: 'June 2018 — December 2019',
    location: 'Clayton, VIC',
    description: 'GPA: 4.0, WAM: 88.0',
    logo: 'assets/monash_college.jpg',
    logo_dark: 'assets/monash_college.jpg',
    url: 'https://www.monashcollege.edu.au/',
    videos: [
      {
        title: 'Monash College - Diploma of Engineering 1',
        url: 'https://www.youtube.com/embed/hpH8L2mb3g4?si=MnBOpcmi__G2npj7',
      },
      {
        title: 'Monash College - Diploma of Engineering 2',
        url: 'https://www.youtube.com/embed/h2d4C2weioc?si=5OGI5fjjomfiZHCf',
      },
    ],
  },
];

type LayoutId = 'stack' | 'split' | 'ladder' | 'stage';

const layouts: { id: LayoutId; label: string; hint: string }[] = [
  {
    id: 'stack',
    label: 'Stack',
    hint: 'Classic vertical entries',
  },
  {
    id: 'split',
    label: 'Split',
    hint: 'Two schools side by side',
  },
  {
    id: 'ladder',
    label: 'Ladder',
    hint: 'Numbered path from diploma to degree',
  },
  {
    id: 'stage',
    label: 'Stage',
    hint: 'One school at a time + media',
  },
];

function SchoolLogo({ item }: { item: EducationItem }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="inline-block">
      <picture>
        <source
          srcSet={`/${item.logo_dark}`}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={`/${item.logo}`}
          alt={item.school}
          width={180}
          height={48}
          className="h-10 w-auto object-contain"
        />
      </picture>
    </a>
  );
}

function VideoRow({ item }: { item: EducationItem }) {
  if (!item.videos?.length) return null;
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {item.videos.map((video) => (
        <iframe
          key={video.title}
          width="320"
          height="180"
          src={video.url}
          title={video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="max-w-full rounded-lg"
        />
      ))}
    </div>
  );
}

function LayoutPicker({
  layout,
  setLayout,
}: {
  layout: LayoutId;
  setLayout: (id: LayoutId) => void;
}) {
  const active = layouts.find((item) => item.id === layout)!;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-3xl font-semibold text-[var(--sand)]">
          Education
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Layout ideas — flip and pick. Now: {active.hint}
        </p>
      </div>
      <div
        className="flex flex-wrap gap-1 rounded-xl border border-[var(--line)] bg-white/40 p-1"
        role="tablist"
        aria-label="Education layout ideas"
      >
        {layouts.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={layout === item.id}
            onClick={() => setLayout(item.id)}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              layout === item.id
                ? 'bg-[var(--ink)] text-[var(--ink-soft)]'
                : 'text-[var(--muted)] hover:bg-black/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LayoutStack() {
  return (
    <div className="mt-6 space-y-8">
      {educationList.map((item) => (
        <article
          key={item.school}
          id={item.school}
          className="border-t border-[var(--line)] pt-6"
        >
          <SchoolLogo item={item} />
          <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--sand)]">
            {item.degree}
          </h3>
          <div className="mt-1 flex flex-wrap justify-between gap-2">
            <p className="text-lg italic text-[var(--accent)]">{item.school}</p>
            <p className="text-[var(--muted)]">{item.location}</p>
          </div>
          <p className="text-[var(--muted)]">{item.date}</p>
          <p className="mt-2 text-lg text-[var(--sand)]/90">{item.description}</p>
          <VideoRow item={item} />
        </article>
      ))}
    </div>
  );
}

function LayoutSplit() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {educationList.map((item) => (
        <article
          key={item.school}
          id={item.school}
          className="rounded-2xl border border-[var(--line)] bg-white/40 p-5"
        >
          <SchoolLogo item={item} />
          <h3 className="mt-4 font-display text-xl font-semibold text-[var(--sand)]">
            {item.degree}
          </h3>
          <p className="mt-1 italic text-[var(--accent)]">{item.school}</p>
          <p className="text-sm text-[var(--muted)]">
            {item.date} · {item.location}
          </p>
          <p className="mt-3 text-[var(--sand)]/90">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function LayoutLadder() {
  // show path chronologically: college first, then uni
  const path = [...educationList].reverse();
  return (
    <div className="mt-8 space-y-0">
      {path.map((item, index) => (
        <article key={item.school} id={item.school} className="relative pl-12">
          <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ink)] font-display text-sm text-[var(--ink-soft)]">
            {index + 1}
          </div>
          {index < path.length - 1 && (
            <div className="absolute bottom-0 left-[0.95rem] top-8 w-px bg-[var(--line)]" />
          )}
          <div className="pb-10">
            <SchoolLogo item={item} />
            <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--sand)]">
              {item.degree}
            </h3>
            <p className="italic text-[var(--accent)]">{item.school}</p>
            <p className="text-sm text-[var(--muted)]">
              {item.date} · {item.location}
            </p>
            <p className="mt-2 text-[var(--sand)]/90">{item.description}</p>
            <VideoRow item={item} />
          </div>
        </article>
      ))}
    </div>
  );
}

function LayoutStage({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) {
  const item = educationList[active];
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {educationList.map((entry, index) => (
          <button
            key={entry.school}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              active === index
                ? 'bg-[var(--ink)] text-[var(--ink-soft)]'
                : 'border border-[var(--line)] text-[var(--muted)] hover:bg-black/5'
            }`}
          >
            {entry.school}
          </button>
        ))}
      </div>
      <article id={item.school} className="mt-6">
        <SchoolLogo item={item} />
        <h3 className="mt-4 font-display text-3xl font-semibold text-[var(--sand)]">
          {item.degree}
        </h3>
        <p className="mt-1 text-lg italic text-[var(--accent)]">{item.school}</p>
        <p className="text-[var(--muted)]">
          {item.date} · {item.location}
        </p>
        <p className="mt-3 text-lg text-[var(--sand)]/90">{item.description}</p>
        <VideoRow item={item} />
      </article>
    </div>
  );
}

export default function Education() {
  const [layout, setLayout] = useState<LayoutId>('ladder');
  const [stage, setStage] = useState(0);

  return (
    <section id="education" className="flex w-full flex-col rounded-3xl p-6">
      <LayoutPicker layout={layout} setLayout={setLayout} />
      {layout === 'stack' && <LayoutStack />}
      {layout === 'split' && <LayoutSplit />}
      {layout === 'ladder' && <LayoutLadder />}
      {layout === 'stage' && (
        <LayoutStage active={stage} setActive={setStage} />
      )}
    </section>
  );
}
