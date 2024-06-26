'use client';

export default function About() {
    return (
        <section id='about-me' className='flex flex-col flex-1 p-6 transition duration-300 hover:bg-opacity-10 hover:bg-white rounded-3xl'>
            <h2 className='text-3xl font-bold'>About Me</h2>
            <p className='text-xl mt-4'>
                Hi, I'm
            </p>
            <p className='text-5xl mt-4 font-bold italic'>Vincent Wijaya</p>
            <p className='text-xl mt-4'>
                I'm a software engineer student based in Melbourne. I am set to graduate at the end of 2024 with 
                a Bachelor of Software Engineering (Hons) from Monash University.
            </p>
        </section>
    );
}
