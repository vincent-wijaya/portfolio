


const experienceList = [
    {
        title: 'Technology Project Consultant',
        company: '180 Degrees Consulting Monash',
        location: 'Clayton, VIC',
        date: 'February 2024 - June 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        logo: '../assets/180dc.png',
    },
]

export default function Experience() {
    return (
        <section className='flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white  rounded-3xl'
        >
            <h2 className='text-3xl font-bold'>Experience</h2>

            {experienceList.map((experience, index) => (
                <div key={`${experience}-${index}`} className='mt-4 transition duration-300 hover:translate-x-2'>
                    {/* <img src={experience.logo} alt={experience.company} className='w-24 h-24' /> */}
                    <h3 className='text-2xl font-bold'>{experience.title}</h3>
                    <div className='flex justify-between'>
                        <p className='text-lg font-bold italic'>{experience.company}</p>
                        <p className='text-lg'>{experience.location}</p>
                    </div>
                    <p className='text-lg'>{experience.date}</p>
                    <p className='text-lg'>{experience.description}</p>
                </div>
            ))}
        </section>

    )
}