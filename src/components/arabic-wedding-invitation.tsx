"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Landmark,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import styles from "./arabic-wedding-invitation.module.css";

const wedding = {
  bride: "مريم",
  groom: "أحمد",
  initials: "أ & م",
  dayName: "ليلة الخميس",
  dateGregorian: "١١ مارس ٢٠٢٧ م",
  dateHijri: "الموافق ٣ رمضان ١٤٤٨ هـ",
  countdownDate: new Date(2027, 2, 11, 20),
  timeMain: "الساعة ٨:٠٠ مساءً",
  timeDescription: "ابتداءً من صلاة العشاء — حضوركم يبهج قلوبنا ويزيدنا فرحًا",
  hallName: "قاعة اللؤلؤة الملكية",
  hallSubtitle: "قاعة اللؤلؤة الكبرى",
  address: "المدينة المنورة — الحي الراقي — القاعة الكبرى الملكية",
  mapUrl: "https://maps.google.com/?q=قاعة+اللؤلؤة+الملكية+المدينة+المنورة",
  calendarStart: "20270311T170000Z",
  calendarEnd: "20270311T220000Z",
};

const arabicWeekdays = ["ح", "ن", "ث", "ر", "خ", "ج", "س"];
const calendarMonthStart = new Date(
  wedding.countdownDate.getFullYear(),
  wedding.countdownDate.getMonth(),
  1,
);
const calendarDays = new Date(
  wedding.countdownDate.getFullYear(),
  wedding.countdownDate.getMonth() + 1,
  0,
).getDate();
const calendarOffset = (calendarMonthStart.getDay() + 1) % 7;
const arabicNumber = (value: number) =>
  new Intl.NumberFormat("ar-EG", { useGrouping: false }).format(value);

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function HallArtwork() {
  return (
    <svg
      className={styles.hallArtwork}
      viewBox="0 0 720 480"
      role="img"
      aria-label="رسم فني لقاعة زفاف مزينة بأقواس ذهبية"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hall-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#42101d" />
          <stop offset="1" stopColor="#180308" />
        </linearGradient>
        <linearGradient id="hall-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4da9b" />
          <stop offset="0.5" stopColor="#c5a059" />
          <stop offset="1" stopColor="#8c6928" />
        </linearGradient>
        <linearGradient id="hall-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8c6928" stopOpacity="0.28" />
          <stop offset="1" stopColor="#180308" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hall-light">
          <stop stopColor="#f4da9b" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f4da9b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="720" height="480" fill="url(#hall-sky)" />
      <ellipse cx="360" cy="236" rx="290" ry="196" fill="url(#hall-light)" opacity="0.5" />
      <path d="M0 380Q360 288 720 380V480H0Z" fill="url(#hall-floor)" />
      <path d="M40 430V227Q360 30 680 227V430" fill="none" stroke="url(#hall-gold)" strokeOpacity="0.48" strokeWidth="3" />
      <path d="M86 430V244Q360 72 634 244V430" fill="#260811" stroke="url(#hall-gold)" strokeOpacity="0.8" strokeWidth="2" />
      <path d="M130 430V267Q360 112 590 267V430" fill="#18050b" stroke="#dfba73" strokeOpacity="0.38" strokeWidth="2" />
      <path d="M174 430V297Q360 166 546 297V430" fill="#30101a" stroke="#c5a059" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M244 430V356Q244 286 360 255Q476 286 476 356V430Z" fill="#0e0307" stroke="url(#hall-gold)" strokeWidth="2" />
      <path d="M266 430V359Q266 310 360 283Q454 310 454 359V430" fill="none" stroke="#f4da9b" strokeOpacity="0.36" />
      <path d="M0 430H720" stroke="#dfba73" strokeOpacity="0.42" />
      <path d="M360 430 255 480M360 430 465 480M170 430 94 480M550 430 626 480" stroke="#c5a059" strokeOpacity="0.2" />
      {[150, 210, 510, 570].map((x) => (
        <g key={x} fill="url(#hall-gold)" opacity="0.86">
          <circle cx={x} cy="195" r="3" />
          <path d={`M${x} 198v23m-13-7 13 7 13-7m-13 0-10 12m10-12 10 12`} fill="none" stroke="#dfba73" strokeWidth="1.2" />
        </g>
      ))}
      {[104, 360, 616].map((x) => (
        <g key={x} fill="#f4da9b">
          <circle cx={x} cy="104" r="2" opacity="0.9" />
          <path d={`M${x} 91v26m-13-13h26`} stroke="#f4da9b" strokeOpacity="0.42" />
        </g>
      ))}
      <path d="M68 427c26-22 30-49 24-76m560 76c-26-22-30-49-24-76" fill="none" stroke="#a68d55" strokeOpacity="0.6" strokeWidth="2" />
      <path d="m94 385-14-14m16 0 13-16m503 30 14-14m-16 0-13-16" fill="none" stroke="#dfba73" strokeOpacity="0.7" />
      <circle cx="80" cy="368" r="4" fill="#dfba73" />
      <circle cx="640" cy="368" r="4" fill="#dfba73" />
    </svg>
  );
}

