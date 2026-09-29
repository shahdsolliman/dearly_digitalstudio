"use client";

import { useState } from "react";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/experience-card";
import Reveal from "@/components/reveal";

const categories = ["All", ...new Set(experiences.map((item) => item.category))];

const templateGroups = [
  { label: "Weddings", count: experiences.filter((item) => item.category === "Wedding").length, ready: true },
  { label: "Engagements", count: experiences.filter((item) => item.category === "Engagement").length, ready: true },
  { label: "Birthdays", count: experiences.filter((item) => item.category === "Birthday").length, ready: true },
  { label: "Milestones", count: experiences.filter((item) => ["Graduation", "Surprise"].includes(item.category)).length, ready: false },
  { label: "Events", count: experiences.filter((item) => item.category === "Events").length, ready: false },
];

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleExperiences =
    activeCategory === "All"
      ? experiences
      : experiences.filter((item) => item.category === activeCategory);

  return (
    <main>
      <Reveal className="page-intro">
        <p className="eyebrow">The experience gallery</p>
        <h1>A little inspiration, just for you.</h1>
        <p>
          Browse the collection. Each experience is a beginning, ready to be
          made personal.
        </p>
      </Reveal>
      <section className="section-wrap experience-gallery-page" aria-label="Browse experiences">
        <div className="template-group-row" aria-label="Templates by occasion">
          {templateGroups.map((group) => (
            <div
              key={group.label}
              className={`template-group ${group.ready ? "is-ready" : "is-coming-soon"}`}
            >
              <span className="template-group-count">{group.count} templates</span>
              <strong>{group.label}</strong>
              <small>{group.ready ? "Ready to explore" : "Will add soon"}</small>
            </div>
          ))}
        </div>

        <div className="filter-row" role="group" aria-label="Filter by experience type">
          {categories.map((category) => (
            <button
              className="filter-button"
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="gallery-count" aria-live="polite">
          {visibleExperiences.length} {visibleExperiences.length === 1 ? "experience" : "experiences"}
        </p>
        <div className="gallery-grid">
          {visibleExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}