'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ProjectLink = { title: string; url: string };
type ProjectImage = { title: string; url: string; isPortrait: boolean };

type Project = {
  title: string;
  blurb: string;
  description: string;
  tools: string[];
  links?: ProjectLink[];
  images?: ProjectImage[];
};

const projectList: Project[] = [
  {
    title: 'CropNexus',
    blurb: 'Farm charts, weather, sensor monitoring',
    description:
      'Full-stack agronomic monitoring for Carbon Edge. Real-time farm charts and weather, shared nexus-charts library, auth, and analysis UI used across client sites.',
    tools: [
      'Next.js',
      'React',
      'TypeScript',
      'Drizzle ORM',
      'PostgreSQL',
      'Highcharts',
      'TanStack Query',
      'Clerk',
      'Tailwind CSS',
      'pnpm',
    ],
  },
  {
    title: 'WESPI Inventory Platform',
    blurb: 'Warehouse ops, live stock, VPS deploys',
    description:
      'Production inventory system for warehouse stock, purchase orders, request orders, and delivery orders. Multi-tenant orgs, live low-stock updates over WebSockets, PDF generation, CI/CD, and DigitalOcean VPS deploys for staging and prod.',
    tools: [
      'Vue.js',
      'Express.js',
      'TypeScript',
      'JavaScript',
      'PostgreSQL',
      'WebSocket',
      'Docker',
      'DigitalOcean',
      'VPS',
      'Nginx',
      'GitHub Actions',
      'Puppeteer',
      'Gotenberg',
      'pnpm',
      'Tailwind CSS',
      'Telegram',
      'GitHub',
    ],
  },
  {
    title: 'Olimo — Well Monitoring',
    blurb: 'Node-RED → modern IoT stack',
    description:
      'Large Node-RED well / pump monitoring system migrated toward a modern stack for WESPI. Industrial metrics, Modbus-style field data, and ops views so wells stay visible without living forever in spaghetti flows.',
    tools: [
      'Next.js',
      'React',
      'TypeScript',
      'Rust',
      'Node-RED',
      'Docker',
      'TanStack Query',
      'Tailwind CSS',
      'pnpm',
    ],
  },
  {
    title: 'PowerTrack - KafkaJS',
    blurb: 'Energy trends on a Kafka stream',
    description:
      'Energy monitoring platform for retailers and consumers to view consumption and generation trends. Built around a KafkaJS data-streaming pipeline with containerised services.',
    tools: [
      'Next.js',
      'React',
      'KafkaJS',
      'Apache Kafka',
      'Node.js',
      'Sequelize',
      'PostgreSQL',
      'TypeScript',
      'Docker',
      'Docker Compose',
      'GitLab',
      'GitLab CI',
    ],
  },
  {
    title: 'Mobilise Volunteering Platform',
    blurb: 'Outreach events + volunteer signup',
    description:
      'Centralised platform for volunteers to find and apply for opportunities. Continued prior-semester front-end work; I owned outreach management so Mobilise can run events and volunteers can sign up.',
    tools: [
      'React',
      'Supabase',
      'PostgreSQL',
      'JavaScript',
      'Sass',
      'REST API',
      'Auth',
      'GitHub',
    ],
    links: [{ title: 'Mobilise', url: 'https://wearemobilise.org.au/' }],
  },
  {
    title: 'Internet-Based Brewing Controller',
    blurb: 'Brewlab tanks, charts, Cognito auth',
    description:
      'Final Year Project: web controller for Monash Brewlab fermentation. AWS-hosted API plus Raspberry Pi on the tank. Temperature control, data logging, remote monitoring. I built the web UI — live charts, schedule events, manual override, and Cognito auth.',
    tools: [
      'Vue.js',
      'JavaScript',
      'Python',
      'AWS',
      'API Gateway',
      'AWS Lambda',
      'DynamoDB',
      'Cognito',
      'S3',
      'Raspberry Pi',
      'IoT',
      'Charts',
      'GitHub',
    ],
    links: [
      { title: 'Monash Brewlab', url: 'https://www.monashbrewlab.com/' },
      {
        title: 'Google Drive',
        url: 'https://drive.google.com/drive/u/0/folders/1zksBAL9Lfi7xnPTBEBDQ2Vr_fsmgG2bX',
      },
    ],
    images: [
      { title: 'Home Page', url: 'assets/mb_home.png', isPortrait: false },
      {
        title: 'Schedule Event Page',
        url: 'assets/mb_schedule.png',
        isPortrait: true,
      },
      { title: 'Faults', url: 'assets/mb_fault.png', isPortrait: false },
      {
        title: 'Team Photo with product',
        url: 'assets/mb_team.jpg',
        isPortrait: false,
      },
    ],
  },
  {
    title: 'Finding Neno - Lost Pet Finder',
    blurb: 'Maps, sightings, nearby alerts',
    description:
      'Mobile app to report and browse lost pets nearby. Post pets and sightings, map view, contact owners, and notify users when a missing pet is reported close by.',
    tools: [
      'React Native',
      'Expo',
      'Flask',
      'Python',
      'PostgreSQL',
      'Google Maps API',
      'SendGrid',
      'REST API',
      'Push Notifications',
      'JavaScript',
      'GitHub',
    ],
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/Monash-FIT3170/Finding-Neno/',
      },
    ],
    images: [
      { title: 'Login Page', url: 'assets/fn_login.png', isPortrait: true },
      {
        title: 'Missing Pet Reports',
        url: 'assets/fn_reports.png',
        isPortrait: true,
      },
      { title: 'Map page', url: 'assets/fn_map.png', isPortrait: true },
    ],
  },
];

