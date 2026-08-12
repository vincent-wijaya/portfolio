'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Tool = {
    name: string;
    src: string;
};

/** Core stack only — daily drivers across WESPI / Carbon Edge / shipping work */
const tools: Tool[] = [
    { name: 'TypeScript', src: '/assets/tools/typescript.svg' },
    { name: 'React', src: '/assets/tools/react.svg' },
    { name: 'Vue', src: '/assets/tools/vue.svg' },
    { name: 'Next.js', src: '/assets/tools/nextjs.svg' },
    { name: 'Node.js', src: '/assets/tools/nodejs.svg' },
    { name: 'PostgreSQL', src: '/assets/tools/postgresql.svg' },
    { name: 'Docker', src: '/assets/tools/docker.svg' },
];

/** Full-speed orbit period (ms). Hover stretches this. */
const ORBIT_MS = 110000;
const HOVER_ORBIT_MS = 280000;
const MAGNET_RADIUS = 120;
const MAGNET_PULL = 0.18;
const SMOOTH = 0.07;
const SPEED_SMOOTH = 0.04;
/** Keep tiles + labels inside the stage (icon ~48px, label hang below). */
const ORBIT_INSET = 56;

export default function Hero() {
    const stageRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mouseRef = useRef<{ x: number; y: number; inside: boolean }>({
        x: 0,
        y: 0,
        inside: false,
    });
    const offsetsRef = useRef(tools.map(() => ({ x: 0, y: 0 })));
    const angleRef = useRef(0);
    const lastNowRef = useRef<number | null>(null);
    const speedRef = useRef(1);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const reducedMotionRef = useRef(false);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionRef.current = media.matches;
        const onChange = () => {
            reducedMotionRef.current = media.matches;
        };
        media.addEventListener('change', onChange);

        let frame = 0;

        const tick = (now: number) => {
            const stage = stageRef.current;
            if (!stage) {
                frame = requestAnimationFrame(tick);
                return;
            }

            const last = lastNowRef.current ?? now;
            const dt = Math.min(now - last, 64);
            lastNowRef.current = now;

            const { width, height } = stage.getBoundingClientRect();
            const cx = width / 2;
            const cy = height / 2;
            const radius = Math.max(
                96,
                Math.min(width, height) * 0.5 - ORBIT_INSET
            );
            const mouse = mouseRef.current;

            const targetSpeed = reducedMotionRef.current
                ? 0
                : mouse.inside
                  ? ORBIT_MS / HOVER_ORBIT_MS
                  : 1;
            speedRef.current += (targetSpeed - speedRef.current) * SPEED_SMOOTH;

            if (!reducedMotionRef.current) {
                const radPerMs = (Math.PI * 2) / ORBIT_MS;
                angleRef.current += radPerMs * dt * speedRef.current;
            }

            const spin = angleRef.current;
            let closestName: string | null = null;
            let closestDist = Number.POSITIVE_INFINITY;

            tools.forEach((tool, index) => {
                const baseAngle =
                    -Math.PI / 2 + (index / tools.length) * Math.PI * 2 + spin;
                const baseX = Math.cos(baseAngle) * radius;
                const baseY = Math.sin(baseAngle) * radius;

                let targetX = 0;
                let targetY = 0;

                if (mouse.inside) {
                    const mx = mouse.x - cx;
                    const my = mouse.y - cy;
                    const dx = mx - baseX;
                    const dy = my - baseY;
                    const distToMouse = Math.hypot(dx, dy);

                    if (distToMouse < MAGNET_RADIUS && distToMouse > 0.001) {
                        const strength =
                            (1 - distToMouse / MAGNET_RADIUS) * MAGNET_PULL;
                        targetX = dx * strength;
                        targetY = dy * strength;
                    }

                    if (
                        distToMouse < MAGNET_RADIUS &&
                        distToMouse < closestDist
                    ) {
                        closestDist = distToMouse;
                        closestName = tool.name;
                    }
                }

                const current = offsetsRef.current[index];
                current.x += (targetX - current.x) * SMOOTH;
                current.y += (targetY - current.y) * SMOOTH;

                // Soft clamp magnet so tiles never walk off-stage
                const x = baseX + current.x;
                const y = baseY + current.y;
                const maxR = radius + 12;
                const dist = Math.hypot(x, y);
                const scaleOut = dist > maxR && dist > 0 ? maxR / dist : 1;
                const drawX = x * scaleOut;
                const drawY = y * scaleOut;

                const el = itemRefs.current[index];
                if (el) {
                    const attracted = Math.hypot(current.x, current.y) > 4;
                    el.style.transform = `translate(-50%, -50%) translate(${drawX}px, ${drawY}px)${
                        attracted ? ' scale(1.08)' : ''
                    }`;
                    el.classList.toggle('tool-glass--active', attracted);
                }

                const label = labelRefs.current[index];
                if (label) {
                    label.style.opacity = closestName === tool.name ? '1' : '0';
                }
            });

            setActiveTool((prev) =>
                prev === closestName ? prev : closestName
            );
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            media.removeEventListener('change', onChange);
        };
    }, []);

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        mouseRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            inside: true,
        };
    };

    const onPointerLeave = () => {
        mouseRef.current = { ...mouseRef.current, inside: false };
    };

    return (
        <section
            id="about"
            className="relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col items-center justify-center overflow-visible px-2 py-16 sm:min-h-svh sm:px-4">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,214,196,0.35),transparent_50%)]" />
            </div>

            {/* Break out of content column so left/right orbit tiles are not clipped */}
            <div className="relative left-1/2 w-[min(100vw-1.25rem,44rem)] -translate-x-1/2 sm:w-[min(100vw-4.5rem,46rem)]">
                <div
                    ref={stageRef}
                    className="relative mx-auto flex aspect-square w-full items-center justify-center overflow-visible"
                    onPointerMove={onPointerMove}
                    onPointerLeave={onPointerLeave}>
                    <div className="pointer-events-none absolute inset-0 overflow-visible">
                        {tools.map((tool, index) => (
                            <button
                                key={tool.name}
                                type="button"
                                aria-label={tool.name}
                                ref={(node) => {
                                    itemRefs.current[index] = node;
                                }}
                                className="tool-glass group pointer-events-auto absolute left-1/2 top-1/2 z-20 flex h-11 w-11 items-center justify-center overflow-visible rounded-2xl will-change-transform sm:h-12 sm:w-12"
                                style={{ transform: 'translate(-50%, -50%)' }}>
                                <Image
                                    src={tool.src}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="tool-glass__icon h-6 w-6 sm:h-7 sm:w-7"
                                    unoptimized
                                />
                                <span
                                    ref={(node) => {
                                        labelRefs.current[index] = node;
                                    }}
                                    className="pointer-events-none absolute -bottom-9 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--ink)] bg-[var(--ink)] px-2.5 py-1 font-sans text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-200">
                                    {tool.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="pointer-events-none relative z-10 flex max-w-[18rem] flex-col items-center text-center sm:max-w-[26rem]">
                        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)] sm:text-sm">
                            Software engineer
                        </p>
                        <h1 className="mt-3 font-display text-[clamp(3.75rem,14vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.045em] text-[var(--sand)]">
                            Vincent
                            <br />
                            Wijaya
                        </h1>
                        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="#experience"
                                className="rounded-md bg-[var(--ink)] px-5 py-2.5 font-sans text-sm font-medium text-[var(--ink-soft)] transition hover:bg-[var(--accent)]">
                                See work
                            </a>
                            <a
                                href="#contact"
                                className="rounded-md border border-[var(--ink)]/25 px-5 py-2.5 font-sans text-sm text-[var(--sand)] transition hover:border-[var(--accent)]">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <span className="sr-only">
                {activeTool ? `Near ${activeTool}` : 'Tool orbit'}
            </span>
        </section>
    );
}
