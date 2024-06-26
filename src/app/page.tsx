import About from "./components/about";
import Experience from "./components/experience";
import Header from "./components/header";

export default function Home() {
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24"
        <main className="flex flex-col mx-5 mt-5 items-center">
            <Header />

            <div className="flex flex-col items-center max-w-screen-md mt-4">
                <About />
                <Experience />
            </div>
        </main>
    );
}
