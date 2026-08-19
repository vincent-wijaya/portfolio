import Image from 'next/image';

type ExperienceItem = {
    title: string;
    company: string;
    location: string;
    date: string;
    summary: string;
    bullets: string[];
    logo: string;
    logo_dark?: string;
    logoFit?: 'cover' | 'contain';
};

const experienceList: ExperienceItem[] = [
    {
        title: 'Software Engineer',
        company: 'Carbon Edge',
        location: 'Melbourne, VIC',
        date: '2025 - Present',
        summary:
            'Melbourne tech studio that builds digital platforms for farms, shops, and other businesses. I ship full-stack product work for client sites and in-house tools.',
        bullets: [
            'Build and ship full-stack features for CropNexus, a real-time farm monitoring platform used across Australian farms (weather, plant and soil sensors, charts, and analysis UI).',
            'Own shared charting through a reusable nexus-charts library so farm dashboards stay consistent across client sites.',
            'Deliver client web platforms, including a community platform where users share rehab stories and connect with others managing chronic pain, a video coaching product, and headless Shopify storefronts.',
            'Work across Next.js, React, TypeScript, PostgreSQL, and Drizzle — from requirements through implementation and deploy.',
            'Partner with a small consulting team to turn messy business needs into clean, usable software.',
        ],
        logo: 'assets/logos/carbon-edge.png',
        logoFit: 'contain',
    },
    {
        title: 'Full-stack Developer',
        company: 'WESPI / PT WESP Indonesia',
        location: 'Remote',
        date: 'June 2024 - Present',
        summary:
            'PT Western Electric Submersible Pump Indonesia (WESPI) runs ESP pumps, power generation, and workshop ops for oil and gas. I own the internal software that keeps warehouse stock and well monitoring running.',
        bullets: [
            'Design and build a production inventory platform (Vue.js, Express.js, TypeScript, PostgreSQL) covering warehouse stock, purchase orders, request orders, and delivery orders.',
            'Support multi-tenant organisations, live low-stock updates over WebSockets, and PDF order documents.',
            'Ship CI/CD and DigitalOcean VPS deploys (Docker, Nginx, GitHub Actions) for staging and production.',
            'Maintain a legacy Node-RED well and pump monitoring stack (50+ flows), including database integrity fixes and a Telegram bot that alerts ops when systems fail.',
            'Lead migration of industrial monitoring (Olimo) toward a modern Next.js / Rust stack so field data stays visible without living in spaghetti flows.',
        ],
        logo: 'assets/logos/wespi.png',
        logoFit: 'contain',
    },
    {
        title: 'Technology Project Consultant',
        company: '180 Degrees Consulting Monash',
        location: 'Clayton, VIC',
        date: 'February 2024 - June 2024',
        summary:
            'Worked with Computer Science and Software Engineering students to develop a web application for Mobilise.',
        bullets: [
            'Built volunteer and event management so Mobilise can run outreach events and volunteers can sign up.',
            'Developed frontend in React.js from Figma designs, and designed a scalable Supabase schema for long-term volunteer growth.',
        ],
        logo: 'assets/180dc.jpeg',
        logo_dark: 'assets/180dc_dark.jpg',
        logoFit: 'cover',
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white rounded-3xl w-full">
            <h2 className="text-3xl font-bold">Experience</h2>
            {experienceList.map((experience, index) => (
                <div
                    key={`${experience.company}-${index}`}
                    className="mt-4 transition duration-300 hover:translate-x-2">
                    {experience.logo_dark ? (
                        <picture>
                            <source
                                srcSet={`/${experience.logo_dark}`}
                                media="(prefers-color-scheme: dark)"
                            />
                            <Image
                                src={`/${experience.logo}`}
                                alt={experience.company}
                                width={100}
                                height={100}
                                className={
                                    experience.logoFit === 'contain'
                                        ? 'object-contain bg-white rounded-xl p-1'
                                        : undefined
                                }
                            />
                        </picture>
                    ) : (
                        <Image
                            src={`/${experience.logo}`}
                            alt={experience.company}
                            width={100}
                            height={100}
                            className={
                                experience.logoFit === 'contain'
                                    ? 'object-contain bg-white rounded-xl p-1'
                                    : undefined
                            }
                        />
                    )}
                    <h3 className="text-2xl font-bold">{experience.title}</h3>
                    <div className="flex justify-between">
                        <p className="text-lg font-bold italic">
                            {experience.company}
                        </p>
                        <p className="text-lg">{experience.location}</p>
                    </div>
                    <p className="text-lg">{experience.date}</p>
                    <p className="text-lg mt-1">{experience.summary}</p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        {experience.bullets.map((bullet) => (
                            <li key={bullet} className="text-lg">
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}
