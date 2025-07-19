import gitHub from "./assets/slateGitHub.png";
import gmail from "./assets/slateGmail.png";
import linkedIn from "./assets/slateLinkedIn.png";

function Footer() {
    const ICON = `w-[2rem] h-[2rem] border border-slate-800 rounded md:w-[2.5rem] 
    md:h-[2.5rem]`;
    const TEXT = "text-xs text-slate-400 font-[600] md:text-sm xl:text-base";

    const LINKS = [
        {href: "https://github.com/Nero1889",
        src: gitHub,
        alt: "Slate GitHub Icon",
        title: "GitHub"},

        {href: "mailto:mceclipse1889@gmail.com",
        src: gmail,
        alt: "Slate Gmail Icon",
        title: "Gmail"},

        {href: "https://www.linkedin.com/in/raul-luna-249325329/",
        src: linkedIn,
        alt: "Slate LinkedIn Icon",
        title: "LinkedIn"}
    ];

    return (
        <footer className="my-[2.5rem] mx-[2rem]">
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className={TEXT}>Raul Luna - 2025</p>
                    <p className={TEXT}>© Webflix</p>
                </div>
                <div className="flex gap-2 md:gap-5">
                    {LINKS.map(({href, src, alt, title}, i) => (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        title={title}>
                            <img className={ICON} src={src} alt={alt}/>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
