# SMU .Hack Website

The official website for SMU .Hack — Singapore Management University's tech club.

**Built with**: Hugo, Tailwind CSS v4, TypeScript
**Deployed on**: GitHub Pages via GitHub Actions

## Quick Start

```bash
# Prerequisites: Hugo (extended) + Node.js 18+
npm install
hugo server -D
```

Open http://localhost:1313

## Contributing

See the [contributor docs](docs/README.md) for guides on:

- [Adding events](docs/adding-events.md)
- [Adding projects](docs/adding-projects.md)
- [Editing members](docs/editing-members.md)
- [Content style guide](docs/content-style-guide.md)

## Project Structure

```
content/          Markdown content (events, projects, pages)
data/             YAML data files (members, social links)
static/images/    Images (logos, posters, photos, screenshots)
themes/dothack/   Custom Hugo theme (layouts, partials)
assets/css/       Tailwind CSS
assets/js/        TypeScript source
docs/             Contributor documentation
```

## Deployment

Pushing to `main` triggers an automatic build and deploy via GitHub Actions. PRs run a build check before merge.
