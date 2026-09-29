"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Heart,
  MapPin,
  Music2,
  Pause,
  Play,
  Send,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import WeddingPortrait from "@/components/wedding-portrait";
import styles from "./mahmoud-wedding-invitation.module.css";

const wedding = {
  bride: "Shrouk",
  groom: "Mahmoud",
  initials: "M&S",
  date: new Date("2026-10-06T18:00:00+02:00"),
  dateText: "6 October 2026",
  weekday: "Tuesday",
  time: "6:00 PM",
  venue: "Life Eye Resort",
  venueArea: "Sea Garden",
  venueAddress: "Sea Garden Ceremony & Reception",
  mapUrl: "https://maps.google.com/?q=Life+Eye+Resort+Sea+Garden",
  photoUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrxFC8JFv_oCGQaC4_GWL4QjWt9a2caK6u0VwVSyqYvlPtN3cgaqaLRhjU9-VkP3UJgnsaYpB9s30J95G8GPGt-xpno2Zxph3iORiki4DOJdtjCx_jBhLtb7UnawYhjjOiB09wont1gehn72MD_yw3X9zLQhm7eKtb_Ft_6QSlcZdlCTViicZwgTjlxSpBBojMinGTQbdjvzfYNs_24apWOfEG47SGNgZeqjMxdYpnCG5N9XqGdQLucdQrbgxavcdgmQ",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const targetTime = wedding.date.getTime();

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
type RSVPStatus = "idle" | "submitting" | "success" | "error";

function VenueArtwork() {
  return (
    <svg
      className={styles.venueArtwork}
      viewBox="0 0 640 480"
      role="img"
      aria-label="Sea Garden ceremony venue beside the water"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sea-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6d1cd" />
          <stop offset="1" stopColor="#eee6d7" />
        </linearGradient>
        <linearGradient id="sea-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8da7a0" />
          <stop offset="1" stopColor="#526d68" />
        </linearGradient>
        <linearGradient id="sea-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eee2cb" />
          <stop offset="1" stopColor="#d2bd9d" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#sea-sky)" />
      <circle cx="470" cy="108" r="54" fill="#f6e6bd" opacity=".7" />
      <path d="M0 237Q88 222 172 239t170 0 170 0 128-3v133H0Z" fill="url(#sea-water)" />
      <path d="M0 265q80-10 160 0t160 0 160 0 160 0M0 292q80-9 160 0t160 0 160 0 160 0" fill="none" stroke="#dce2d7" strokeOpacity=".46" strokeWidth="3" />
      <path d="M0 340q155-23 320 0t320 0v140H0Z" fill="url(#sea-sand)" />
      <path d="M120 350V182a200 200 0 0 1 400 0v168" fill="none" stroke="#f9f4e9" strokeWidth="19" />
      <path d="M150 350V184a170 170 0 0 1 340 0v166" fill="none" stroke="#bf9d62" strokeOpacity=".82" strokeWidth="2" />
      <path d="M187 350V188a133 133 0 0 1 266 0v162" fill="#f7f0e3" fillOpacity=".4" stroke="#fff9ee" strokeWidth="8" />
      <path d="M0 365q118-24 240 0t240 0 160 0" fill="none" stroke="#fff9ee" strokeOpacity=".65" strokeWidth="5" />
      {[93, 549].map((x) => (
        <g key={x} fill="none" stroke="#647c5a" strokeWidth="5" strokeLinecap="round">
          <path d={`M${x} 355q-6-58-26-100m26 100q2-67 33-111m-33 111q18-46 55-71`} />
          <path d={`M${x - 28} 285q18 1 23 16m11-37q17 1 19 18m-3 21q16-10 30-4m-68 33q-15-11-28-8`} stroke="#879474" strokeWidth="8" />
        </g>
      ))}
      {[245, 395].map((x) => (
        <g key={x}>
          <path d={`M${x} 354v-48`} stroke="#8c754e" strokeWidth="3" />
          <path d={`M${x - 17} 306h34l-17-28Z`} fill="#fdfbf7" stroke="#c5a059" strokeWidth="1.5" />
          <circle cx={x} cy="301" r="3" fill="#c5a059" />
        </g>
      ))}
    </svg>
  );
}

function Ornament() {
  return <span className={styles.ornament} aria-hidden="true"><i /><Heart /><i /></span>;
}

function formatTime(value: number) {
  return String(value).padStart(2, "0");
}

export default function MahmoudWeddingInvitation() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>("idle");
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<number | null>(null);
  const musicStepRef = useRef(0);
  const revealTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      setCountdown({
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor(remaining / 3_600_000) % 24,
        minutes: Math.floor(remaining / 60_000) % 60,
        seconds: Math.floor(remaining / 1_000) % 60,
      });
    };
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!contentVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [contentVisible]);

  useEffect(() => {
    if (!contentVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    type Particle = { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; phase: number };
    let width = 0;
    let height = 0;
    let frame = 0;
    const particles: Particle[] = [];
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };
    for (let index = 0; index < (window.innerWidth < 768 ? 18 : 30); index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 0.8 + Math.random() * 1.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: 0.15 + Math.random() * 0.35,
        opacity: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.phase += 0.018;
        if (particle.y > height + 8) {
          particle.y = -8;
          particle.x = Math.random() * width;
        }
        context.save();
        context.globalAlpha = particle.opacity * (0.65 + Math.sin(particle.phase) * 0.35);
        context.fillStyle = "#c5a059";
        context.shadowBlur = 7;
        context.shadowColor = "#d4af37";
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [contentVisible]);

  useEffect(() => () => {
    if (musicIntervalRef.current !== null) window.clearInterval(musicIntervalRef.current);
    if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current);
    void audioRef.current?.close();
  }, []);

  const toggleMusic = async () => {
    if (musicOn) {
      if (musicIntervalRef.current !== null) window.clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
      setMusicOn(false);
      return;
    }
    const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioConstructor = window.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioConstructor) return;
    const audio = audioRef.current ?? new AudioConstructor();
    audioRef.current = audio;
    await audio.resume();
    const chordProgression = [
      [261.63, 329.63, 392, 493.88],
      [220, 261.63, 329.63, 392],
      [174.61, 220, 261.63, 329.63],
      [196, 246.94, 293.66, 392],
    ];
    const playChord = () => {
      const chord = chordProgression[musicStepRef.current % chordProgression.length];
      chord.forEach((frequency, index) => {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        const start = audio.currentTime + index * 0.12;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.014 / (index + 1), start + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.4);
        oscillator.connect(gain).connect(audio.destination);
        oscillator.start(start);
        oscillator.stop(start + 3.5);
      });
      musicStepRef.current += 1;
    };
    playChord();
    musicIntervalRef.current = window.setInterval(playChord, 3_200);
    setMusicOn(true);
  };

  const playChime = () => {
    const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioConstructor = window.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioConstructor) return;
    const audio = audioRef.current ?? new AudioConstructor();
    audioRef.current = audio;
    void audio.resume();
    const now = audio.currentTime;
    [523.25, 659.25, 783.99, 1_046.5].forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = now + index * 0.12;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.045, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.25);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + 1.3);
    });
  };

  const openInvitation = () => {
    if (envelopeOpened) return;
    setEnvelopeOpened(true);
    playChime();
    void toggleMusic();
    revealTimeoutRef.current = window.setTimeout(() => {
      setContentVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1_250);
  };

  const submitRSVP = async (formData: FormData) => {
    const name = String(formData.get("guestName") ?? "").trim();
    const message = String(formData.get("guestMessage") ?? "").trim();
    const attending = String(formData.get("attending") ?? "yes");
    if (!name || !message || !["yes", "no"].includes(attending)) return;
    if (!supabase) {
      setRsvpStatus("error");
      return;
    }
    setRsvpStatus("submitting");
    const { error } = await supabase.from("guest_messages").insert([{ name, message, attending }]);
    setRsvpStatus(error ? "error" : "success");
  };

  const countdownEntries = [
    [countdown.days, "Days"],
    [countdown.hours, "Hours"],
    [countdown.minutes, "Mins"],
    [countdown.seconds, "Secs"],
  ] as const;

  return (
    <main className={`${styles.invitation} dearly-mahmoud-invitation-page`}>
      <canvas ref={canvasRef} className={styles.ambientCanvas} aria-hidden="true" />

      {contentVisible && (
        <button
          className={`${styles.musicToggle} ${musicOn ? styles.musicActive : ""}`}
          type="button"
          onClick={() => void toggleMusic()}
          aria-label={musicOn ? "Pause ambient audio" : "Play ambient audio"}
          aria-pressed={musicOn}
          title={musicOn ? "Pause ambient audio" : "Play ambient audio"}
        >
          {musicOn ? <Pause aria-hidden="true" /> : <Music2 aria-hidden="true" />}
        </button>
      )}

      {contentVisible && <div className={styles.pageBackground} aria-hidden="true" />}
      <article className={`${styles.paper} ${contentVisible ? styles.paperVisible : ""}`}>
        <span className={`${styles.cornerMark} ${styles.topLeft}`} aria-hidden="true">✧</span>
        <span className={`${styles.cornerMark} ${styles.topRight}`} aria-hidden="true">✧</span>
        <span className={`${styles.cornerMark} ${styles.bottomLeft}`} aria-hidden="true">✧</span>
        <span className={`${styles.cornerMark} ${styles.bottomRight}`} aria-hidden="true">✧</span>
        <div className={styles.paperBorder} aria-hidden="true" />

        <header className={`${styles.hero} ${styles.reveal}`}>
          <div className={styles.monogram}>{wedding.initials}</div>
          <div
            className={styles.couplePortrait}
          >
            {!portraitFailed ? (
              <Image
                className={styles.portraitPhoto}
                src={wedding.photoUrl}
                alt={`${wedding.groom} and ${wedding.bride}`}
                fill
                priority
                unoptimized
                onError={() => setPortraitFailed(true)}
              />
            ) : <WeddingPortrait />}
            <span className={styles.portraitShade} aria-hidden="true" />
            <span className={styles.portraitInset} aria-hidden="true" />
            <div className={styles.portraitText}>
              <p>The Wedding Of</p>
              <h1>{wedding.groom}</h1>
              <span className={styles.ampersand}>&amp;</span>
              <h1>{wedding.bride}</h1>
              <div className={styles.forever}>
                <p>“Forever together”</p>
                <i />
                <time dateTime="2026-10-06">06 / 10 / 2026</time>
              </div>
            </div>
          </div>
          <Ornament />
        </header>

        <section className={`${styles.quranSection} ${styles.reveal}`} aria-labelledby="quran-heading">
          <div className={styles.audioPrompt}>
            <p>Kindly pause the music before reading the Quran verse</p>
            <button className={styles.pauseAudio} type="button" onClick={() => void toggleMusic()}>
              {musicOn ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              <span>{musicOn ? "Pause audio" : "Play audio"}</span>
            </button>
          </div>
          <p className={styles.quranEyebrow} id="quran-heading">In the name of the most merciful</p>
          <p className={styles.quranVerse} lang="ar" dir="rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className={styles.verseCitation} lang="ar" dir="rtl">— سورة الروم، الآية ٢١ —</p>
        </section>

        <section className={`${styles.gratitudeSection} ${styles.reveal}`}>
          <p className={styles.sectionEyebrow}>A note of gratitude</p>
          <div className={styles.copyPanel}>
            <h2>Dear family and friends...</h2>
            <p>As we get ready to say “I do,” we feel grateful for the wonderful people in our lives.</p>
            <p>Your support means the world to us, and we would be honored to have you with us as we begin our new life together.</p>
          </div>
        </section>

        <section className={`${styles.countdownSection} ${styles.reveal}`} aria-labelledby="countdown-heading">
          <h2 id="countdown-heading">Countdown</h2>
          <div className={styles.countdown}>
            {countdownEntries.map(([value, label]) => (
              <div className={styles.countdownCell} key={label}>
                <span>{formatTime(value)}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          {targetTime <= Date.now() && <p className={styles.todayMessage}>The celebration is today!</p>}
        </section>

        <section className={`${styles.welcomeSection} ${styles.reveal}`}>
          <h2>Welcome!</h2>
          <div className={styles.copyPanel}>
            <p>“From the very first moment, we knew our story was meant to be celebrated. We would be honoured to have you with us as we begin this new chapter, surrounded by the people we love most.”</p>
          </div>
        </section>

        <section className={`${styles.eventSection} ${styles.reveal}`} aria-labelledby="event-heading">
          <h2 id="event-heading">When &amp; Where</h2>
          <div className={styles.copyPanel}>
            <div className={styles.eventDate}>
                <span className={styles.eventLabel}><CalendarDays aria-hidden="true" /> Date &amp; Time</span>
              <p>{wedding.dateText}</p>
              <small className={styles.timeMeta}><Clock3 aria-hidden="true" /> {wedding.weekday} · {wedding.time}</small>
            </div>
            <div className={styles.eventRule} />
            <div className={styles.venueSection}>
              <span className={styles.eventLabel}><MapPin aria-hidden="true" /> Venue</span>
              <div className={styles.venueFrame}><VenueArtwork /><p>Sea Garden Ceremony &amp; Reception</p></div>
              <h3>{wedding.venue}</h3>
              <p className={styles.venueArea}>{wedding.venueArea}</p>
              <a className={styles.goldButton} href={wedding.mapUrl} target="_blank" rel="noopener noreferrer">
                View location <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className={`${styles.giftsSection} ${styles.reveal}`}>
          <h2>Gifts</h2>
          <div className={styles.copyPanel}>
            <p>Your presence is the greatest gift we could receive.</p>
          </div>
        </section>

        <section className={`${styles.guestbookSection} ${styles.reveal}`} aria-labelledby="guestbook-heading">
          <h2 id="guestbook-heading">Leave a message</h2>
          <p className={styles.sectionEyebrow}>Share your love, wishes, or a note for the happy couple</p>
          <form className={styles.guestbookForm} action={submitRSVP}>
            <label>
              <span>Your name <b>*</b></span>
              <input name="guestName" type="text" autoComplete="name" placeholder="Enter your name" required disabled={rsvpStatus === "submitting" || rsvpStatus === "success"} />
            </label>
            <label>
              <span>Write your congratulation <b>*</b></span>
              <textarea name="guestMessage" rows={3} placeholder="Your message" required disabled={rsvpStatus === "submitting" || rsvpStatus === "success"} />
            </label>
            <fieldset disabled={rsvpStatus === "submitting" || rsvpStatus === "success"}>
              <legend>Will you be attending? <b>*</b></legend>
              <label className={styles.radioOption}>
                <input defaultChecked name="attending" type="radio" value="yes" />
                <span>Joyfully accepts / Yes, I will attend</span>
              </label>
              <label className={styles.radioOption}>
                <input name="attending" type="radio" value="no" />
                <span>Regretfully declines / Sorry, I cannot make it</span>
              </label>
            </fieldset>
            <button className={styles.submitButton} type="submit" disabled={rsvpStatus === "submitting" || rsvpStatus === "success"}>
              {rsvpStatus === "submitting" ? <><span className={styles.spinner} /> Sending...</> : <>Send wishes &amp; RSVP <Send aria-hidden="true" /></>}
            </button>
            {rsvpStatus === "success" && (
              <p className={styles.formSuccess} role="status"><Check aria-hidden="true" /> Thank you so much! Your wishes and RSVP have been warmly received.</p>
            )}
            {rsvpStatus === "error" && (
              <p className={styles.formError} role="alert">We couldn&apos;t send your RSVP. Please try again in a moment.</p>
            )}
          </form>
        </section>

        <footer className={`${styles.footer} ${styles.reveal}`}>
          <Ornament />
          <p>With love,</p>
          <strong>{wedding.groom} &amp; {wedding.bride}</strong>
          <time dateTime="2026-10-06">{wedding.dateText}</time>
        </footer>
      </article>

      {!contentVisible && (
        <section className={`${styles.envelopeOverlay} ${envelopeOpened ? styles.overlayClosing : ""}`} aria-label="Wedding invitation envelope">
          <div className={styles.overlayInner}>
            <div className={styles.overlayHeading}>
              <p>A joyful invitation for you</p>
              <span>{wedding.groom} &amp; {wedding.bride}</span>
            </div>
            <button
              className={`${styles.envelopeWrapper} ${envelopeOpened ? styles.opened : ""}`}
              type="button"
              onClick={openInvitation}
              aria-label="Open wedding invitation"
            >
              <span className={styles.envelopeShadow} />
              <span className={styles.envelopeBody} />
              <span className={styles.envelopeCard}>
                <span>Wedding Invitation</span>
                <strong>{wedding.groom} &amp; {wedding.bride}</strong>
                <em>06 / 10 / 2026</em>
                <i />
                <small>{wedding.venue} — {wedding.venueArea}</small>
                <span className={styles.envelopeCardFooter}><b>Forever together</b><b>06 / 10 / 2026</b></span>
              </span>
              <span className={styles.envelopeFront} aria-hidden="true" />
              <span className={styles.envelopeFlap} aria-hidden="true" />
              <span className={styles.waxSeal} aria-hidden="true"><b>M&amp;S</b><small>2026</small></span>
            </button>
            <button className={styles.openButton} type="button" onClick={openInvitation}>
              Open invitation <ArrowUpRight aria-hidden="true" />
            </button>
            <p className={styles.overlayHint}>Tap the envelope or button to begin</p>
          </div>
        </section>
      )}
    </main>
  );
}