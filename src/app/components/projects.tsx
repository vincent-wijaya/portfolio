const projectList = [
    {
        title: 'Mobilise Volunteering Platform',
        description:
            'A centralised platform for volunteers to find and apply for volunteering opportunities.',
        tools: [
            'React', 
            'Supabase', 
            'PostgreSQL', 
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
            "A Final Year Project to create a web-based controller for a Monash Brewlab's fermentation system. The system consists of a AWS hosted web server and a Raspberry Pi to control the fermentation system. \n\nFeatures include temperature control, data logging, and remote monitoring.",
        tools: [
            'Vue.js',
            'AWS',
            'AWS Gateway',
            'AWS Lambda',
            'AWS DynamoDB',
            'AWS S3',
            'Raspberry Pi',
            'Python',
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
    },
    {
        title: 'Finding Neno - Lost Pet Finder Mobile App',
        description:
            'A mobile app that allows users to report lost pets and view lost pets in their area. The app allows users to post lost pets, view lost pets in their area, post sightings of pets, and contact the owner of the lost pet.',
        tools: [
            'React Native', 
            'Expo',
            'Flask',
            'PostgreSQL', 
            'GitHub',
            'Google Maps API', 
            'Rest API',
            'SendGrid'
        ],
        links: [
            {
                title: 'GitHub',
                url: 'https://github.com/Monash-FIT3170/Finding-Neno/',
            },
        ],
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
    'AWS S3': 'border-red-300',
    'Raspberry Pi': 'border-red-400',
    Python: 'border-yellow-400',
    GitHub: 'border-gray-400',
    'Google Maps API': 'border-green-400',
    'Rest API': 'border-gray-400',
    SendGrid: 'border-blue-400',
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
                        Tools
                        <div className="flex flex-wrap flex-row gap-2">
                            {project.tools?.map((tool, index) => (
                                <p
                                    key={`${tool}-${index}`}
                                    className={`text-sm transition duration-300 p-2 py-1 border-4 w-max whitespace-nowrap rounded-full ${toolColors[tool]} hover:brightness-150`}
                                >
                                    {tool}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Links
                        <div className="flex flex-row flex-wrap gap-2">
                            {project.links?.map((link, index) => (
                                <button
                                    key={`${link}-${index}`}
                                    className="text-lg transition duration-300 bg-blue-600 hover:brightness-75 p-1 px-2 rounded-md">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer">
                                        {link.title}
                                    </a>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
