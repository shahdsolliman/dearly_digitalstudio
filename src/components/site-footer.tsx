import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Dearly Studio</span>
      <div className="footer-links">
        <Link href="/experiences">Experiences</Link>
        <a
          href="https://www.instagram.com/dearly_digitalstudio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
          </svg>
        </a>
      </div>
    </footer>
  );
}