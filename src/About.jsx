import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import react from "./assets/React.png";
import tailwind from "./assets/TailwindCSS.png";
import luna from "./assets/selfImage.jpg";

function About() {
    const LANG = "w-[5rem] sm:w-[6rem] md:w-[7rem] 2xl:md:w-[8rem]";
    const TITLE = `text-[white] text-lg font-[650] text-center sm:text-xl
    md:text-2xl 2xl:text-3xl`;
    const DESC = `mx-[2rem] text-slate-500 text-sm font-[550] mt-[1rem] text-left
    sm:w-[50ch] md:text-base lg:w-[60ch] xl:w-[65ch] 2xl:text-lg`;

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-10 mt-[1rem]
                md:mt-[2rem] 2xl:mt-[3rem]">
                    <img className={LANG} src={react} alt="React Logo"
                    draggable="false"/>
                    <img className={LANG} src={tailwind} alt="Tailwind CSS Logo"
                    draggable="false"/>
                </div>
                <h1 className={`${TITLE} mt-[1rem] md:mt-[1.5rem] md:mb-[1.5rem]`}>
                    What is Webflix?
                </h1>
                <p className={DESC}>Webflix is a modern movie-app project built from the
                ground up. Designed first in Figma then developed using both ReactJS and
                Tailwind CSS.</p>
                <p className={DESC}>Webflix is able to fetch data from an API via The
                Movie Database, including movies, TV shows and even actors!</p>

                <h1 className={`${TITLE} mt-[3rem] sm:mt-[4rem] lg:mt-[5rem]
                2xl:mt-[7rem]`}>About the Creator</h1>
                <div className="flex items-center justify-center mt-[1rem]
                md:mb-[1.5rem]">
                    <img className="mx-[2rem] h-[7rem] rounded-[50%] md:h-[9rem]
                    2xl:h-[10rem]" src={luna} alt="Raul Luna"/>
                </div>
                <p className={DESC}>Webflix was designed by Raul Luna, based in Madison,
                WI!</p>
                <p className={DESC}>"Its been an incredible journey so far as a Front-End
                Web developer, and I plan on creating and building more projects and
                websites for the forceable future to continue growing and learning"</p>
            </div>
            <Footer/>
        </>
    );
}

export default About;
