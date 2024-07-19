import ScrollToTop from 'react-scroll-up';

import About from "./components/about";
import Education from "./components/education";
import Experience from "./components/experience";
import Header from "./components/header";
import Projects from "./components/projects";
import Contact from './components/contact';

export default function Home() {
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24"
        <main className="flex flex-col mx-5 my-5 items-center">
            <Header />

            <div className="flex flex-col items-center max-w-screen-md mt-4">
                <About />
                <Experience />
                <Education />
                <Projects />
                <Contact />
            </div>
        </main>
    );
}
