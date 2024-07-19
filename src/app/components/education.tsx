import Image from 'next/image';

const educationList = [
    {
        school: 'Monash University',
        degree: 'Bachelor of Software Engineering (Honours)',
        date: 'February 2020 - December 2024',
        location: 'Clayton, VIC',
        description: 'Current GPA: 3.38, WAM: 77.56',
        logo: 'assets/monash.svg',
        logo_dark: 'assets/monash_dark.png',
        url: 'https://www.monash.edu/',
    },
    {
        school: 'Monash College',
        degree: 'Diploma of Engineering',
        date: 'June 2018 - December 2019',
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

export default function Education() {
    return (
        <section
            id="education"
            className="flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white  rounded-3xl w-full">
            <h2 className="text-3xl font-bold">Education</h2>

            {educationList.map((education, index) => (
                <div
                    id={education.school}
                    key={`${education}-${index}`}
                    className="mt-4 transition duration-300 hover:translate-x-2">
                    <picture className="mb-3">
                        <source
                            srcSet={education.logo_dark}
                            media="(prefers-color-scheme: dark)"
                        />
                        <Image
                            src={education.logo}
                            alt={education.school}
                            width={200}
                            height={50}
                        />
                    </picture>
                    <h3 className="text-2xl font-bold">{education.degree}</h3>
                    <div className="flex justify-between">
                        <p className="text-lg font-bold italic">
                            {education.school}
                        </p>
                        <p className="text-lg">{education.location}</p>
                    </div>
                    <p className="text-lg">{education.date}</p>
                    <p className="text-lg mb-2">{education.description}</p>
                    <div className="flex flex-col">
                        <div className="flex flex-row flex-wrap gap-2 justify-between">
                            {education.videos?.map((video) => (
                                <iframe
                                    key={video.title}
                                    width='350'
                                    height='200'
                                    src={video.url}
                                    title={video.title}
                                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    referrerPolicy='strict-origin-when-cross-origin'
                                    allowFullScreen
                                >
                                </iframe>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
