"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Heart,
  MapPin,
  Music2,
  Send,
  Sparkles,
  Utensils,
  Wine,
} from "lucide-react";
import styles from "./wedding-invitation.module.css";

const event = {
  groom: "Mohamed",
  bride: "Farah",
  nickname: "The Troublemakers",
  date: new Date(2027, 2, 27, 17),
  dateText: "March 27, 2027",
  story:
    "Time flew by so fast, and these two cuties are about to get married! Yep, we still can't believe it ourselves!",
  favorites: ["Pizza", "Movies", "Coffee", "Traveling", "Music"],
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
const monthStart = new Date(event.date.getFullYear(), event.date.getMonth(), 1);
const daysInMonth = new Date(
  event.date.getFullYear(),
  event.date.getMonth() + 1,
  0,
).getDate();

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
type Fireworks = {
  launch: (x: number) => void;
  burst: (x: number, y: number) => void;
};

function Person({
  size,
  color,
  groom = false,
  veil = false,
  bow = false,
  pants,
}: {
  size: number;
  color: string;
  groom?: boolean;
  veil?: boolean;
  bow?: boolean;
  pants?: string;
}) {
  const hair = groom ? "#7a4a2a" : "#4a2f1c";
  return (
    <svg
      className={styles.person}
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      aria-hidden="true"
    >
      {groom && <circle cx="30" cy="26" r="17" fill={hair} />}
      {veil && (
        <path d="M14 26Q30 4 46 26L54 90H6Z" fill="#c9b8ff" opacity=".6" />
      )}
      {groom ? (
        <path d="M30 46 10 92h40Z" fill={color} />
      ) : (
        <>
          <rect x="17" y="46" width="26" height="30" rx="6" fill={color} />
          <rect x="19" y="76" width="9" height="18" fill={pants ?? "#3b82f6"} />
          <rect x="32" y="76" width="9" height="18" fill={pants ?? "#3b82f6"} />
        </>
      )}
      {bow && (
        <path d="m30 49-7-4v8zm0 0 7-4v8z" fill="#ff5f8f" />
      )}
      {!groom && (
        <path d="M15 27Q16 8 30 9Q44 8 45 27Q30 17 15 27Z" fill={hair} />
      )}
      {groom && <path d="M16 28Q30 11 44 28Q30 20 16 28Z" fill={hair} />}
      {groom && !veil && <circle cx="15" cy="19" r="5" fill="#ff5f8f" />}
      {veil && (
        <>
          <circle cx="42" cy="58" r="5" fill="#ff5f8f" />
          <circle cx="38" cy="62" r="4" fill="#ffb020" />
        </>
      )}
      <circle cx="30" cy="30" r="14" fill="#ffcfa8" />
      <circle cx="25" cy="31" r="1.8" fill="#333" />
      <circle cx="35" cy="31" r="1.8" fill="#333" />
      <path
        d="M25 37q5 5 10 0"
        fill="none"
        stroke="#d6455d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="21" cy="36" r="2.5" fill="#ff9db5" opacity=".8" />
      <circle cx="39" cy="36" r="2.5" fill="#ff9db5" opacity=".8" />
    </svg>
  );
}

function JourneyStage({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className={styles.stage}>
      <div className={styles.pair}>{children}</div>
      <small>{label}</small>
    </div>
  );
}

function ScheduleIcon({ icon }: { icon: string }) {
  if (icon === "glass") return <Wine aria-hidden="true" />;
  if (icon === "dish") return <Utensils aria-hidden="true" />;
  if (icon === "spark") return <Sparkles aria-hidden="true" />;
  return <Heart aria-hidden="true" />;
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const fireworksCanvas = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Fireworks | null>(null);
  const openedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicStepRef = useRef(0);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, event.date.getTime() - Date.now());
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
    document.querySelectorAll(`.${styles.reveal}`).forEach((element) => {
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = fireworksCanvas.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
    type Rocket = { x: number; y: number; targetY: number; speed: number };
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };
    const burst = (x: number, y: number) => {
      const hue = Math.random() * 360;
      for (let index = 0; index < 70; index += 1) {
        const angle = (Math.PI * 2 * index) / 70;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: `hsl(${hue + Math.random() * 50}, 95%, 55%)`,
        });
      }
    };
    const launch = (x: number) => {
      rockets.push({ x, y: height, targetY: height * (0.12 + Math.random() * 0.35), speed: 9 });
    };
    const handlePointerDown = (pointer: PointerEvent) => {
      if (openedRef.current) burst(pointer.clientX, pointer.clientY);
    };
    const animate = () => {
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0,.2)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      rockets = rockets.filter((rocket) => {
        rocket.y -= rocket.speed;
        context.fillStyle = "#ff9d2e";
        context.fillRect(rocket.x, rocket.y, 3, 10);
        if (rocket.y <= rocket.targetY) {
          burst(rocket.x, rocket.y);
          return false;
        }
        return true;
      });
      particles = particles.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.04;
        particle.vx *= 0.985;
        particle.life -= 0.011;
        context.globalAlpha = Math.max(particle.life, 0);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, 2.6, 0, Math.PI * 2);
        context.fill();
        return particle.life > 0;
      });
      context.globalAlpha = 1;
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", handlePointerDown);
    fireworksRef.current = { launch, burst };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
      fireworksRef.current = null;
    };
  }, []);

  useEffect(
    () => () => {
      if (musicTimerRef.current) clearInterval(musicTimerRef.current);
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
    const browserWindow = window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    };
    const AudioContextConstructor = window.AudioContext ?? browserWindow.webkitAudioContext;
    if (!AudioContextConstructor) return;
    const audio = audioRef.current ?? new AudioContextConstructor();
    audioRef.current = audio;
    await audio.resume();
    const chords = [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]];
    const melody = [12, 14, 16, 19, 16, 14, 12, 9, 14, 16, 19, 21, 19, 16, 14, 11, 16, 19, 21, 19, 16, 14, 16, 12, 12, 16, 19, 16, 14, 12, 9, 12];
    const playNote = (frequency: number, start: number, duration: number, type: OscillatorType, gain: number) => {
      const oscillator = audio.createOscillator();
      const volume = audio.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(gain, start);
      volume.gain.exponentialRampToValueAtTime(0.001, start + duration);
      oscillator.connect(volume).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + duration);
    };
    const play = () => {
      const beat = musicStepRef.current % 32;
      const chord = chords[Math.floor(beat / 8)];
      const start = audio.currentTime + 0.05;
      const frequency = (note: number) => 261.63 * 2 ** (note / 12);
      playNote(frequency(melody[beat] - 12), start, 0.35, "triangle", 0.09);
      if (beat % 2 === 0) {
        playNote(frequency(chord[(beat / 2) % 3] - 12), start, 0.4, "sine", 0.05);
      }
      if (beat % 8 === 0) playNote(frequency(chord[0] - 24), start, 0.9, "sine", 0.12);
      musicStepRef.current += 1;
    };
    play();
    musicTimerRef.current = setInterval(play, 250);
    setMusicOn(true);
  };

  const openInvitation = () => {
    if (openedRef.current) return;
    setOpened(true);
    openedRef.current = true;
    void toggleMusic();
    window.setTimeout(() => {
      [0.2, 0.5, 0.8].forEach((position, index) => {
        window.setTimeout(
          () => fireworksRef.current?.launch(window.innerWidth * position),
          index * 300,
        );
      });
    }, 1_100);
  };

  const submitMessage = (formData: FormData) => {
    if (!formData.get("name") || !formData.get("message")) return;
    setSent(true);
    fireworksRef.current?.burst(window.innerWidth / 2, window.innerHeight / 2);
  };

  const dateLabel = event.date.toLocaleString("en", { month: "long", year: "numeric" });
  const countdownValues = [
    [countdown.days, "days"],
    [countdown.hours, "hours"],
    [countdown.minutes, "minutes"],
    [countdown.seconds, "seconds"],
  ] as const;

  return (
    <main className={`${styles.inviteRoot} dearly-invitation-page`}>
      <canvas ref={fireworksCanvas} className={styles.fireworks} aria-hidden="true" />
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 47) % 100}%`,
              width: `${8 + ((index * 7) % 10)}px`,
              height: `${index % 3 ? 10 + ((index * 5) % 8) : 6}px`,
              backgroundColor: ["#ff5f8f", "#ffb020", "#14b8d4", "#8b5cf6", "#3ccf7a"][index % 5],
              animationDuration: `${8 + ((index * 3) % 10)}s`,
              animationDelay: `-${(index * 2) % 14}s`,
            }}
          />
        ))}
      </div>

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
        <p className={styles.tag}>Tap the envelope</p>
        <button
          className={`${styles.envelope} ${opened ? styles.envelopeOpen : ""}`}
          type="button"
          onClick={openInvitation}
          aria-label="Open your wedding invitation"
        >
          <span className={styles.envelopeBack} />
          <span className={styles.letter}>You&apos;re invited!</span>
          <span className={styles.envelopeFront} />
          <span className={styles.flap} />
          <Heart className={styles.seal} fill="currentColor" aria-hidden="true" />
        </button>
      </div>

      <section className={`${styles.reveal} ${styles.intro}`}>
        <p className={styles.tag}><Sparkles aria-hidden="true" /> You&apos;re invited <Sparkles aria-hidden="true" /></p>
        <h1 className={styles.names}>{event.groom} &amp; {event.bride}</h1>
        <p className={styles.nickname}>{event.nickname}<Heart fill="currentColor" aria-hidden="true" /></p>
        <p className={styles.tag}>{event.dateText}</p>
        <div className={styles.journey}>
          <JourneyStage label="Once upon a time">
            <Person size={70} color="#14b8d4" pants="#8b5cf6" />
            <Person size={66} groom color="#ff5f8f" />
          </JourneyStage>
          <JourneyStage label="Growing up">
            <Person size={100} color="#3ccf7a" />
            <Person size={94} groom color="#ffb020" />
          </JourneyStage>
          <JourneyStage label="Forever">
            <Person size={100} color="#3d2c5c" pants="#3d2c5c" bow />
            <Person size={94} groom color="#fff" veil />
          </JourneyStage>
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={`${styles.card} ${styles.cardPink}`}>
          <h2>Guess what?</h2>
          <p>{event.story}</p>
        </div>
      </section>

      <section className={styles.reveal}>
        <h2>A few favorites</h2>
        <div className={styles.chips}>
          {event.favorites.map((favorite) => <span key={favorite}>{favorite}</span>)}
        </div>
        <p>{event.invite}</p>
      </section>

      <section className={styles.reveal}>
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <h2>Save the date</h2>
          <p className={styles.tag}>{dateLabel}</p>
          <div className={styles.calendar} aria-label={`${dateLabel} calendar`}>
            {weekdays.map((day, index) => <b key={`${day}-${index}`}>{day}</b>)}
            {Array.from({ length: monthStart.getDay() }, (_, index) => <i key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              return <i className={day === event.date.getDate() ? styles.calendarDay : ""} key={day}>{day}</i>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={`${styles.card} ${styles.cardGold}`}>
          <h2>Where?</h2>
          <MapPin className={styles.mapPin} fill="currentColor" aria-hidden="true" />
          <h3>{event.venue}</h3>
          <p className={styles.muted}>{event.address}</p>
          <a className={styles.button} href={event.mapUrl} target="_blank" rel="noopener noreferrer">
            Open location <ExternalLink aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={`${styles.card} ${styles.cardViolet}`}>
          <h2>When?</h2>
          <ul className={styles.schedule}>
            {event.schedule.map((item) => (
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
          {countdownValues.map(([value, label]) => (
            <div key={label}><b>{value}</b><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className={styles.reveal}>
        <div className={`${styles.card} ${styles.cardGreen}`}>
          <h2>Leave us a message</h2>
          {sent ? (
            <p className={styles.thankYou}>Thank you, we love you!</p>
          ) : (
            <form action={submitMessage} className={styles.messageForm}>
              <input name="name" placeholder="Your name" aria-label="Your name" required />
              <textarea name="message" rows={3} placeholder="Write your message..." aria-label="Write your message" required />
              <button className={styles.button} type="submit">
                Send with love <Send aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className={`${styles.reveal} ${styles.inviteFooter}`}>
        <h2>We can&apos;t wait to celebrate with you!</h2>
        <p className={styles.names}>{event.groom} &amp; {event.bride}</p>
      </footer>
    </main>
  );
}