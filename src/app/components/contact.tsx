import { Button } from '@nextui-org/react';
import LinkedInIcon from './LinkedinIcon';

export default function Contact() {
    return (
        <section
            id="contact"
            className="flex flex-col flex-1 p-6 transition duration-300 
            hover:bg-opacity-10 hover:bg-white  rounded-3xl w-full">
            <h2 className="text-3xl font-bold">Contact</h2>
            <div className="flex flex-row align-middle justify-between mt-4">
                <h3 className='text-xl'>Email</h3>
                <p className="text-lg">
                    <a href="mailto:vincentwijaya2001@yahoo.com">
                        vincentwijaya2001@yahoo.com
                    </a>
                </p>
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
                <p className="text-lg">
                    <a href="https://www.github.com/vincenwi" target="_blank">
                        Vincent Wijaya
                    </a>
                </p>
            </div>
        </section>
    );
}
