import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import gitHub from "./assets/slateGitHub.png";
import gmail from "./assets/slateGmail.png";
import linkedIn from "./assets/slateLinkedIn.png";

function Contact() {
    const LOGO = `w-[3.5rem] border-slate-700 border-[2px] rounded-[.5rem]`
    return (
        <div>
            <Header/>
                <h1 className="text-center text-lg text-white font-[650]">
                    Let's Get in Contact
                </h1>
                <div className="mt-[1rem] flex flex-col items-center justify-center gap-2">
                    <img className={LOGO} src={gitHub} alt="GitHub Logo" draggable="false"/>
                    <img className={LOGO} src={gmail} alt="Gmail Logo" draggable="false"/>
                    <img className={LOGO} src={linkedIn} alt="LinkedIn Logo" draggable="false"/>
                </div>
            <Footer/>
        </div>
    );
}

export default Contact;
