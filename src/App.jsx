import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

  :root {
    --cyan: #63d4ff;
    --violet: #a78bfa;
    --bg: #050810;
    --bg2: #080c18;
    --surface: rgba(255,255,255,0.025);
    --border: rgba(255,255,255,0.07);
    --border-cyan: rgba(99,212,255,0.18);
    --text: #e2e8f0;
    --muted: #94a3b8;
    --dim: #64748b;
  }

  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }

  .portfolio-root {
    background: var(--bg);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── GRAIN OVERLAY ── */
  .portfolio-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.1rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(20px) saturate(1.4);
    background: rgba(5,8,16,0.75);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s ease;
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--cyan), var(--violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links { display: flex; gap: 2.2rem; list-style: none; }

  .nav-links a {
    font-family: 'DM Mono', monospace;
    font-size: 0.69rem;
    color: var(--dim);
    text-decoration: none;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--cyan);
    transition: width 0.25s ease;
  }

  .nav-links a:hover { color: var(--cyan); }
  .nav-links a:hover::after { width: 100%; }

  .nav-download {
    font-family: 'DM Mono', monospace;
    font-size: 0.69rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.55rem 1.3rem;
    background: transparent;
    border: 1px solid var(--border-cyan);
    color: var(--cyan);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .nav-download:hover {
    background: rgba(99,212,255,0.1);
    border-color: var(--cyan);
    box-shadow: 0 0 16px rgba(99,212,255,0.12);
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 7rem 3rem 5rem;
    overflow: hidden;
  }

  .hero-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,212,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,212,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
    pointer-events: none;
  }

  .hero-glow {
    position: absolute;
    width: 800px; height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,212,255,0.055) 0%, transparent 65%);
    top: -200px; left: -250px;
    pointer-events: none;
  }

  .hero-glow-2 {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.065) 0%, transparent 65%);
    bottom: -100px; right: -80px;
    pointer-events: none;
  }

  .hero-inner {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }

  .hero-content { flex: 1; max-width: 620px; }

  /* ── PROFILE PHOTO ── */
  .hero-photo-wrap {
    position: relative;
    flex-shrink: 0;
    width: 280px; height: 280px;
  }

  .hero-photo-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--cyan), var(--violet), var(--cyan));
    background-size: 200% 200%;
    animation: gradientSpin 4s linear infinite;
    z-index: 0;
  }

  @keyframes gradientSpin {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .hero-photo-inner {
    position: relative;
    z-index: 1;
    width: 100%; height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, #0c1428, #060a14);
    border: 3px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Replace this img with your actual <img src="your-photo.jpg"> */
  .hero-photo-inner img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .hero-photo-initials {
    font-family: 'Syne', sans-serif;
    font-size: 4.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--cyan), var(--violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.04em;
    user-select: none;
  }

  .hero-photo-badge {
    position: absolute;
    bottom: 10px; right: 10px;
    background: linear-gradient(135deg, #0f2027, #1a3a50);
    border: 1px solid var(--border-cyan);
    border-radius: 20px;
    padding: 0.35rem 0.9rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--cyan);
    z-index: 2;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  /* Decorative corner accents */
  .hero-photo-wrap::before,
  .hero-photo-wrap::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--cyan);
    border-style: solid;
    opacity: 0.35;
    z-index: 3;
  }
  .hero-photo-wrap::before {
    top: -14px; left: -14px;
    border-width: 2px 0 0 2px;
    border-radius: 3px 0 0 0;
  }
  .hero-photo-wrap::after {
    bottom: -14px; right: -14px;
    border-width: 0 2px 2px 0;
    border-radius: 0 0 3px 0;
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .hero-eyebrow::before {
    content: '';
    display: inline-block;
    width: 32px; height: 1px;
    background: var(--cyan);
  }

  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin-bottom: 1.5rem;
  }

  .hero-name span {
    display: block;
    background: linear-gradient(135deg, #ffffff 0%, #c8d8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-name .accent {
    background: linear-gradient(135deg, var(--cyan) 0%, var(--violet) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-role-line {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .hero-role-tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.35rem 0.85rem;
    border-radius: 3px;
    background: rgba(99,212,255,0.08);
    border: 1px solid var(--border-cyan);
    color: var(--cyan);
  }

  .hero-role-tag.violet {
    background: rgba(167,139,250,0.08);
    border-color: rgba(167,139,250,0.2);
    color: var(--violet);
  }

  .hero-desc {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.75;
    max-width: 500px;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn-primary {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.9rem 2.2rem;
    background: linear-gradient(135deg, var(--cyan), var(--violet));
    color: #050810;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.25s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-primary:hover::after { opacity: 0.1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,212,255,0.25); }

  .btn-outline {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.9rem 2.2rem;
    background: transparent;
    color: var(--text);
    border: 1px solid rgba(226,232,240,0.18);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-outline:hover {
    border-color: rgba(226,232,240,0.45);
    background: rgba(226,232,240,0.04);
    transform: translateY(-2px);
  }

  .hero-stats {
    display: flex;
    gap: 3rem;
    margin-top: 3.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(226,232,240,0.06);
  }

  .stat-item { display: flex; flex-direction: column; gap: 0.3rem; }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--cyan);
    line-height: 1;
  }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dim);
  }

  /* ── SECTION BASE ── */
  section {
    position: relative;
    z-index: 1;
    padding: 6rem 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.66rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(99,212,255,0.12);
    max-width: 90px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #f1f5f9;
    margin-bottom: 3rem;
    line-height: 1.1;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
    gap: 0.7rem;
  }

  .skill-pill {
    padding: 0.75rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    color: var(--muted);
    text-align: center;
    transition: all 0.22s;
    cursor: default;
  }

  .skill-pill:hover {
    border-color: var(--border-cyan);
    color: var(--cyan);
    background: rgba(99,212,255,0.07);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99,212,255,0.08);
  }

  .skill-pill.accent {
    border-color: rgba(167,139,250,0.15);
    color: var(--violet);
    background: rgba(167,139,250,0.04);
  }

  .skill-pill.accent:hover {
    border-color: rgba(167,139,250,0.4);
    background: rgba(167,139,250,0.09);
    box-shadow: 0 4px 16px rgba(167,139,250,0.08);
  }

  /* ── TIMELINE ── */
  .timeline {
    position: relative;
    padding-left: 2rem;
    max-width: 720px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 6px; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--cyan), rgba(99,212,255,0), transparent);
    opacity: 0.25;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 3rem;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -2.4rem; top: 6px;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 8px rgba(99,212,255,0.5);
  }

  .timeline-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 0.55rem;
  }

  .timeline-company {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.3rem;
  }

  .timeline-role {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: var(--violet);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 0.9rem;
  }

  .timeline-desc {
    font-size: 0.88rem;
    color: var(--dim);
    line-height: 1.8;
    max-width: 580px;
  }

  /* ── PROJECTS ── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--cyan), var(--violet));
    opacity: 0;
    transition: opacity 0.3s;
  }

  .project-card:hover {
    border-color: rgba(99,212,255,0.18);
    background: rgba(99,212,255,0.025);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,212,255,0.1);
  }

  .project-card:hover::before { opacity: 1; }

  .project-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 0.85rem;
  }

  .project-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.85rem;
    line-height: 1.3;
  }

  .project-desc {
    font-size: 0.855rem;
    color: var(--dim);
    line-height: 1.75;
    flex: 1;
    margin-bottom: 1.25rem;
  }

  .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .project-tag {
    display: inline-block;
    padding: 0.28rem 0.7rem;
    background: rgba(167,139,250,0.07);
    border: 1px solid rgba(167,139,250,0.14);
    border-radius: 3px;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.07em;
    color: var(--violet);
    text-transform: uppercase;
  }

  /* ── ACHIEVEMENTS ── */
  .ach-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .ach-card {
    padding: 1.75rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .ach-card::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 80px; height: 80px;
    background: radial-gradient(circle at 100% 100%, rgba(99,212,255,0.05), transparent 70%);
    pointer-events: none;
  }

  .ach-card:hover {
    border-color: rgba(99,212,255,0.15);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  }

  .ach-icon { font-size: 1.6rem; margin-bottom: 0.9rem; }

  .ach-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 0.4rem;
  }

  .ach-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--cyan);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .ach-desc { font-size: 0.8rem; color: var(--dim); line-height: 1.65; }

  /* ── INTERESTS ── */
  .interests-grid { display: flex; flex-wrap: wrap; gap: 0.65rem; }

  .interest-tag {
    padding: 0.55rem 1.15rem;
    background: rgba(255,255,255,0.025);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    color: var(--muted);
    text-transform: uppercase;
    transition: all 0.2s;
  }

  .interest-tag:hover {
    background: rgba(99,212,255,0.06);
    border-color: rgba(99,212,255,0.22);
    color: var(--cyan);
  }

  /* ── CONTACT ── */
  .contact-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .contact-info p {
    font-size: 0.9rem;
    color: var(--dim);
    line-height: 1.85;
    margin-bottom: 2rem;
  }

  .contact-links { display: flex; flex-direction: column; gap: 0.7rem; }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    text-decoration: none;
    color: var(--muted);
    font-size: 0.83rem;
    font-family: 'DM Mono', monospace;
    transition: all 0.22s;
  }

  .contact-link:hover {
    border-color: rgba(99,212,255,0.22);
    color: var(--cyan);
    background: rgba(99,212,255,0.04);
    transform: translateX(4px);
  }

  .contact-link-icon {
    width: 34px; height: 34px;
    background: rgba(99,212,255,0.07);
    border: 1px solid rgba(99,212,255,0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .contact-link:hover .contact-link-icon {
    background: rgba(99,212,255,0.12);
    border-color: rgba(99,212,255,0.25);
  }

  /* ── DIVIDER ── */
  .section-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,212,255,0.08), transparent);
    margin: 0 auto;
    max-width: 1200px;
  }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border);
    padding: 2.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Mono', monospace;
    font-size: 0.63rem;
    letter-spacing: 0.1em;
    color: #334155;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }

  .footer-links { display: flex; gap: 1.5rem; }

  .footer-links a {
    color: #334155;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: var(--cyan); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.22s; }
  .delay-3 { animation-delay: 0.38s; }
  .delay-4 { animation-delay: 0.56s; }
  .delay-5 { animation-delay: 0.74s; }
  .delay-6 { animation-delay: 0.9s; }

  @keyframes floatPhoto {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .hero-photo-wrap { animation: floatPhoto 6s ease-in-out infinite; }

  .reveal { opacity: 0; transform: translateY(22px); transition: all 0.7s cubic-bezier(0.22,1,0.36,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .hero-inner { flex-direction: column-reverse; align-items: flex-start; gap: 2.5rem; }
    .hero-photo-wrap { width: 200px; height: 200px; align-self: center; }
    .hero-photo-initials { font-size: 3.2rem; }
  }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 4rem 1.5rem; }
    .hero { padding: 6rem 1.5rem 3.5rem; }
    .hero-stats { gap: 1.75rem; flex-wrap: wrap; }
    .contact-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .ach-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 1rem; text-align: center; }
  }

  @media print {
    nav, .hero-ctas, .nav-download { display: none !important; }
    .portfolio-root::before { display: none; }
  }
