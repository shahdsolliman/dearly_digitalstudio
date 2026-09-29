export default function WeddingPortrait() {
  return (
    <svg
      className="wedding-portrait-art"
      viewBox="0 0 720 850"
      role="img"
      aria-label="An illustrated wedding portrait of Mahmoud and Shrouk"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="portrait-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#786657" />
          <stop offset="1" stopColor="#2c2825" />
        </linearGradient>
        <radialGradient id="portrait-sunset">
          <stop stopColor="#edc77c" stopOpacity=".7" />
          <stop offset="1" stopColor="#edc77c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="portrait-dress" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffdf7" />
          <stop offset="1" stopColor="#d8cdbb" />
        </linearGradient>
      </defs>
      <rect width="720" height="850" fill="url(#portrait-ground)" />
      <ellipse cx="360" cy="333" rx="340" ry="345" fill="url(#portrait-sunset)" />
      <path d="M22 746V350a338 338 0 0 1 676 0v396" fill="none" stroke="#dfba73" strokeOpacity=".54" strokeWidth="3" />
      <path d="M70 746V359a290 290 0 0 1 580 0v387" fill="none" stroke="#f4efe6" strokeOpacity=".42" strokeWidth="2" />
      <path d="M0 750q174-62 360 0t360 0v100H0Z" fill="#1d1917" fillOpacity=".55" />
      <path d="M287 363q-15-98 71-117 78 24 64 118l-12 80H300Z" fill="#2b1e19" />
      <ellipse cx="356" cy="346" rx="46" ry="57" fill="#bd9271" />
      <path d="M309 345q-5-89 51-100 62 10 69 94-31-35-63-35-27 24-57 41Z" fill="#302019" />
      <path d="M273 450q82-53 164 0l72 298H204Z" fill="url(#portrait-dress)" />
      <path d="M301 461q-47 29-64 94m132-98q52 26 73 93" fill="none" stroke="#c5a059" strokeOpacity=".42" strokeWidth="3" />
      <path d="M258 552q98 39 193-1M238 634q120 44 232 0" fill="none" stroke="#c5a059" strokeOpacity=".24" strokeWidth="2" />
      <path d="M402 462q70-44 132 1l51 287H385Z" fill="#332a27" />
      <path d="M439 469 477 514l35-45" fill="none" stroke="#dfba73" strokeOpacity=".82" strokeWidth="3" />
      <path d="m472 514 12 45 13-45" fill="#f4efe6" />
      <path d="M468 558h29l-7 112h-17Z" fill="#2c2825" />
      <path d="M298 381q51 58 108 0" fill="none" stroke="#f7eee2" strokeOpacity=".7" strokeWidth="8" />
      {[105, 615].map((x) => (
        <g key={x} fill="none" stroke="#8b9074" strokeLinecap="round">
          <path d={`M${x} 748q-15-87-57-150m57 150q6-99 46-157m-46 157q24-70 72-102`} strokeWidth="5" />
          <circle cx={x - 58} cy="594" r="10" fill="#dfba73" stroke="none" />
          <circle cx={x + 44} cy="591" r="8" fill="#f4efe6" fillOpacity=".7" stroke="none" />
          <circle cx={x + 72} cy="645" r="9" fill="#c5a059" stroke="none" />
        </g>
      ))}
    </svg>
  );
}