function Crest() {
  return (
    <div className={styles.crest} aria-label={`حروف العروسين ${wedding.initials}`}>
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r="64" fill="none" stroke="#dfba73" strokeOpacity=".4" strokeDasharray="3 3" />
        <circle cx="70" cy="70" r="56" fill="none" stroke="#dfba73" strokeOpacity=".8" />
        <circle cx="70" cy="70" r="51" fill="none" stroke="#c5a059" strokeOpacity=".35" />
        <path d="M34 96C26 80 26 52 44 35c4 13 0 33 12 45m50 16c14-16 14-44-4-61-4 13 0 33-12 45" fill="none" stroke="#dfba73" />
        <circle cx="70" cy="14" r="2.5" fill="#f4da9b" />
        <circle cx="70" cy="126" r="2.5" fill="#f4da9b" />
      </svg>
      <span>{wedding.initials}</span>
    </div>
  );
}

function escapeCalendarText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export default function ArabicWeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, wedding.countdownDate.getTime() - Date.now());
      setCountdown({
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor(remaining / 3_600_000) % 24,
        minutes: Math.floor(remaining / 60_000) % 60,
        seconds: Math.floor(remaining / 1_000) % 60,
      });
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!revealed) return;
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
  }, [revealed]);

  useEffect(() => {
    if (!revealed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    type Particle = { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; fade: number };
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
    for (let index = 0; index < 64; index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0.5 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.5 + 0.15),
        alpha: Math.random(),
        fade: (0.003 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha += particle.fade;
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }
        if (particle.alpha <= 0 || particle.alpha >= 1) particle.fade *= -1;
        context.save();
        context.globalAlpha = particle.alpha * 0.6;
        context.fillStyle = "#dfba73";
        context.shadowBlur = 8;
        context.shadowColor = "#c5a059";
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
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
  }, [revealed]);

  useEffect(() => () => {
    if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
  }, []);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    revealTimerRef.current = window.setTimeout(() => {
      setRevealed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1_200);
  };

  const downloadCalendar = () => {
    const couple = `${wedding.groom} و ${wedding.bride}`;
    const eventLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dearly//Arabic Wedding Invitation//AR",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `DTSTART:${wedding.calendarStart}`,
      `DTEND:${wedding.calendarEnd}`,
      `SUMMARY:${escapeCalendarText(`زفاف ${couple}`)}`,
      `DESCRIPTION:${escapeCalendarText(`حفل زفاف ${couple} في ${wedding.hallName}`)}`,
      `LOCATION:${escapeCalendarText(`${wedding.hallName} - ${wedding.address}`)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const calendar = new Blob([eventLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(calendar);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "wedding-maryam-ahmed.ics";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1_000);
  };

  const submitMessage = (formData: FormData) => {
    if (!formData.get("name") || !formData.get("message")) return;
    setSent(true);
  };

  const countdownValues = [
    [countdown.days, "أيام"],
    [countdown.hours, "ساعات"],
    [countdown.minutes, "دقائق"],
    [countdown.seconds, "ثوانٍ"],
  ] as const;

  return (
    <main lang="ar" dir="rtl" className={`${styles.invitation} dearly-arabic-invitation-page`}>
      <canvas className={`${styles.particles} ${revealed ? styles.particlesVisible : ""}`} ref={canvasRef} aria-hidden="true" />

      {!revealed && (
        <div className={`${styles.envelopeScreen} ${opened ? styles.envelopeScreenOpening : ""}`}>
          <div className={styles.envelopeHeading}>
            <p>✦ اضغط لفتح دعوتكم ✦</p>
            <span>دعوة زفاف {wedding.groom} و{wedding.bride}</span>
          </div>
          <button
            className={`${styles.envelopeScene} ${opened ? styles.envelopeSceneOpening : ""}`}
            type="button"
            onClick={openEnvelope}
            aria-label={`افتح دعوة زفاف ${wedding.groom} و${wedding.bride}`}
          >
            <span className={styles.envelopePhoto} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className={`${styles.main} ${revealed ? styles.mainVisible : ""}`}>
        <div className={styles.page}>
          <section className={`${styles.hero} ${styles.reveal}`}>
            <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <div className={styles.divider} aria-hidden="true"><i /><i /><Sparkles /><i /><i /></div>
            <div className={styles.heroPoem}>
              <p>لمن كان وصالهم ودودًا على قلوبنا</p>
              <p>لأنسنا بالأفراح نحب وصالكم</p>
              <p>بصادق الود والمحبة نتشرف بدعوتكم</p>
              <p className={styles.eventLead}>لحضور حفل زفاف</p>
            </div>
            <h1>{wedding.groom} و {wedding.bride}</h1>
            <p className={styles.tagline}>جمعنا الله على خير</p>
            <div className={styles.coupleArtwork}>
              <Crest />
              <div className={styles.heroDate}>
                <p>{wedding.dateGregorian}</p>
                <span>{wedding.dayName}</span>
              </div>
              <div className={styles.hallFrame}><HallArtwork /></div>
            </div>
          </section>

          <div className={`${styles.divider} ${styles.reveal}`} aria-hidden="true"><i /><i /><i /><i /></div>

          <section className={`${styles.quran} ${styles.reveal}`} aria-label="آية قرآنية عن الزواج">
            <div className={styles.quranOrnament}><i /><Sparkles /><i /></div>
            <blockquote>
              ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
            </blockquote>
            <cite>— سورة الروم، الآية ٢١ —</cite>
          </section>

          <section className={`${styles.invitationCopy} ${styles.reveal}`}>
            <p className={styles.sectionLabel}>✦ دعوة زفاف ✦</p>
            <h2>إلى أهلنا وأصدقائنا</h2>
            <p>لأن أجمل البدايات تُكتب بحضور من نحب،<br />يسعدنا أن ندعوكم لمشاركتنا فرحة زفافنا<br />ليلةً مليئةً بالحب والدعاء والمودة.</p>
          </section>

          <div className={`${styles.quote} ${styles.reveal}`}>
            <p>«وجودكم هو أحلى جزء في الحكاية»</p>
          </div>

          <section className={`${styles.countdownSection} ${styles.reveal}`}>
            <p className={styles.sectionLabel}>✦ العد التنازلي ✦</p>
            <h2>حتى يجمعنا الله على خير</h2>
            <div className={styles.countdown}>
              {countdownValues.map(([value, label]) => (
                <div className={styles.countdownItem} key={label}>
                  <span className={styles.countdownValue}>{arabicNumber(value)}</span>
                  <span className={styles.countdownLabel}>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.eventDetails} aria-labelledby="details-heading">
            <div className={`${styles.detailsHeading} ${styles.reveal}`}>
              <p className={styles.sectionLabel}>✦ تفاصيل ليلة العمر ✦</p>
              <h2 id="details-heading">موعدنا معكم</h2>
            </div>

            <article className={`${styles.detailCard} ${styles.reveal}`}>
              <div className={styles.detailIcon}><CalendarDays aria-hidden="true" /></div>
              <p className={styles.detailLabel}>الزمان واليوم</p>
              <h3>{wedding.dayName}</h3>
              <p className={styles.detailValue}>{wedding.dateGregorian}</p>
              <p className={styles.detailSubvalue}>{wedding.dateHijri}</p>
              <div className={styles.calendar} aria-label="تقويم شهر مارس ٢٠٢٧">
                <span>مارس ٢٠٢٧</span>
                <div className={styles.calendarGrid}>
                  {arabicWeekdays.map((day, index) => <b key={`${day}-${index}`}>{day}</b>)}
                  {Array.from({ length: calendarOffset }, (_, index) => <i key={`blank-${index}`} />)}
                  {Array.from({ length: calendarDays }, (_, index) => {
                    const day = index + 1;
                    return <i className={day === wedding.countdownDate.getDate() ? styles.calendarDay : ""} key={day}>{arabicNumber(day)}</i>;
                  })}
                </div>
              </div>
              <button className={styles.outlineButton} type="button" onClick={downloadCalendar}>
                <CalendarDays aria-hidden="true" /> احفظوا الموعد في التقويم
              </button>
            </article>

            <article className={`${styles.detailCard} ${styles.reveal}`}>
              <div className={styles.detailIcon}><Clock3 aria-hidden="true" /></div>
              <p className={styles.detailLabel}>الموعد وساعة الحضور</p>
              <h3>توقيت الحفل</h3>
              <p className={styles.detailValue}>{wedding.timeMain}</p>
              <p className={styles.detailSubvalue}>{wedding.timeDescription}</p>
            </article>

            <article className={`${styles.detailCard} ${styles.reveal}`}>
              <div className={styles.detailIcon}><Landmark aria-hidden="true" /></div>
              <p className={styles.detailLabel}>مكان الاحتفال</p>
              <h3>{wedding.hallName}</h3>
              <p className={styles.detailValue}>{wedding.hallSubtitle}</p>
              <p className={styles.detailSubvalue}>{wedding.address}</p>
              <a className={styles.outlineButton} href={wedding.mapUrl} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" /> افتحوا الموقع على خرائط جوجل
              </a>
            </article>
          </section>

          <section className={`${styles.guestMessage} ${styles.reveal}`}>
            <h2>✦ رسالة من القلب ✦</h2>
            <p className={styles.messageLead}>أرسلوا لنا كلمةً طيبة أو دعاءً من القلب يبقى ذكرى جميلة</p>
            {sent ? (
              <div className={styles.successMessage} role="status">
                <span><Check aria-hidden="true" /></span>
                <p>جزاكم الله خيرًا، رسالتكم وصلت بكل محبة وتقدير</p>
                <small>«بارك الله فيكم وجعل دياركم عامرة بالأفراح والمودة»</small>
              </div>
            ) : (
              <form action={submitMessage} className={styles.messageForm}>
                <label>
                  <span>الاسم</span>
                  <input name="name" autoComplete="name" placeholder="أدخل اسمك هنا..." required />
                </label>
                <label>
                  <span>رسالتك للعروسين</span>
                  <textarea name="message" placeholder="اكتب ما يفيض به خاطرك... دعاء، كلمة محبة، أو أمنية طيبة" rows={4} required />
                </label>
                <button className={styles.submitButton} type="submit">✦ أرسلوا رسالتكم <Send aria-hidden="true" /></button>
              </form>
            )}
          </section>

          <footer className={`${styles.invitationFooter} ${styles.reveal}`}>
            <div className={styles.divider} aria-hidden="true"><i /><i /><i /><i /></div>
            <p>«اللهم بارك لنا وبارك علينا<br />واجمع بيننا في خير»</p>
            <strong>{wedding.groom} و {wedding.bride}</strong>
            <time dateTime="2027-03-11">{wedding.dateGregorian}</time>
          </footer>
        </div>
      </div>
    </main>
  );
}