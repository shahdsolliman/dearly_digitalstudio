import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/data/experiences";
import ExperienceArtwork from "@/components/experience-artwork";
import Reveal from "@/components/reveal";

function TemplateIllustration({ id }: { id: number }) {
  switch (id) {
    case 1:
      return (
        <g strokeLinejoin="round">
          <rect x="75" y="77" width="330" height="215" rx="15" fill="#ffb020" />
          <rect x="96" y="91" width="288" height="176" rx="8" fill="#fff" />
          <path d="M96 91 240 200 96 268Z" fill="#fff" />
          <path d="m384 91-144 109 144 68Z" fill="#fff" />
          <path d="M75 77h330L240 204Z" fill="#ffc94d" />
          <path d="M75 185 240 292 405 185v91q0 16-16 16H91q-16 0-16-16Z" fill="#ff9d2e" />
          <path d="M240 216v76" stroke="#fff2dc" strokeOpacity=".55" />
          <path d="M240 224s-23-15-23-31c0-13 16-17 23-6 7-11 23-7 23 6 0 16-23 31-23 31Z" fill="#f65d91" />
        </g>
      );
    case 9:
      return (
        <g strokeLinejoin="round">
          <defs>
            <pattern id="silver-preview-pattern" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="#b9bfca" />
              <path d="M7 0 14 7 7 14 0 7Z" fill="none" stroke="#7d8593" strokeWidth=".8" />
            </pattern>
            <linearGradient id="silver-preview-face" x2="0" y2="1">
              <stop stopColor="#2e323c" /><stop offset="1" stopColor="#0d0e11" />
            </linearGradient>
            <linearGradient id="silver-preview-edge" x2="1" y2="1">
              <stop stopColor="#8d94a1" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#8d94a1" />
            </linearGradient>
            <radialGradient id="silver-preview-seal" cx="35%" cy="28%">
              <stop stopColor="#fff" /><stop offset=".5" stopColor="#c9ced8" /><stop offset="1" stopColor="#6f7684" />
            </radialGradient>
          </defs>
          <rect x="63" y="66" width="354" height="238" rx="6" fill="url(#silver-preview-pattern)" stroke="url(#silver-preview-edge)" strokeWidth="2" />
          <path d="M72 74h336v220H72Z" fill="url(#silver-preview-face)" />
          <path d="M72 74 240 200 408 74v220H72Z" fill="url(#silver-preview-face)" stroke="url(#silver-preview-edge)" strokeWidth="2" />
          <path d="M72 294 218 177m190 117L262 177" stroke="#c9ced8" strokeOpacity=".3" />
          <path d="M80 286V82h320v204Z" fill="none" stroke="#c9ced8" strokeOpacity=".4" strokeDasharray="4 5" />
          <path d="M72 74h336L240 200Z" fill="url(#silver-preview-face)" stroke="url(#silver-preview-edge)" strokeWidth="2" />
          <path d="M96 84h288L240 180Z" fill="none" stroke="#c9ced8" strokeOpacity=".55" strokeDasharray="4 5" />
          <circle cx="240" cy="203" r="29" fill="url(#silver-preview-seal)" stroke="#777e8a" strokeWidth="4" />
          <text x="240" y="208" fill="#242832" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15">S&amp;V</text>
        </g>
      );
    case 11:
      return (
        <g strokeLinejoin="round">
          <rect x="64" y="65" width="352" height="238" rx="12" fill="#f5efe6" stroke="#c5a059" strokeWidth="2" />
          <rect x="83" y="72" width="314" height="213" rx="8" fill="#fffdf9" stroke="#d4c8ad" strokeWidth="2" />
          <path d="M103 95h274" stroke="#c5a059" strokeOpacity=".5" />
          <text x="240" y="91" fill="#8c6928" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" letterSpacing="2">WEDDING INVITATION</text>
          <text x="240" y="163" fill="#493627" textAnchor="middle" fontFamily="Georgia,serif" fontSize="29" fontStyle="italic">The Storybook Edit</text>
          <text x="240" y="191" fill="#8c6928" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13">Forever together</text>
          <path d="M208 211h64" stroke="#c5a059" />
          <text x="240" y="239" fill="#71685c" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12">06 / 10 / 2026</text>
          <path d="M64 65h352L240 242Z" fill="#eee7db" stroke="#c5a059" strokeWidth="2" />
          <path d="M80 75h320L240 223Z" fill="none" stroke="#d0bd92" strokeOpacity=".7" />
          <circle cx="240" cy="232" r="25" fill="#c99f52" stroke="#f3dfb5" strokeWidth="3" />
          <text x="240" y="237" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic">S&amp;E</text>
        </g>
      );
    case 2:
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="240" cy="177" r="97" fill="#fff5f5" stroke="#f6b3c7" strokeWidth="2" />
          <ellipse cx="237" cy="202" rx="48" ry="67" transform="rotate(-35 237 202)" stroke="#bd8a48" strokeWidth="11" />
          <path d="m240 89 38 42-38 43-38-43 38-42Z" fill="#e6f5ff" stroke="#fff" strokeWidth="4" />
          <path d="M202 131h76m-38-42v85" stroke="#9fc9df" strokeWidth="2" />
          <path d="M240 291s-34-22-34-46c0-19 23-25 34-8 11-17 34-11 34 8 0 24-34 46-34 46Z" fill="#f56e9d" stroke="#fff" strokeWidth="2" />
          <path d="m113 104 5 15 15 5-15 5-5 15-5-15-15-5 15-5 5-15Zm254 30 4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" fill="#edc974" stroke="none" />
        </g>
      );
    case 3:
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="117" y="169" width="246" height="150" rx="15" fill="#f7a4bf" stroke="#fff7ee" strokeWidth="5" />
          <rect x="93" y="137" width="294" height="45" rx="10" fill="#f6bfd1" stroke="#fff7ee" strokeWidth="5" />
          <rect x="221" y="139" width="34" height="180" fill="#ff8fae" stroke="#fff7ee" strokeWidth="3" />
          <path d="M238 139c-48-29-31-56-10-50 14 4 21 22 27 48 4-32 17-48 32-39 21 13 9 37-40 44Z" fill="#d54682" stroke="#fff7ee" strokeWidth="4" />
          <path d="m131 220 5 16 16 5-16 5-5 16-5-16-16-5 16-5 5-16Zm219 51 4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" fill="#fff2cc" stroke="none" />
        </g>
      );
    case 10:
      return null;
    default:
      return null;
  }
}

