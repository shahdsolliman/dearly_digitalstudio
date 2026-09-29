"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/experience-card";
import Reveal from "@/components/reveal";
import GiftArtwork from "@/components/gift-artwork";

const journey = [
  {
    title: "Let’s talk",
    detail: "A little about the moment, the idea, and what matters most.",
  },
  {
    title: "Share materials",
    detail: "Gather the words, photographs, and little details that make it yours.",
  },
  {
    title: "We create",
    detail: "We bring everything together into a thoughtful digital experience.",
  },
  {
    title: "Review & revisions",
    detail: "Fine-tune the details together until it feels just right.",
  },
  {
    title: "Launch",
    detail: "Your experience is ready to share with the people who matter.",
  },
];

const previewCategories = [
  {
    label: "Weddings",
    description: "Romantic, personal, and full of story.",
    categories: ["Wedding"],
  },
  {
    label: "Milestones",
    description: "Birthdays, graduations, and meaningful moments.",
    categories: ["Birthday", "Graduation"],
  },
  {
    label: "Events",
    description: "Gatherings, launches, and fully branded experiences.",
    categories: ["Events", "Surprise"],
  },
];

function HeroBranch({ mirror = false }: { mirror?: boolean }) {
  return (
    <svg className="hero-branch" viewBox="0 0 160 420" aria-hidden="true">
      <g transform={mirror ? "translate(160 0) scale(-1 1)" : undefined}>
        <path className="branch-stem" d="M22 408C49 357 38 310 67 260c25-43 20-94 55-143" />
        <path className="branch-leaf" d="M43 363C20 364 11 350 14 333c19-2 32 9 29 30Z" />
        <path className="branch-leaf" d="M54 328c-22-6-26-22-17-37 19 3 28 17 17 37Z" />
        <path className="branch-leaf" d="M60 278c-23 0-32-14-27-31 20-1 32 11 27 31Z" />
        <path className="branch-leaf" d="M79 250c19-18 36-12 42 2-14 16-31 17-42-2Z" />
        <path className="branch-leaf" d="M89 200c-21-8-24-25-13-39 18 6 25 22 13 39Z" />
        <path className="branch-leaf" d="M104 165c17-18 34-13 41 1-13 17-30 18-41-1Z" />
        <path className="branch-leaf" d="M111 119c-18-11-18-27-5-39 16 9 20 24 5 39Z" />
        <path className="branch-bloom" d="M121 118c-5-13 2-22 12-23 4 11 0 20-12 23Z" />
        <circle className="branch-bud" cx="123" cy="108" r="5" />
        <circle className="branch-bud branch-bud-small" cx="137" cy="99" r="3" />
        <path className="falling-petal petal-one" d="M24 166c8-6 16-1 13 7-2 6-10 8-13-7Z" />
        <path className="falling-petal petal-two" d="M126 266c8-6 16-1 13 7-2 6-10 8-13-7Z" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const selectedCategory = previewCategories.find((category) => category.label === activeCategory);
  const visibleExperiences = activeCategory === null
    ? experiences.filter((experience) => experience.available !== false)
    : experiences.filter((experience) => selectedCategory?.categories.includes(experience.category));

  return (
    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-florals" aria-hidden="true">
          <span className="hero-floral hero-floral-left">
            <HeroBranch />
          </span>
          <span className="hero-floral hero-floral-right">
            <HeroBranch mirror />
          </span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Dearly · Digital experience studio</p>
          <h1 id="hero-heading">
            Digital experiences, <em>made personal.</em>
          </h1>
          <p className="hero-note">
            Thoughtful little worlds for life’s most meaningful moments.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/experiences">
              Explore experiences <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <a className="button-text" href="https://www.instagram.com/dearly_digitalstudio/" target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

      </section>

      <section className="section-wrap" id="experiences" aria-labelledby="gallery-heading">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">A few ways to begin</p>
            <h2 id="gallery-heading">Find your kind of wonderful.</h2>
          </div>
          <p className="section-side-note">
            A collection of starting points, each ready to become entirely yours.
          </p>
        </Reveal>
        <div className="demo-category-row" role="group" aria-label="Filter experiences by category">
          {previewCategories.map((category) => {
            const count = experiences.filter((experience) =>
              category.categories.includes(experience.category),
            ).length;

            return (
            <button
              key={category.label}
              className={`demo-category-pill ${activeCategory === category.label ? "is-active" : ""}`}
              type="button"
              aria-pressed={activeCategory === category.label}
              onClick={() => setActiveCategory(category.label)}
            >
              <span className="demo-category-count">{count} options</span>
              <strong>{category.label}</strong>
              <small>{category.description}</small>
            </button>
            );
          })}
        </div>
        {activeCategory !== null && (
          <div className="gallery-filter-reset">
            <button type="button" onClick={() => setActiveCategory(null)}>
              Show all available
            </button>
          </div>
        )}
        <div className="gallery-grid" aria-live="polite">
          {visibleExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
        <div className="gallery-more">
          <Link className="text-link" href="/experiences">
            Explore all experiences <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="custom-section section-wrap" aria-labelledby="custom-heading">
        <Reveal className="custom-copy">
          <p className="eyebrow">Made around you</p>
          <h2 id="custom-heading">Your idea doesn’t have to fit a template.</h2>
          <p>
            The best experiences start with a feeling. We’ll shape the rest around
            what makes it yours.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flow" aria-label="Idea to design to experience">
            <div className="flow-step">
              <span className="flow-number">01</span>
              <span>Idea</span>
            </div>
            <ArrowRight className="flow-arrow" size={19} strokeWidth={1.2} aria-hidden="true" />
            <div className="flow-step">
              <span className="flow-number">02</span>
              <span>Design</span>
            </div>
            <ArrowRight className="flow-arrow" size={19} strokeWidth={1.2} aria-hidden="true" />
            <div className="flow-step">
              <span className="flow-number">03</span>
              <span>Experience</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="journey-section section-wrap" id="journey" aria-labelledby="journey-heading">
        <Reveal className="journey-heading">
          <div>
            <p className="eyebrow">The Dearly journey</p>
            <h2 id="journey-heading">A lovely thing, made together.</h2>
          </div>
          <p>Five little steps from first hello to ready to share.</p>
        </Reveal>
        <div className="journey-track" role="group" aria-label="Dearly project steps">
          {journey.map((step, index) => (
            <button
              className="journey-step"
              key={step.title}
              type="button"
              aria-pressed={activeJourney === index}
              onClick={() => setActiveJourney(index)}
            >
              <span className="journey-dot" aria-hidden="true" />
              <span className="journey-count">0{index + 1}</span>
              <span className="journey-title">{step.title}</span>
              <AnimatePresence mode="wait">
                {activeJourney === index && (
                  <motion.span
                    className="journey-detail"
                    key={step.detail}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.detail}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </section>

      <Reveal className="gift-promo section-wrap" id="gifts">
        <GiftArtwork />
        <div className="gift-copy">
          <p className="eyebrow">A little extra, from us</p>
          <h2>A special gift with every experience.</h2>
          <p>Something thoughtful to make the moment feel even more yours.</p>
        </div>
      </Reveal>

      <section className="promotion" aria-label="Limited-time studio promotion">
        <div className="promotion-number">
          <strong>20</strong>
          <span>%</span>
        </div>
        <div className="promotion-copy">
          <p className="eyebrow">A little something extra</p>
          <p>
            <strong>20% OFF</strong> your first Dearly experience. Let’s make it
            one to remember.
          </p>
        </div>
      </section>

      <section className="closing-cta section-wrap" aria-labelledby="closing-heading">
        <Reveal className="closing-copy">
          <p className="eyebrow">Your turn</p>
          <h2 id="closing-heading">Have an idea? Let’s make it real.</h2>
          <a className="button-primary" href="https://www.instagram.com/dearly_digitalstudio/" target="_blank" rel="noopener noreferrer">
            Message us on Instagram <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
        <div className="closing-seal" aria-hidden="true">
          <Heart size={34} strokeWidth={1.1} />
        </div>
      </section>
    </main>
  );
}