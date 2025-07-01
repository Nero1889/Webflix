import gitHub from "./assets/slateGitHub.png";
import gmail from "./assets/slateGmail.png";
import linkedIn from "./assets/slateLinkedIn.png";

function Footer() {
    return (
        <footer className="my-[2.5rem] mx-[2rem]">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h3 className="text-xs text-slate-400 font-[700]">Raul Luna - 
                    2025</h3>
                    <p className="text-xs text-slate-400 font-[700]">© Webflix</p>
                </div>

                <div className="flex gap-2">
                    <a href="https://github.com/Nero1889" target="_blank" title="GitHub">
                        <img className="w-[2rem] h-[2rem] border border-slate-700 
                        rounded" src={gitHub} alt="Slate GitHub Icon"/>
                    </a>
                    <a href="mailto:mceclipse1889@gmail.com" target="_blank" 
                    title="Gmail">
                        <img className="w-[2rem] h-[2rem] border border-slate-700
                        rounded" src={gmail} alt="Slate Gmail Icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/raul-luna-249325329/" 
                    target="_blank" title="LinkedIn">
                        <img className="w-[2rem] h-[2rem] border border-slate-700 
                        rounded" src={linkedIn} alt="Slate LinkedIn Icon"/>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;