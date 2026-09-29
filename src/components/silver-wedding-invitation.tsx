"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Heart,
  MapPin,
  Music2,
  Sparkles,
  Utensils,
  Wine,
} from "lucide-react";
import styles from "./silver-wedding-invitation.module.css";

const wedding = {
  groom: "Mohamed",
  bride: "Farah",
  nickname: "The Troublemakers",
  date: new Date(2027, 2, 27, 17),
  dateText: "March 27, 2027",
  story:
    "Time flew by so fast, and these two cuties are about to get married! Yep, we still can't believe it ourselves!",
  invite:
    "We would love for you to be part of our special day! Pull up your comfiest shoes, we're throwing the party of our lives!",
  venue: "White Garden",
  address: "Open Air Wedding Venue · Cairo, Egypt",
  mapUrl: "https://maps.google.com/?q=White+Garden+Cairo",
  schedule: [
    { time: "5:00 PM", title: "Guests Arrival", icon: "glass" },
    { time: "6:00 PM", title: "The Ceremony", icon: "ring" },
    { time: "7:30 PM", title: "Dinner Time", icon: "dish" },
    { time: "9:00 PM", title: "Party Till We Drop", icon: "spark" },
  ],
};

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
const monthStart = new Date(wedding.date.getFullYear(), wedding.date.getMonth(), 1);
const daysInMonth = new Date(
  wedding.date.getFullYear(),
  wedding.date.getMonth() + 1,
  0,
).getDate();
const starField = Array.from({ length: 58 }, (_, index) => ({
  left: `${(index * 67 + 11) % 100}%`,
  top: `${(index * 43 + 7) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `-${(index * 7) % 40 / 10}s`,
}));
const envelopeStars = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 37 + 9) % 100}%`,
  top: `${(index * 59 + 13) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `-${(index * 3) % 35 / 10}s`,
}));

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
type Fireworks = { launch: (x: number) => void; burst: (x: number, y: number) => void };

function Stars({ cover = false }: { cover?: boolean }) {
  const stars = cover ? envelopeStars : starField;
  return (
    <div className={`${styles.stars} ${cover ? styles.coverStars : ""}`} aria-hidden="true">
      {stars.map((star, index) => (
        <i
          key={index}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

function ScheduleIcon({ icon }: { icon: string }) {
  if (icon === "glass") return <Wine aria-hidden="true" />;
  if (icon === "dish") return <Utensils aria-hidden="true" />;
  if (icon === "spark") return <Sparkles aria-hidden="true" />;
  return <Heart aria-hidden="true" />;
}

export default function SilverWeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Fireworks | null>(null);
  const openedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicStepRef = useRef(0);
  const fireworksTimerRef = useRef<number | null>(null);
  const fireworksStartRef = useRef<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, wedding.date.getTime() - Date.now());
      setCountdown({
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor(remaining / 3_600_000) % 24,
        minutes: Math.floor(remaining / 60_000) % 60,
        seconds: Math.floor(remaining / 1_000) % 60,
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number };
    type Rocket = { x: number; y: number; vy: number };
    const palette = [
      ["#ff4d6d", "#ffd166"], ["#4cc9f0", "#f8f9fa"], ["#f72585", "#c77dff"],
      ["#80ed99", "#ffffff"], ["#ffd60a", "#ff9e00"], ["#7b9cff", "#e0e7ff"],
      ["#ffffff", "#c9ced8"],
    ];
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let flashes: { x: number; y: number; life: number }[] = [];

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };
    const burst = (x: number, y: number) => {
      const colors = palette[Math.floor(Math.random() * palette.length)];
      flashes.push({ x, y, life: 1 });
      for (let index = 0; index < 120; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.35 + Math.random() * 0.65) * 5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.005 + Math.random() * 0.006,
          color: colors[index % colors.length],
          size: 1.3 + Math.random() * 1.2,
        });
      }
    };
    const launch = (x: number) => {
      const targetY = height * (0.14 + Math.random() * 0.2);
      rockets.push({ x, y: height + 10, vy: -Math.sqrt(0.32 * (height - targetY)) });
    };
    const handlePointer = (pointer: PointerEvent) => {
      if (openedRef.current && rockets.length < 2) launch(pointer.clientX);
    };
    const animate = () => {
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0,.16)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      rockets = rockets.filter((rocket) => {
        rocket.vy += 0.16;
        rocket.y += rocket.vy;
        context.globalAlpha = 1;
        context.fillStyle = "#ffe8b8";
        context.beginPath();
        context.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
        context.fill();
        particles.push({
          x: rocket.x + (Math.random() - 0.5) * 2,
          y: rocket.y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.8 + Math.random() * 0.6,
          life: 0.6,
          decay: 0.05,
          color: "#ffcf80",
          size: 1.2,
        });
        if (rocket.vy > -1) {
          burst(rocket.x, rocket.y);
          return false;
        }
        return true;
      });
      flashes = flashes.filter((flash) => {
        const glow = context.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, 140 * (2 - flash.life));
        glow.addColorStop(0, `rgba(255,255,255,${flash.life * 0.3})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        context.globalAlpha = 1;
        context.fillStyle = glow;
        context.fillRect(flash.x - 280, flash.y - 280, 560, 560);
        flash.life -= 0.06;
        return flash.life > 0;
      });
      particles = particles.filter((particle) => {
        particle.vx *= 0.972;
        particle.vy = particle.vy * 0.972 + 0.028;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        context.globalAlpha = Math.max(particle.life, 0);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        return particle.life > 0;
      });
      context.globalAlpha = 1;
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", handlePointer);
    fireworksRef.current = { launch, burst };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointer);
      fireworksRef.current = null;
    };
  }, []);

  useEffect(
    () => () => {
      if (musicTimerRef.current) clearInterval(musicTimerRef.current);
      if (fireworksTimerRef.current) clearInterval(fireworksTimerRef.current);
      if (fireworksStartRef.current) clearTimeout(fireworksStartRef.current);
      void audioRef.current?.close();
    },
    [],
  );

  const toggleMusic = async () => {
    if (musicOn) {
      if (musicTimerRef.current) clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
      setMusicOn(false);
      return;
    }
    const browserWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextConstructor = window.AudioContext ?? browserWindow.webkitAudioContext;
    if (!AudioContextConstructor) return;
    const audio = audioRef.current ?? new AudioContextConstructor();
    audioRef.current = audio;
    await audio.resume();
    const chords = [[0, 4, 7, 11, 14], [-3, 0, 4, 7, 11], [-7, -3, 0, 4, 7], [-5, -1, 2, 4, 9]];
    const pattern = [0, 1, 2, 3, 4, 3, 2, 1];
    const playNote = (frequency: number, start: number, duration: number, gain: number) => {
      [[1, gain, "sine"], [2, gain * 0.28, "triangle"]].forEach(([multiple, volume, type]) => {
        const oscillator = audio.createOscillator();
        const envelope = audio.createGain();
        oscillator.type = type as OscillatorType;
        oscillator.frequency.value = frequency * Number(multiple);
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(Number(volume), start + 0.02);
        envelope.gain.exponentialRampToValueAtTime(0.0008, start + duration);
        oscillator.connect(envelope).connect(audio.destination);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.1);
      });
    };
    const play = () => {
      const beat = musicStepRef.current % 32;
      const chord = chords[Math.floor(beat / 8)];
      const position = beat % 8;
      const start = audio.currentTime + 0.05;
      const frequency = (note: number) => 261.63 * 2 ** (note / 12);
      playNote(frequency(chord[pattern[position]]), start, 2.2, 0.11);
      if (position === 0) {
        playNote(frequency(chord[0] - 12), start, 3.8, 0.16);
        playNote(frequency(chord[4] + 12), start + 0.02, 3, 0.05);
      }
      if (position === 4) playNote(frequency(chord[3] + 12), start, 2.4, 0.05);
      musicStepRef.current += 1;
    };
    play();
    musicTimerRef.current = setInterval(play, 480);
    setMusicOn(true);
  };

  const openInvitation = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpened(true);
    void toggleMusic();
    fireworksStartRef.current = window.setTimeout(() => {
      fireworksRef.current?.launch(window.innerWidth * 0.5);
      fireworksTimerRef.current = window.setInterval(() => {
        if (Math.random() > 0.3) {
          fireworksRef.current?.launch(window.innerWidth * (0.2 + Math.random() * 0.6));
        }
      }, 4_500);
    }, 2_800);
  };

  const submitMessage = (formData: FormData) => {
    if (!formData.get("name") || !formData.get("message")) return;
    setSent(true);
    fireworksRef.current?.burst(window.innerWidth / 2, window.innerHeight / 2);
  };

  const dateLabel = wedding.date.toLocaleString("en", { month: "long", year: "numeric" });
  const countdownValues = [
    [countdown.days, "days"],
    [countdown.hours, "hours"],
    [countdown.minutes, "minutes"],
    [countdown.seconds, "seconds"],
  ] as const;

  return (
    <main className={`${styles.invitation} dearly-silver-invitation-page`}>
      <canvas ref={canvasRef} className={styles.fireworks} aria-hidden="true" />
      <Stars />

      {opened && (
        <button
          className={`${styles.musicButton} ${musicOn ? "" : styles.musicOff}`}
          type="button"
          onClick={() => void toggleMusic()}
          aria-label={musicOn ? "Turn music off" : "Turn music on"}
          title={musicOn ? "Turn music off" : "Turn music on"}
        >
          <Music2 aria-hidden="true" />
        </button>
      )}

      <div className={`${styles.envelopeScreen} ${opened ? styles.envelopeGone : ""}`}>
        <Stars cover />
        <p className={styles.tag}>Tap to open</p>
        <button
          className={`${styles.envelope} ${opened ? styles.envelopeOpen : ""} ${opened ? styles.envelopeZoom : ""}`}
          type="button"
          onClick={openInvitation}
          aria-label="Open your silver wedding invitation"
        >
          <svg className={styles.envelopeBack} viewBox="0 0 340 226" aria-hidden="true">
            <defs>
              <pattern id="silver-envelope-pattern" width="14" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="14" fill="#b9bfca" />
                <path d="M7 0 14 7 7 14 0 7Z" fill="none" stroke="#7d8593" strokeWidth=".8" />
              </pattern>
              <linearGradient id="silver-envelope-face" x2="0" y2="1">
                <stop offset="0" stopColor="#2e323c" />
                <stop offset="1" stopColor="#0d0e11" />
              </linearGradient>
              <linearGradient id="silver-envelope-edge" x2="1" y2="1">
                <stop offset="0" stopColor="#8d94a1" />
                <stop offset=".5" stopColor="#fff" />
                <stop offset="1" stopColor="#8d94a1" />
              </linearGradient>
            </defs>
            <rect width="340" height="226" fill="url(#silver-envelope-pattern)" />
          </svg>
          <span className={styles.letter}>
            <b>You&apos;re Invited</b>
            <small>{wedding.groom} &amp; {wedding.bride}</small>
          </span>
          <svg className={styles.envelopeFront} viewBox="0 0 340 226" aria-hidden="true">
            <polygon points="0,0 170,131 340,0 340,226 0,226" fill="url(#silver-envelope-face)" stroke="url(#silver-envelope-edge)" strokeWidth="2" />
            <path d="M0 226 150 118M340 226 190 118" stroke="#c9ced8" strokeOpacity=".3" />
            <polygon points="12,214 12,22 170,124 328,22 328,214" fill="none" stroke="#c9ced8" strokeOpacity=".25" strokeDasharray="3 4" />
          </svg>
          <span className={styles.flap}>
            <svg viewBox="0 0 340 131" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="0,0 340,0 170,131" fill="url(#silver-envelope-face)" stroke="url(#silver-envelope-edge)" strokeWidth="2" />
              <polygon points="26,10 314,10 170,110" fill="none" stroke="#c9ced8" strokeOpacity=".35" strokeDasharray="3 4" />
            </svg>
            <svg className={styles.flapBack} viewBox="0 0 340 131" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="0,0 340,0 170,131" fill="url(#silver-envelope-pattern)" stroke="#e5e8ee" strokeWidth="2" />
            </svg>
          </span>
          <span className={styles.seal}>{wedding.groom[0]}&amp;{wedding.bride[0]}</span>
        </button>
      </div>

      <section className={`${styles.reveal} ${styles.intro}`}>
        <p className={styles.tag}><Sparkles aria-hidden="true" /> You&apos;re invited <Sparkles aria-hidden="true" /></p>
        <svg className={styles.rings} viewBox="0 0 200 110" role="img" aria-label="Two wedding rings with a diamond">
          <defs><linearGradient id="silver-ring-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8d94a1" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#8d94a1" /></linearGradient></defs>
          <circle cx="80" cy="64" r="34" />
          <circle cx="120" cy="64" r="34" />
          <polygon points="80,8 89,19 80,30 71,19" />
        </svg>
        <h1 className={styles.names}>{wedding.groom} &amp; {wedding.bride}</h1>
        <p className={styles.nickname}>{wedding.nickname}<Heart fill="currentColor" aria-hidden="true" /></p>
        <p className={styles.tag}>{wedding.dateText}</p>
        <div className={styles.ornament} aria-hidden="true"><i /></div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.card}><h2>Guess what?</h2><p>{wedding.story}</p></div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.ornament} aria-hidden="true"><i /></div>
        <p className={styles.quote}>{wedding.invite}</p>
        <div className={styles.ornament} aria-hidden="true"><i /></div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.card}>
          <h2>Save the date</h2>
          <p className={styles.tag}>{dateLabel}</p>
          <div className={styles.calendar} aria-label={`${dateLabel} calendar`}>
            {weekdays.map((day, index) => <b key={`${day}-${index}`}>{day}</b>)}
            {Array.from({ length: monthStart.getDay() }, (_, index) => <i key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              return <i className={day === wedding.date.getDate() ? styles.calendarDay : ""} key={day}>{day}</i>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.card}>
          <h2>Where?</h2>
          <MapPin className={styles.pin} fill="currentColor" aria-hidden="true" />
          <h3>{wedding.venue}</h3>
          <p className={styles.muted}>{wedding.address}</p>
          <a className={styles.button} href={wedding.mapUrl} target="_blank" rel="noopener noreferrer">
            Open location <ExternalLink aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.card}>
          <h2>When?</h2>
          <ul className={styles.schedule}>
            {wedding.schedule.map((item) => (
              <li key={item.time}>
                <span className={styles.scheduleIcon}><ScheduleIcon icon={item.icon} /></span>
                <span><b>{item.time}</b>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.reveal}>
        <h2>Time left until we meet!</h2>
        <div className={styles.countdown} aria-live="off">
          {countdownValues.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={styles.card}>
          <h2>Leave us a message</h2>
          {sent ? (
            <p className={styles.thankYou}>Thank you, we love you!</p>
          ) : (
            <form action={submitMessage} className={styles.messageForm}>
              <input name="name" placeholder="Your name" aria-label="Your name" required />
              <textarea name="message" rows={3} placeholder="Write your message..." aria-label="Write your message" required />
              <button className={styles.button} type="submit">Send with love <Heart aria-hidden="true" /></button>
            </form>
          )}
        </div>
      </section>

      <footer className={`${styles.reveal} ${styles.invitationFooter}`}>
        <h2>We can&apos;t wait to celebrate with you!</h2>
        <p className={styles.names}>{wedding.groom} &amp; {wedding.bride}</p>
      </footer>
    </main>
  );
}