function ToolRow({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded-md border border-[var(--line)] bg-white/40 px-2 py-0.5 text-xs text-[var(--muted)]"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

function LinkRow({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[var(--accent)] underline underline-offset-4 transition hover:brightness-90"
        >
          {link.title}
        </a>
      ))}
    </div>
  );
}

function ImageGallery({
  images,
  open,
  onToggle,
  panelId,
}: {
  images?: ProjectImage[];
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  if (!images?.length) return null;

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={onToggle}
        className="text-sm text-[var(--muted)] underline underline-offset-4"
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? 'Hide images' : 'Show images'}
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? 'mt-3 max-h-[2400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-row flex-wrap gap-2">
          {images.map((image) => (
            <Image
              key={image.url}
              src={image.url}
              alt={image.title}
              width={image.isPortrait ? 180 : 360}
              height={image.isPortrait ? 360 : 180}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [imageOpen, setImageOpen] = useState<Record<number, boolean>>({});
  const navLockedRef = useRef(false);

  // Nav jumps freeze accordion so height thrash does not steal the scroll target
  useEffect(() => {
    const onLock = () => {
      navLockedRef.current = true;
      setOpenIndex(null);
      window.setTimeout(() => {
        navLockedRef.current = false;
      }, 900);
    };

    window.addEventListener('portfolio:nav-lock', onLock);
    return () => window.removeEventListener('portfolio:nav-lock', onLock);
  }, []);

  return (
    <section id="projects" className="flex w-full flex-col px-6 py-6">
      <h2 className="font-display text-3xl font-semibold text-[var(--sand)]">
        Projects
      </h2>

      <div className="mt-6 border-t border-[var(--line)]">
        {projectList.map((project, index) => {
          const open = openIndex === index;
          return (
            <article
              key={project.title}
              data-project-index={index}
              className="scroll-mt-28 border-b border-[var(--line)] py-5"
            >
              <button
                type="button"
                onClick={() => {
                  if (navLockedRef.current) return;
                  setOpenIndex((prev) => (prev === index ? null : index));
                }}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={open}
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm text-[var(--accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-[var(--sand)] sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-1 pl-8 text-sm text-[var(--muted)]">
                    {project.blurb}
                  </p>
                </div>
                <span
                  className={`mt-0.5 shrink-0 text-2xl leading-none text-[var(--muted)] transition duration-400 ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
                  open ? 'max-h-[1800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-2 pl-8 pr-2 pt-3 sm:pr-8">
                  <p className="leading-relaxed text-[var(--sand)]/85">
                    {project.description}
                  </p>
                  <div className="mt-3">
                    <ToolRow tools={project.tools} />
                  </div>
                  <LinkRow links={project.links} />
                  <ImageGallery
                    images={project.images}
                    open={Boolean(imageOpen[index])}
                    onToggle={() =>
                      setImageOpen((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                    panelId={`fold-images-${index}`}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
