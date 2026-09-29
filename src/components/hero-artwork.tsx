import DearlyLogo from "@/components/dearly-logo";

function HeroBranch({ mirror = false }: { mirror?: boolean }) {
  return (
    <g transform={mirror ? "translate(600 0) scale(-1 1)" : undefined} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M72 654c44-65 36-145 83-220 34-54 44-97 67-156" stroke="#a8b83c" strokeWidth="2" />
      <path d="M92 624c-28-2-42-23-37-44 29 1 45 17 37 44Zm28-47c-29 1-43-18-38-39 28-3 44 12 38 39Zm26-49c-29-3-41-23-35-43 28-1 43 15 35 43Zm24-48c-25-7-32-27-22-45 26 4 37 23 22 45Zm17-52c-21-12-24-33-10-47 23 9 29 29 10 47Z" fill="#6b9203" stroke="#6b9203" />
      <path d="M104 602c27-19 51-9 57 11-22 16-44 12-57-11Zm31-52c30-16 51-3 54 18-25 13-46 6-54-18Zm26-50c27-18 50-7 56 13-22 16-45 11-56-13Zm23-49c23-22 47-14 56 5-19 19-42 18-56-5Z" fill="#a8b83c" stroke="#a8b83c" />
      <circle cx="223" cy="275" r="10" fill="#efbcb9" stroke="none" />
      <circle cx="239" cy="266" r="6" fill="#efbcb9" stroke="none" />
      <circle cx="218" cy="256" r="5" fill="#efbcb9" stroke="none" />
      <circle cx="69" cy="568" r="7" fill="#efbcb9" stroke="none" />
    </g>
  );
}

export default function HeroArtwork() {
  return (
    <div className="hero-illustration" role="img" aria-label="A Dearly invitation framed by hand-drawn botanical branches">
      <svg className="hero-botanical" viewBox="0 0 600 760" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="760" fill="#541c2b" />
        <rect x="21" y="21" width="558" height="718" fill="none" stroke="#a8b83c" strokeOpacity=".56" />
        <path d="M64 650V300a236 236 0 0 1 472 0v350" fill="none" stroke="#efbcb9" strokeOpacity=".5" />
        <circle cx="300" cy="112" r="4" fill="#efbcb9" />
        <path d="m300 129 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2 5-10Z" fill="#efbcb9" />
        <HeroBranch />
        <HeroBranch mirror />
        <path d="M94 685h412" stroke="#efbcb9" strokeOpacity=".45" />
      </svg>
      <div className="hero-invitation">
        <span className="invitation-kicker">A day to remember</span>
        <DearlyLogo />
        <span className="invitation-line">Together, in full bloom</span>
        <span className="invitation-date">A LITTLE MOMENT · FOREVER YOURS</span>
      </div>
    </div>
  );
}