import Hero from './components/hero';
import Education from './components/education';
import Experience from './components/experience';
import Header from './components/header';
import Projects from './components/projects';
import Contact from './components/contact';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="mt-14 w-full max-w-screen-md overflow-x-visible px-5 pb-16 sm:mt-0 sm:pl-16">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
