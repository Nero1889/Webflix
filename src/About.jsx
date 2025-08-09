import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import react from "./assets/React.png";
import tailwind from "./assets/TailwindCSS.png";
import luna from "./assets/selfImage.jpg";

function About() {
    const LANG = "w-[5rem] sm:w-[6rem] md:w-[7rem]";
    const TITLE = "text-[white] text-lg font-[650] text-center sm:text-xl md:text-2xl";
    
    const DESC = `mx-[2rem] text-slate-500 text-sm font-[550] mt-[1rem] text-left
    sm:mx-[3.4rem] md:text-base md:mx-[5rem] lg:mx-[10rem] xl:mx-[15rem] 2xl:mx-[20rem]`;

    return (
        <div>
            <Header/>
            <div className="flex items-center justify-center gap-10 mt-[1rem]">
                <img className={LANG} src={react} alt="React Logo" draggable="false"/>
                <img className={LANG} src={tailwind} alt="Tailwind CSS Logo" draggable="false"/>
            </div>

            <h1 className={`${TITLE} mt-[1rem] md:mt-[1.5rem] md:mb-[1.5rem]`}>What is Webflix?</h1>
            <p className={DESC}>Webflix is a modern movie-app project built from the 
            ground up. Designed first in Figma then developed using both ReactJS and
            Tailwind CSS.</p>

            <p className={DESC}>Webflix is able to fetch data from an API via The Movie
            Database, including movies, TV shows and even actors!</p>


            <h1 className={`${TITLE} mt-[3rem]`}>
                About the Creator
            </h1>
            <div className="flex items-center justify-center mt-[1rem] md:mb-[1.5rem]">
                <img className="mx-[2rem] h-[7rem] rounded-[50%] md:h-[9rem]" src={luna} 
                alt="Raul Luna"/>
            </div>
            <p className={DESC}>Webflix was designed by Raul Luna, based in Madison, 
            WI!</p>
            <p className={DESC}>"Its been an incredible journey so far as a Front-End 
            Web developer, and I plan on creating and building more projects and websites
            for the forceable future to continue growing and learning"</p>
            <Footer/>
        </div>
    );
}

export default About;
