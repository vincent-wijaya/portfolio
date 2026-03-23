'use client';

import { useState } from 'react';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('vincent@vwijaya.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section
            id="contact"
            className="flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white  rounded-3xl w-full">
            <h2 className="text-3xl font-bold">Contact</h2>
            <div className="flex flex-row align-middle justify-between mt-4">
                <h3 className='text-xl'>Email</h3>
                <div className="text-lg flex items-center gap-2">
                    <a
                        href="mailto:vincent@vwijaya.com"
                        className="underline underline-offset-4"
                    >
                        vincent@vwijaya.com
                    </a>
                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="text-sm border px-2 py-1 rounded-md transition duration-200 hover:brightness-125"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
            <div className="flex flex-row align-middle justify-between mt-2">
                <h3 className='text-xl'>LinkedIn</h3>
                <p className="bg-blue-600 px-3 py-2 rounded-full">
                    <a
                        href="https://www.linkedin.com/in/vincenwi/"
                        target="_blank">
                        Connect
                    </a>
                </p>
            </div>
            <div className="flex flex-row align-middle justify-between mt-2">
                <h3 className='text-xl'>GitHub</h3>
                <p className="bg-slate-500 px-3 py-2 rounded-full">
                    <a href="https://www.github.com/vincent-wijaya" target="_blank">
                        vincent-wijaya
                    </a>
                </p>
            </div>
        </section>
    );
}
