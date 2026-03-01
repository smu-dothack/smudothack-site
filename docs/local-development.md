# Local Development Guide

## Prerequisites

1. **Hugo** (extended version) — [Install Hugo](https://gohugo.io/installation/)
   - macOS: `brew install hugo`
   - Windows: `choco install hugo-extended`
   - Or download from [GitHub Releases](https://github.com/gohugoio/hugo/releases) (get the `extended` build)

2. **Node.js** (v18+) — [Install Node.js](https://nodejs.org/)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/smu-dothack/smudothack-site.git
cd smudothack-site

# Install dependencies (Tailwind CSS)
npm install

# Start the dev server
hugo server -D
```

Open **http://localhost:1313** in your browser.

## What `-D` Does

The `-D` flag includes draft content (pages with `draft: true` in their front matter). This lets you preview new content before publishing.

## Live Reload

Hugo automatically reloads the page when you save any file — content, templates, CSS, or TypeScript. No need to restart the server.

## Common Commands

| Command | What it does |
|---------|-------------|
| `hugo server -D` | Start dev server with drafts |
| `hugo server` | Start dev server without drafts |
| `hugo build` | Build the site to `public/` |
| `hugo new events/my-event.md` | Create a new event from the archetype |
| `hugo new projects/my-project.md` | Create a new project from the archetype |

## Troubleshooting

### `TAILWINDCSS: env: node: No such file or directory`

Hugo can't find Node.js. Make sure `node` is in your PATH:

```bash
node --version  # Should print v18+ or v22+
```

If using a version manager (nvm, fnm, Herd), ensure it's loaded in your terminal before running Hugo.

### `Error: module "dothack" not found`

Make sure you're in the repo root directory (where `hugo.toml` is).

### Port 1313 already in use

```bash
hugo server -D --port 1314
```
