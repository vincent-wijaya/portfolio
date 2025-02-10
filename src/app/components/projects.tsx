import Image from "next/image";

const projectList = [
    {
        title: 'PowerTrack - KafkaJS',
        description:
            'An energy monitoring platform for retailers and consumers which allows users to view their energy consumption and generation trends. This project\'s main focus is to demonstrate KafkaJS\'s capabilities as a data-streaming pipeline.' ,
        tools: [
            'Next.js',
            'KafkaJS',
            'Sequelize',
            'TypeScript',
            'Docker',
        ]
    },
    {
        title: 'Mobilise Volunteering Platform',
        description:
            'A centralised platform for volunteers to find and apply for volunteering opportunities. Our team continued the development of the platform from the previous semester, where only the some of the front-end was completed. I worked on the outreach management side of the platform, where Mobilise can manage their outreach events and volunteers can sign up for events.',
        tools: [
            'React', 
            'Supabase', 
            'PostgreSQL', 
            'JavaScript',
            'Sass',
            'GitHub'
        ],
        links: [
            {
                title: 'Mobilise',
                url: 'https://wearemobilise.org.au/',
            },
        ],
    },
    {
        title: 'Internet-Based Brewing Controller',
        description:
            "A Final Year Project to create a web-based controller for a Monash Brewlab's fermentation system. The system consists of a AWS hosted web server and a Raspberry Pi to control the fermentation system. \n\nFeatures include temperature control, data logging, and remote monitoring. \n\nI mainly worked on the web interface, adding the live chart display, schedule event system, manual override system, and the authentication component of the web interface.",
        tools: [
            'Vue.js',
            'AWS',
            'AWS Gateway',
            'AWS Lambda',
            'AWS DynamoDB',
            'AWS Cognito',
            'AWS S3',
            'Raspberry Pi',
            'Python',
            'JavaScript',
            'GitHub',
        ],
        links: [
            {
                title: 'Monash Brewlab',
                url: 'https://www.monashbrewlab.com/',
            },
            {
                title: 'Google Drive',
                url: 'https://drive.google.com/drive/u/0/folders/1zksBAL9Lfi7xnPTBEBDQ2Vr_fsmgG2bX'
            }
        ],
        images: [
            {
                title: 'Home Page',
                url: 'assets/mb_home.png',
                isPortrait: false,
            },
            {
                title: 'Schedule Event Page',
                url: 'assets/mb_schedule.png',
                isPortrait: true,
            },
            {
                title: 'Faults',
                url: 'assets/mb_fault.png',
                isPortrait: false,
            },
            {
                title: 'Team Photo with product',
                url: 'assets/mb_team.jpg',
                isPortrait: false,
            }
        ]
    },
    {
        title: 'Finding Neno - Lost Pet Finder Mobile App',
        description:
            'A mobile app that allows users to report lost pets and view lost pets in their area. Users can post lost pets, view lost pets in their area, post sightings of pets, and contact the owner of the lost pet. Missing pets that are reported nearby are notified to the user.',
        tools: [
            'React Native', 
            'Expo',
            'Flask',
            'PostgreSQL', 
            'GitHub',
            'Google Maps API', 
            'Python',
            'JavaScript',
            'Rest API',
            'SendGrid'
        ],
        links: [
            {
                title: 'GitHub',
                url: 'https://github.com/Monash-FIT3170/Finding-Neno/',
            },
        ],
        images: [
            {
                title: 'Login Page',
                url: 'assets/fn_login.png',
                isPortrait: true,
            },
            {
                title: 'Missing Pet Reports',
                url: 'assets/fn_reports.png',
                isPortrait: true,
            },
            {
                title: 'Map page',
                url: 'assets/fn_map.png',
                isPortrait: true,
            },
        ]
    },
];

const toolColors: { [key: string]: string } = {
    React: 'border-blue-400',
    'React Native': 'border-blue-200',
    'Vue.js': 'border-green-400',
    Flask: 'border-gray-400',
    PostgreSQL: 'border-cyan-600',
    'Supabase': 'border-green-500',
    'AWS': 'border-orange-400',
    'AWS Gateway': 'border-yellow-400',
    'AWS Lambda': 'border-orange-400',
    'AWS DynamoDB': 'border-blue-600',
    'AWS Cognito': 'border-red-500',
    'AWS S3': 'border-red-300',
    'Raspberry Pi': 'border-red-400',
    Python: 'border-yellow-400',
    GitHub: 'border-gray-400',
    'Google Maps API': 'border-green-400',
    'Rest API': 'border-gray-400',
    Sass: 'border-pink-400',
    SendGrid: 'border-blue-400',
    Sequelize: 'border-blue-300',
    'Next.js': 'boreder-black-500',
    TypeSript: 'border-blue-400',
    JavaScript: 'border-yellow-400',
}

export default function Projects() {
    return (
        <section
            id="projects"
            className="flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white  rounded-3xl w-full">
            <h2 className="text-3xl font-bold">Projects</h2>

            {projectList.map((project, index) => (
                <div
                    id={project.title}
                    key={`${project}-${index}`}
                    className="mt-4 transition duration-300 hover:translate-x-2">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-lg mb-2">{project.description}</p>
                    <div className="flex flex-col mb-2">
                        <div className="flex flex-wrap flex-row gap-2">
                            {project.tools?.map((tool, index) => (
                                <p
                                    key={`${tool}-${index}`}
                                    className={`text-sm transition duration-300 p-2 py-1 border-4 w-max whitespace-nowrap rounded-full ${toolColors[tool]} hover:brightness-150`}>
                                    {tool}
                                </p>
                            ))}
                        </div>
                    </div>
                    {project.links && project.links.length > 0 && (
                        <div className="flex flex-col mb-2">
                            Links
                            <div className="flex flex-row flex-wrap gap-2">
                                {project.links?.map((link, index) => (
                                    <a
                                        key={`${link}-${index}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <button
                                            className="text-lg transition duration-300 bg-blue-600 hover:brightness-75 p-1 px-2 rounded-md"
                                        >
                                            {link.title}
                                        </button>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-row flex-wrap justify-between gap-2">
                        {project.images?.map((image, index) => (
                            <Image
                                key={`${image}-${index}`}
                                src={image.url}
                                alt={image.title}
                                width={image.isPortrait ? 230 : 500}
                                height={image.isPortrait ? 500 : 200}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