`;

const skills = [
  { label: "Python",             accent: false },
  { label: "HTML / CSS",         accent: true  },
  { label: "SQL",                accent: false },
  { label: "Back-end Dev",       accent: false },
  { label: "Debugging",          accent: false },
  { label: "SEO",                accent: true  },
  { label: "Digital Marketing",  accent: true  },
  { label: "Typewriting",        accent: false },
  { label: "YOLO / Deep Learning", accent: true },
  { label: "MySQL",              accent: false },
  { label: "UI Design",          accent: true  },
  { label: "Responsive Layouts", accent: false },
];

const experiences = [
  {
    year: "2025",
    company: "RKS Infotech",
    role: "Frontend & SEO Intern",
    desc: "Built and styled responsive web pages using HTML and CSS. Assisted in debugging and optimizing front-end code for better performance. Additionally completed 45 days of practical SEO experience — keyword analysis, meta tags, on-page strategies, and content optimization using analytics tools.",
  },
  {
    year: "2024",
    company: "Valuenet Technologies",
    role: "Back-end Development Intern",
    desc: "Completed a 1-month internship in back-end development through Top Skilled Academy. Gained hands-on exposure to server-side programming workflows and backend architecture.",
  },
];

const projects = [
  {
    year: "2026",
    name: "Real-time Helmet Violation Detection",
    desc: "Implemented a deep neural network based on the YOLO architecture for object detection, achieving high accuracy in detecting both riders and helmets in real time.",
    tags: ["Deep Learning", "YOLO", "Python", "Computer Vision"],
  },
  {
    year: "2025",
    name: "Hotel Registration Management System",
    desc: "Built a secure and user-friendly online platform for hotel registration, enabling guests to book rooms, manage reservations, and check-in remotely.",
    tags: ["Web Dev", "SQL", "Back-end"],
  },
];

const achievements = [
  { icon: "🏆", title: "NPTEL — Elite",             year: "2025", desc: "Completed AI & Deep Learning coursework with hands-on experience in real-time object detection and computer vision using YOLO." },
  { icon: "🎨", title: "Poster Making — 1st Place",  year: "2025", desc: "First place in a Poster Making Competition, showcasing creativity and the ability to communicate concepts visually." },
  { icon: "🔵", title: "IBM Course — MySQL",          year: "2025", desc: "Completed an IBM-certified MySQL course and delivered a collaborative project with teammates." },
  { icon: "⌨️", title: "Typewriting — Distinction",  year: "2023", desc: "Achieved first class with distinction, reflecting precision, consistency, and discipline under time constraints." },
];

const interests = [
  "Coding / Programming", "Networking", "Robotics",
  "Data Structures", "Problem Solving", "Typewriting",
  "Error Finding & Rectifying",
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, style }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/PORTFOLIO/VM_CVprintAPR.pdf";  // ← use this
  link.download = "VishvaMoorthi_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
      <style>{styles}</style>
      <div className="portfolio-root">

        {/* ── NAV ── */}
        <nav style={{ boxShadow: scrolled ? "0 2px 40px rgba(0,0,0,0.5)" : "none" }}>
          <div className="nav-logo">VM</div>
          <ul className="nav-links">
            {["Skills", "Experience", "Projects", "Achievements", "Contact"].map(s => (
              <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
            ))}
          </ul>
          <button className="nav-download" onClick={handleDownload}>↓ Resume</button>
        </nav>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-bg-grid" />
          <div className="hero-glow" />
          <div className="hero-glow-2" />

          <div className="hero-inner">
            {/* Left — Text Content */}
            <div className="hero-content">
              <p className="hero-eyebrow fade-up delay-1">Available for Opportunities</p>

              <h1 className="hero-name fade-up delay-2">
                <span>Vishva</span>
                <span className="accent">Moorthi R</span>
              </h1>

              <div className="hero-role-line fade-up delay-3">
                <span className="hero-role-tag">Backend Dev</span>
                <span className="hero-role-tag violet">Deep Learning</span>
                <span className="hero-role-tag">SEO</span>
              </div>

              <p className="hero-desc fade-up delay-4">
                Computer Science undergraduate specialising in back-end development,
                web technologies, and SEO. Currently building at the intersection
                of deep learning and practical software.
              </p>

              <div className="hero-ctas fade-up delay-5">
                <button className="btn-primary" onClick={handleDownload}>Download Resume ↓</button>
                <a className="btn-outline" href="#contact">Get in Touch</a>
              </div>

              <div className="hero-stats fade-up delay-6">
                <div className="stat-item">
                  <span className="stat-num">7.3</span>
                  <span className="stat-label">CGPA — B.Tech CSE</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">2</span>
                  <span className="stat-label">Internships</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">2</span>
                  <span className="stat-label">Live Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">4</span>
                  <span className="stat-label">Achievements</span>
                </div>
              </div>
            </div>

            {/* Right — Profile Photo */}
            <div className="hero-photo-wrap fade-up delay-3">
              <div className="hero-photo-ring" />
              <div className="hero-photo-inner">
                {/*
                  ── TO USE YOUR REAL PHOTO ──
                  Replace the div below with:
                  <img src="/your-photo.jpg" alt="Vishva Moorthi R" />
                  ─────────────────────────────
                */}
                <div className="hero-photo-initials">VM</div>
              </div>
              <div className="hero-photo-badge">
                <span className="badge-dot" />
                Open to work
              </div>
            </div>
          </div>
        </div>

        {/* ── SKILLS ── */}
        <section id="skills">
          <RevealSection>
            <p className="section-label">Expertise</p>
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {skills.map(s => (
                <div key={s.label} className={`skill-pill${s.accent ? " accent" : ""}`}>{s.label}</div>
              ))}
            </div>
          </RevealSection>
        </section>

        <div className="section-divider" />

        {/* ── EDUCATION ── */}
        <section id="education" style={{ paddingTop: "4rem" }}>
          <RevealSection>
            <p className="section-label">Academic Background</p>
            <h2 className="section-title">Education</h2>
            <div className="timeline">
              <div className="timeline-item">
                <p className="timeline-year">2022 — 2026</p>
                <p className="timeline-company">B.Tech — Computer Science & Engineering</p>
                <p className="timeline-role">CGPA: 7.3</p>
                <p className="timeline-desc">Pursuing a Bachelor of Technology with a focus on software development, algorithms, and applied machine learning.</p>
              </div>
              <div className="timeline-item">
                <p className="timeline-year">2021 — 2022</p>
                <p className="timeline-company">Higher Secondary — Vidhya Bhavan</p>
                <p className="timeline-role">79.33%</p>
                <p className="timeline-desc">Completed class 12 with strong performance in sciences and mathematics.</p>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" style={{ paddingTop: "2rem" }}>
          <RevealSection>
            <p className="section-label">Work History</p>
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              {experiences.map(e => (
                <div key={e.company} className="timeline-item">
                  <p className="timeline-year">{e.year}</p>
                  <p className="timeline-company">{e.company}</p>
                  <p className="timeline-role">{e.role}</p>
                  <p className="timeline-desc">{e.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        <div className="section-divider" />

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ paddingTop: "4rem" }}>
          <RevealSection>
            <p className="section-label">Built</p>
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {projects.map(p => (
                <div key={p.name} className="project-card">
                  <p className="project-year">{p.year}</p>
                  <p className="project-name">{p.name}</p>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        <div className="section-divider" />

        {/* ── ACHIEVEMENTS ── */}
        <section id="achievements" style={{ paddingTop: "4rem" }}>
          <RevealSection>
            <p className="section-label">Recognition</p>
            <h2 className="section-title">Achievements</h2>
            <div className="ach-grid">
              {achievements.map(a => (
                <div key={a.title} className="ach-card">
                  <div className="ach-icon">{a.icon}</div>
                  <p className="ach-title">{a.title}</p>
                  <p className="ach-year">{a.year}</p>
                  <p className="ach-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ── INTERESTS ── */}
        <section style={{ paddingTop: "2rem" }}>
          <RevealSection>
            <p className="section-label">Passions</p>
            <h2 className="section-title">Areas of Interest</h2>
            <div className="interests-grid">
              {interests.map(i => <span key={i} className="interest-tag">{i}</span>)}
            </div>
          </RevealSection>
        </section>

        <div className="section-divider" />

        {/* ── CONTACT ── */}
        <section id="contact" style={{ paddingTop: "4rem" }}>
          <RevealSection>
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Contact</h2>
            <div className="contact-inner">
              <div className="contact-info">
                <p>
                  I'm currently a B.Tech CSE student (2026) based in Puducherry, India.
                  Open to internships, freelance projects, and full-time roles in web development,
                  back-end engineering, or data-driven applications.
                </p>
                <button className="btn-primary" onClick={handleDownload}>
                  Download Resume ↓
                </button>
              </div>
              <div className="contact-links">
                <a className="contact-link" href="mailto:Vishwamoorthy888@gmail.com">
                  <span className="contact-link-icon">✉</span>
                  Vishwamoorthy888@gmail.com
                </a>
                <a className="contact-link" href="tel:7338772834">
                  <span className="contact-link-icon">☎</span>
                  +91 73387 72834
                </a>
                <a className="contact-link" href="https://github.com/Vishvamoorthi/RKS" target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">⌥</span>
                  github.com/Vishvamoorthi
                </a>
                <a className="contact-link" href="https://www.linkedin.com/in/vishva-moorthi-r-0a6a772ab" target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">in</span>
                  linkedin.com/in/vishva-moorthi-r
                </a>
                <a className="contact-link" href="#">
                  <span className="contact-link-icon">◎</span>
                  45, Nehru Nagar, Puducherry, India
                </a>
              </div>
            </div>
          </RevealSection>
        </section>

        <footer>
          <p>© 2026 Vishva Moorthi R — Designed & Built with React</p>
          <div className="footer-links">
            <a href="https://github.com/Vishvamoorthi/RKS" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vishva-moorthi-r-0a6a772ab" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:Vishwamoorthy888@gmail.com">Email</a>
          </div>
        </footer>

      </div>
    </>
  );
}