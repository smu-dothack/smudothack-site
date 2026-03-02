# SMU .Hack Website — Site Plan

## Context

SMU .Hack is a tech club at Singapore Management University that needs a website to showcase events, members, projects, and recruit new members. The site is maintainable by club members via markdown files and GitHub PRs.

**Repository**: [github.com/smu-dothack/smudothack-site](https://github.com/smu-dothack/smudothack-site)

---

## Tech Stack

| Component | Choice | Why |
|-----------|--------|-----|
| Framework | Hugo | Fast static site generator, markdown-based content |
| Styling | Tailwind CSS v4 | Utility-first, integrates with Hugo Pipes |
| JavaScript | Vanilla JS + Canvas | No frameworks, ~20KB total |
| Fonts | Self-hosted (Space Grotesk, Inter, Fira Code) | No external dependencies |
| Deployment | GitHub Pages | Free hosting for static sites |
| CI/CD | GitHub Actions | Auto-builds on push to `main` |
| Domain | Custom domain via CNAME | HTTPS auto-provisioned by GitHub |

**Total hosting cost: $0/month**

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Accent | `#5CEAAB` | Primary mint green |
| Accent Hover | `#4AC892` | Hover/active states |
| Background | `#1A1A1A` | Page background |
| Surface | `#2D2D2D` | Cards, panels |
| Text | `#F0F0F0` | Primary text |
| Muted | `#9CA3AF` | Secondary text |
| Border | `#3A3A3A` | Borders, dividers |

### Typography

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | Space Grotesk | sans-serif |
| Body | Inter | sans-serif |
| Code | Fira Code | monospace |

---

## Project Structure

```
smudothack-site/
├── .github/workflows/deploy.yaml    # CI/CD pipeline
├── archetypes/                      # hugo new templates
│   ├── events.md
│   └── projects.md
├── assets/
│   ├── css/main.css                 # Tailwind v4 entry + theme
│   ├── fonts/                       # Self-hosted WOFF2 fonts
│   └── js/
│       ├── landing/                 # Interactive panel scripts
│       │   ├── tabs.js
│       │   ├── terminal.js
│       │   ├── snake.js
│       │   ├── typing-test.js
│       │   └── matrix.js
│       └── events-filter.js
├── content/
│   ├── _index.md                    # Landing page metadata
│   ├── about/_index.md
│   ├── events/
│   │   ├── _index.md
│   │   └── <year>/                  # Year subdirectories (2025/, 2026/, ...)
│   │       ├── _index.md
│   │       └── *.md                 # Individual events
│   ├── community/_index.md
│   ├── projects/
│   │   ├── _index.md
│   │   └── *.md                     # Individual projects
│   ├── contact/_index.md
│   └── join/_index.md
├── data/
│   ├── teams/                       # Team members (per academic year)
│   │   ├── ay2025_2026.yaml
│   │   └── ay2024_2025.yaml
│   └── social.yaml                  # Social platform links
├── docs/                            # Contributor guides
│   ├── site-plan.md                 # This document
│   ├── adding-events.md
│   ├── adding-projects.md
│   ├── editing-members.md
│   ├── local-development.md
│   └── content-style-guide.md
├── static/
│   ├── CNAME
│   ├── images/logo/                 # SVG logos
│   ├── images/events/               # Event posters
│   ├── images/members/              # Profile photos
│   └── images/projects/             # Project screenshots
├── themes/dothack/                  # Custom theme
│   ├── layouts/
│   │   ├── _default/               # Base templates
│   │   ├── index.html              # Landing page
│   │   ├── events/                 # Event templates
│   │   ├── projects/               # Project templates
│   │   ├── about/                  # About template
│   │   ├── community/              # Community template
│   │   ├── contact/                # Contact template
│   │   ├── join/                   # Join Us template
│   │   ├── partials/               # Reusable components
│   │   └── shortcodes/             # Markdown shortcodes
│   └── theme.toml
├── hugo.toml                        # Main Hugo config
├── package.json                     # Tailwind CSS dependency
└── .gitignore
```

---

## Pages

### Landing Page (`/`)

**Above fold (full viewport height)**:
- **Left 3/4**: Hero section with club tagline + upcoming events preview
- **Right 1/4**: Tabbed interactive panel with 4 tabs:
  1. **Terminal** — Fake CLI simulator (type `help`, `about`, `events`, `join`)
  2. **Snake** — Retro Snake game with .Hack branding
  3. **Typing Test** — Code typing speed challenge
  4. **Matrix Rain** — Interactive falling-code animation

**Below fold (scroll down)**:
1. Upcoming events section
2. Featured projects showcase
3. Brief about section
4. "Join Us" call-to-action banner

**Mobile**: Stacks vertically — hero full-width, then interactive panel full-width below.

### Events (`/events/`)

- **Filter tabs**: All | Ongoing | Up Next | Planning | Done (client-side JS)
- **Grid of event cards**: poster thumbnail, title, date, status badge
- Each card links to its own event page with full details
- Events are organised into year subdirectories (`content/events/2026/`, etc.)

### About (`/about/`)

- Club description and mission statement
- Current team members grouped by department (name + bio)
- Link to Past Teams page

### Past Teams (`/about/past-teams/`)

- Filter tabs by academic year (client-side JS)
- Same department + member card layout as About page
- Automatically populated from `data/teams/` files excluding the current year

### Community (`/community/`)

- Social links hub (Discord, Telegram, GitHub, Instagram, etc.)
- Project showcase gallery from `content/projects/`

### Contact (`/contact/`)

- Contact info and social links

### Join Us (`/join/`)

- Membership info, benefits, and instructions
- CTA button linking to Telegram channel

---

## Content Types

### Events (`content/events/<year>/*.md`)

Each event is a markdown file in a year subdirectory with this front matter:

```yaml
---
title: "Intro to Git Workshop"
date: 2026-03-01
description: "Learn the basics of Git and GitHub"
status: "confirmed"        # planning | confirmed | done (ongoing/done auto-computed)
auto_status: true           # Auto-track ongoing/done from dates (default: true)
start_date: "2026-03-15"  # Event start date (empty = TBC)
end_date: ""               # End date for multi-day events (empty = single-day)
start_time: "7:00 PM"    # Start time (empty = TBC)
end_time: "9:00 PM"      # End time
all_day: false             # true = no time shown
location: "SMU SIS SR B1-1"
poster: "/images/events/git-workshop.jpg"
signup_url: "https://forms.gle/..."
resources_url: "https://drive.google.com/..."
tags: ["workshop", "git", "beginner"]
---

Event description in markdown...
```

To add an event: see [docs/adding-events.md](adding-events.md)

### Projects (`content/projects/*.md`)

```yaml
---
title: "Club Management Bot"
date: 2026-02-01
description: "Discord bot for club management"
screenshot: "/images/projects/bot.jpg"
repo_url: "https://github.com/smu-dothack/bot"
demo_url: "https://bot.dothack.club"
tech_stack: ["Python", "Discord.py"]
authors: ["John Doe"]
featured: true            # Show on landing page
---

Project description in markdown...
```

To add a project: see [docs/adding-projects.md](adding-projects.md)

### Members (`data/teams/*.yaml`)

Team members are stored in per-year YAML files. The current year is set via `currentTeamYear` in `hugo.toml`. Past years automatically appear on the Past Teams page.

```yaml
label: "AY2025-2026"
departments:
  - name: "Big 4"
    order: 1
    members:
      - name: "Member Name"
        bio: "Is the President and an Information Systems undergrad."

  - name: "Tech & Google Dev Group"
    order: 2
    members:
      - name: "Member Name"
        bio: "Is a Computer Science undergrad."
```

To edit members: see [docs/editing-members.md](editing-members.md)

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Custom theme** | No existing Hugo theme matches the dark hacker aesthetic + interactive panel + custom content types |
| **Members in per-year YAML** | No individual URLs needed; year transition is just adding a new file and updating a config param |
| **Events as markdown** | Each event gets its own URL, long-form content, PR-friendly workflow |
| **Vanilla JS** (not p5.js) | ~20KB total vs ~800KB; Canvas API is sufficient for all 4 features |
| **Tailwind v4** (not SCSS) | Contributors never touch CSS; theme maps cleanly to config |
| **Self-hosted fonts** | No Google Fonts dependency, no GDPR concerns |

---

## Deployment

### How It Works

1. Contributors create a branch, edit markdown/YAML files, open a PR
2. PR gets reviewed and merged to `main`
3. GitHub Actions automatically builds the Hugo site
4. Built site deploys to GitHub Pages
5. Custom domain serves the updated site with HTTPS

### Custom Domain Setup

1. `static/CNAME` contains the custom domain
2. DNS: CNAME record pointing to `smu-dothack.github.io`
3. GitHub Settings > Pages > Enforce HTTPS
4. `hugo.toml` baseURL matches the custom domain

### Cost

- GitHub Pages: **Free** (public repos)
- GitHub Actions: **Free** (2,000 min/month for private repos)
- HTTPS: **Free** (Let's Encrypt via GitHub)
- **Total: $0/month**

---

## Implementation Phases

### Phase 1: Foundation
- Hugo project initialization and configuration
- Custom theme skeleton (base template, header, footer)
- Tailwind CSS v4 setup with design tokens
- Self-hosted fonts
- Logo placement
- GitHub Actions CI/CD pipeline
- Minimal landing page for deployment verification

### Phase 2: Static Pages
- About page with member cards
- Contact page
- Join Us page
- Community page with social links hub

### Phase 3: Events System
- Event archetype and content type
- Events list page with category filter tabs
- Individual event page template
- Sample events

### Phase 4: Projects System
- Project archetype and content type
- Project cards on community page
- Sample projects

### Phase 5: Landing Page Interactive Panel
- Hero section with upcoming events
- Tabbed interactive panel (Terminal, Snake, Typing Test, Matrix Rain)
- Below-fold sections
- JS bundling via Hugo Pipes

### Phase 6: Polish & Documentation
- SEO meta tags (Open Graph, Twitter cards)
- Favicon set
- Responsive design testing
- Contributor guides in `docs/`
- PR template
- End-to-end contributor workflow test
