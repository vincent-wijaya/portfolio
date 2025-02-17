'use client';

export default function About() {
    return (
        <section
            id="about"
            className="flex flex-col flex-1 p-6 transition duration-300 hover:bg-opacity-10 hover:bg-white rounded-3xl w-full">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="text-xl mt-4">Hello! I&apos;m</p>
            <p className="text-5xl mt-4 font-bold italic transition duration-300 hover:scale-125 text-center">
                Vincent Wijaya
            </p>
            <p className="text-xl mt-4">
                I&apos;m a graduate software engineer from Monash University
                with more than 2 years of experience in full-stack development
                of web and mobile applications with React and Node.js. Eager to
                continue learning and contribute technical expertise in the
                creation of impactful software.
            </p>
        </section>
    );
}
