import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import back from "./assets/back.png";
import {useNavigate} from "react-router-dom";
import tomHolland from "./assets/tomHolland.png";
import cake from "./assets/birthdayCake.png";
import location from "./assets/location.png";

function Actor() {
    const ROLE = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2 rounded-[3rem] mr-2 mb-2`;
    const BIRTH = "text-xs font-[550] text-slate-400 w-[15ch]";

    const LINE_CLAMP3 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        whiteSpace: "normal",
    }

    const navigate = useNavigate();

    return (
        <div>
            <Header/>
                <button onClick={() => navigate(-1)} className="absolute z-8 ml-[1rem]
                mt-[1rem] p-2 rounded-full bg-slate-800 hover:bg-slate-900 
                transition-colors duration-[.25s] flex items-center justify-center">
                    <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon" draggable="false"/>
                </button>
            <div className="mx-[2rem] flex items-center justify-between gap-5">
                <img className="w-[7rem] h-[auto] rounded-[1rem]" src={tomHolland} alt="Tom Holland"/>
                <div>
                    <h1 className="text-sm font-[550] text-[white] mb-[.5rem]">Tom Holland</h1>
                    <div className="flex gap-2 items-center mb-[.25rem]">
                        <img className="w-[1rem] h-[1rem]" src={cake} alt="Birthday Cake Icon" draggable="false"/>
                        <p className={BIRTH}>June 1, 1996</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="w-[1rem] h-[1rem]" src={location} alt="Birthday Cake Icon" draggable="false"/>
                        <p className={BIRTH}>Surrey, England, UK</p>
                    </div>
                </div>
            </div>

            <div className="ml-[2rem] mt-[2rem]">
                <div className="flex flex-wrap gap-1">
                    <p className={ROLE}>Actor</p>
                    <p className={ROLE}>Producer</p>
                    <p className={ROLE}>Director</p>
                </div>
            </div>
            
            <div className="mx-[2rem] mt-[2rem]">
                <h1 className="text-white text-base font-[600]">Biography</h1>
                <p className="text-slate-600 text-sm font-[600] mt-[1rem]">Thomas Stanley 
                Holland, born June 1, 1996 in Kingston-upon-Thames, England, is an 
                award-winning English actor. He first found success on stage, playing 
                Billy Elliot in the 2008 musical and taking over the title role until 
                2010.</p>
            </div>

            <div className="ml-[2rem] mt-[3rem]">
                <h1 className="text-white text-base font-[600] mb-[1rem]">
                    Movies
                </h1>
                <div className="flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide mt-[1rem]">
                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 style={LINE_CLAMP3} className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">
                            Movie Title
                        </h3>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 style={LINE_CLAMP3} className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Movie Title</h3>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 style={LINE_CLAMP3} className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Movie Title</h3>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Actor;