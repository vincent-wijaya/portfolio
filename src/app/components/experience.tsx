import Image from 'next/image';

const experienceList = [
    {
        title: 'Technology Project Consultant',
        company: '180 Degrees Consulting Monash',
        location: 'Clayton, VIC',
        date: 'February 2024 - June 2024',
        description:
            'Worked with a team of Computer Science and Software Engineering students to develop a web application for Mobilise. The application is designed to help Mobilise manage their volunteers and events, and volunteers to sign up for events.',
        logo: '/assets/180dc.jpeg',
        logo_dark: '/assets/180dc_dark.jpg',
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
                    key={`${experience}-${index}`}
                    className="mt-4 transition duration-300 hover:translate-x-2">
                    <picture>    
                        <source srcSet={experience.logo_dark} media="(prefers-color-scheme: dark)" />
                        <Image
                            src={experience.logo}
                            alt={experience.company}
                            width={100}
                            height={100}
                        />
                    </picture>
                    <h3 className="text-2xl font-bold">{experience.title}</h3>
                    <div className="flex justify-between">
                        <p className="text-lg font-bold italic">
                            {experience.company}
                        </p>
                        <p className="text-lg">{experience.location}</p>
                    </div>
                    <p className="text-lg">{experience.date}</p>
                    <p className='text-lg'>{experience.description}</p>
                </div>
            ))}
        </section>
    );
}