function InvitationCover({ experience }: { experience: Experience }) {
  const theme = ({ 1: "garden", 2: "proposal", 3: "birthday", 9: "silver", 10: "arabic", 11: "storybook" } as Record<number, string>)[experience.id] ?? "classic";

  return (
    <div className={`invitation-cover invitation-cover--${theme}`} aria-hidden="true">
      {experience.id === 10 ? (
        <span className="invitation-cover-photo" />
      ) : (
        <svg viewBox="0 0 480 360">
          <TemplateIllustration id={experience.id} />
        </svg>
      )}
    </div>
  );
}

export default function ExperienceCard({
  experience,
  index = 0,
}: {
  experience: Experience;
  index?: number;
}) {
  const isAvailable = experience.available !== false;

  return (
    <Reveal delay={(index % 4) * 0.07} className={`experience-card ${isAvailable ? "" : "is-coming-soon"}`}>
      {isAvailable ? (
        <a
          className="card-image card-image-link"
          href={experience.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${experience.title} demo in a new tab`}
        >
          <InvitationCover experience={experience} />
        </a>
      ) : (
        <div className="card-image">
          <ExperienceArtwork experience={experience} />
        </div>
      )}
      <p className="card-category">{experience.category}</p>
      <div className="card-title-row">
        <h3 className="card-title">{experience.title}</h3>
      </div>
      <p className="card-summary">{experience.summary}</p>
      <div className="card-footer">
        {isAvailable ? (
          <a
            className="demo-link"
            href={experience.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${experience.title} demo in a new tab`}
          >
            Open demo <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
          </a>
        ) : (
          <span className="demo-link demo-link-locked" aria-label={`${experience.title} coming soon`}>
            Will add soon
          </span>
        )}
        <div className="card-meta">
          <span>{experience.tag}</span>
        </div>
      </div>
    </Reveal>
  );
}