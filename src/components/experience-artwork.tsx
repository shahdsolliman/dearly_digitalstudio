import type { Experience } from "@/data/experiences";

const palettes: Record<string, { canvas: string; paper: string; blush: string; green: string; ink: string }> = {
  Wedding: { canvas: "#ecddcf", paper: "#f8f5f0", blush: "#efbcb9", green: "#a8b83c", ink: "#541c2b" },
  Engagement: { canvas: "#efbcb9", paper: "#f8f5f0", blush: "#ecddcf", green: "#6b9203", ink: "#541c2b" },
  Birthday: { canvas: "#ecddcf", paper: "#f8f5f0", blush: "#efbcb9", green: "#6b9203", ink: "#541c2b" },
  Graduation: { canvas: "#e5e8d2", paper: "#f8f5f0", blush: "#efbcb9", green: "#6b9203", ink: "#541c2b" },
  Events: { canvas: "#541c2b", paper: "#ecddcf", blush: "#efbcb9", green: "#a8b83c", ink: "#f8f5f0" },
  Surprise: { canvas: "#efbcb9", paper: "#f8f5f0", blush: "#ecddcf", green: "#6b9203", ink: "#541c2b" },
  "Business Websites": { canvas: "#ecddcf", paper: "#f8f5f0", blush: "#efbcb9", green: "#6b9203", ink: "#541c2b" },
  "Landing Pages": { canvas: "#e9e8d9", paper: "#f8f5f0", blush: "#efbcb9", green: "#6b9203", ink: "#541c2b" },
};

