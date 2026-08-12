'use client';

import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('vincent@vwijaya.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="flex w-full flex-col items-center px-6 py-12 sm:py-16">
      <p className="mb-6 font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        Contact
      </p>

      {/* Business card — interaction surface */}
      <article className="w-full max-w-md overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <div className="flex items-stretch">
          <div className="w-1.5 shrink-0 bg-[var(--accent)]" aria-hidden />
          <div className="flex min-w-0 flex-1 flex-col gap-6 p-6 sm:p-7">
            <header>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--sand)] sm:text-3xl">
                Vincent Wijaya
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Software Engineer · Melbourne
              </p>
            </header>

            <div className="border-t border-[var(--line)] pt-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Email
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a
                  href="mailto:vincent@vwijaya.com"
                  className="font-display text-base text-[var(--sand)] underline decoration-[var(--line)] underline-offset-4 transition hover:text-[var(--accent)] hover:decoration-[var(--accent)] sm:text-lg"
                >
                  vincent@vwijaya.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs font-medium text-[var(--accent)] transition hover:brightness-90"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <dl className="grid gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  LinkedIn
                </dt>
                <dd className="mt-1.5">
                  <a
                    href="https://www.linkedin.com/in/vincenwi/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[var(--sand)] transition hover:text-[var(--accent)]"
                  >
                    /in/vincenwi
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  GitHub
                </dt>
                <dd className="mt-1.5">
                  <a
                    href="https://www.github.com/vincent-wijaya"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[var(--sand)] transition hover:text-[var(--accent)]"
                  >
                    /vincent-wijaya
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </section>
  );
}