function Illustration({ category, colors }: { category: string; colors: (typeof palettes)[string] }) {
  switch (category) {
    case "Wedding":
      return (
        <g stroke={colors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M112 410V245a118 118 0 0 1 236 0v165" fill={colors.paper} />
          <path d="M137 410V248a93 93 0 0 1 186 0v162" fill="none" opacity=".55" />
          <circle cx="230" cy="192" r="34" fill={colors.blush} stroke="none" />
          <path d="M172 410v-57c0-33 26-59 58-59s58 26 58 59v57" fill={colors.blush} />
          <path d="M230 295v115" fill="none" />
          <path d="M87 400c35-30 42-66 34-103m226 103c-35-30-42-66-34-103" fill="none" stroke={colors.green} />
          <path d="m112 342-20-20m28-7 19-21m194 48 20-20m-28-7-19-21" fill="none" stroke={colors.green} />
          <circle cx="91" cy="318" r="7" fill={colors.blush} stroke="none" />
          <circle cx="351" cy="318" r="7" fill={colors.blush} stroke="none" />
        </g>
      );
    case "Engagement":
      return (
        <g stroke={colors.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="207" cy="285" rx="72" ry="95" transform="rotate(-32 207 285)" />
          <ellipse cx="253" cy="285" rx="72" ry="95" transform="rotate(32 253 285)" stroke={colors.green} />
          <path d="m230 176 34 45-34 44-34-45 34-44Z" fill={colors.paper} />
          <path d="m196 221 34 8 34-8m-34-53v105" stroke={colors.blush} />
          <path d="M230 142v-22m71 49 17-15m-160 15-17-15m214 91 23-4m-238 4-23-4" stroke={colors.green} />
          <circle cx="230" cy="119" r="4" fill={colors.blush} stroke="none" />
        </g>
      );
    case "Birthday":
      return (
        <g stroke={colors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M125 335h210v82H125z" fill={colors.blush} />
          <path d="M153 276h154v59H153z" fill={colors.paper} />
          <path d="M180 230h100v46H180z" fill={colors.green} />
          <path d="M172 276h116m-161 60h207M180 230v-30m50 30v-42m50 42v-30" fill="none" />
          <path d="M180 193c-12-13 12-18 0-31m50 16c-12-13 12-18 0-31m50 45c-12-13 12-18 0-31" fill="none" stroke={colors.blush} />
          <circle cx="128" cy="190" r="5" fill={colors.green} stroke="none" />
          <circle cx="333" cy="220" r="5" fill={colors.blush} stroke="none" />
          <path d="m102 267 9-16 9 16 16 9-16 9-9 16-9-16-16-9 16-9Z" fill={colors.paper} />
        </g>
      );
    case "Graduation":
      return (
        <g stroke={colors.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m112 245 118-62 118 62-118 63-118-63Z" fill={colors.green} />
          <path d="m158 270 72 39 72-39v53c-39 34-105 34-144 0v-53Z" fill={colors.paper} />
          <path d="M348 246v91m0 0c-14 0-19 12-13 23h26c6-11 1-23-13-23Z" fill={colors.blush} />
          <path d="M196 350h68v82h-68z" fill={colors.paper} />
          <path d="M196 365h68m-68 14h49m-49 14h42" fill="none" />
          <circle cx="230" cy="245" r="9" fill={colors.blush} stroke="none" />
        </g>
      );
    case "Events":
      return (
        <g stroke={colors.paper} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M103 410V267a127 127 0 0 1 254 0v143" fill="none" opacity=".6" />
          <path d="M143 410V274a87 87 0 0 1 174 0v136" fill={colors.ink} />
          <path d="M191 410V282a39 39 0 0 1 78 0v128" fill={colors.blush} />
          <path d="M89 192c48-42 91-54 141-54s93 12 141 54" fill="none" stroke={colors.green} />
          <circle cx="133" cy="163" r="5" fill={colors.blush} stroke="none" />
          <circle cx="186" cy="143" r="5" fill={colors.paper} stroke="none" />
          <circle cx="230" cy="138" r="5" fill={colors.blush} stroke="none" />
          <circle cx="275" cy="143" r="5" fill={colors.paper} stroke="none" />
          <circle cx="327" cy="163" r="5" fill={colors.blush} stroke="none" />
          <path d="M85 410h290" stroke={colors.green} />
        </g>
      );
    case "Surprise":
      return (
        <g stroke={colors.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M123 264h214v158H123z" fill={colors.blush} />
          <path d="M105 225h250v49H105z" fill={colors.paper} />
          <path d="M214 225v197m-109-131h250" fill="none" />
          <path d="M230 226c-65 0-87-65-44-65 29 0 44 65 44 65Zm0 0c65 0 87-65 44-65-29 0-44 65-44 65Z" fill={colors.green} />
          <path d="m230 224 14 17-14 18-14-18 14-17Z" fill={colors.paper} />
          <path d="M146 305h46m-46 19h36m90-19h46m-46 19h36" fill="none" opacity=".55" />
        </g>
      );
    case "Business Websites":
      return (
        <g stroke={colors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M114 410V218h232v192" fill={colors.paper} />
          <path d="M99 218h262l-20-47H119l-20 47Z" fill={colors.blush} />
          <path d="M99 218c0 27 39 27 39 0 0 27 39 27 39 0 0 27 39 27 39 0 0 27 39 27 39 0 0 27 39 27 39 0 0 27 39 27 39 0" fill={colors.paper} />
          <path d="M147 270h60v66h-60zm106 0h60v140h-60z" fill={colors.canvas} />
          <path d="M162 286h30m-30 14h30m-30 14h22m111-28h30m-30 14h30m-30 14h22" fill="none" />
          <path d="M82 410h296m-254-1v-34h20v34" fill="none" stroke={colors.green} />
        </g>
      );
    default:
      return (
        <g stroke={colors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="103" y="170" width="254" height="237" rx="5" fill={colors.paper} />
          <path d="M104 205h252" />
          <circle cx="124" cy="188" r="4" fill={colors.blush} stroke="none" />
          <circle cx="140" cy="188" r="4" fill={colors.green} stroke="none" />
          <circle cx="156" cy="188" r="4" fill={colors.ink} stroke="none" />
          <rect x="130" y="232" width="95" height="149" fill={colors.blush} stroke="none" />
          <path d="M250 247h79m-79 20h60m-60 50h79m-79 20h63m-63 20h73" fill="none" />
          <path d="m250 289 22-18 18 12 22-22 18 8" fill="none" stroke={colors.green} strokeWidth="4" />
          <circle cx="233" cy="137" r="27" fill={colors.green} stroke="none" />
          <path d="M233 120v34m-17-17h34" stroke={colors.paper} />
        </g>
      );
  }
}

export default function ExperienceArtwork({ experience }: { experience: Experience }) {
  const colors = palettes[experience.category] ?? palettes.Wedding;

  return (
    <svg
      className="experience-artwork"
      viewBox="0 0 460 560"
      role="img"
      aria-label={`${experience.title}, an illustrated ${experience.category.toLowerCase()} experience`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="560" fill={colors.canvas} />
      <path d="M24 535V44c0-11 9-20 20-20h372c11 0 20 9 20 20v491" fill="none" stroke={colors.ink} strokeOpacity=".24" />
      <path d="M42 534V56c0-8 6-14 14-14h348c8 0 14 6 14 14v478" fill="none" stroke={colors.ink} strokeOpacity=".14" />
      <text x="230" y="81" textAnchor="middle" fill={colors.ink} fontFamily="Avenir Next, sans-serif" fontSize="10" letterSpacing="3">AN EXPERIENCE BY DEARLY</text>
      <Illustration category={experience.category} colors={colors} />
      <path d="M196 466h68" stroke={colors.green} strokeWidth="1.5" />
      <circle cx="184" cy="466" r="3" fill={colors.blush} />
      <circle cx="276" cy="466" r="3" fill={colors.blush} />
      <text x="230" y="499" textAnchor="middle" fill={colors.ink} fontFamily="Bodoni MT, Didot, Georgia, serif" fontSize="21" letterSpacing="1.3">{experience.title}</text>
      <text x="230" y="523" textAnchor="middle" fill={colors.green} fontFamily="Avenir Next, sans-serif" fontSize="9" letterSpacing="2.5">{experience.category.toUpperCase()}</text>
    </svg>
  );
}