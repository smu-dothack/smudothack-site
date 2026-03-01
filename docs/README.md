# Contributor Docs

Guides for maintaining and updating the SMU .Hack website.

## I want to...

| Task | Guide |
|------|-------|
| Run the site locally | [local-development.md](local-development.md) |
| Add a new event | [adding-events.md](adding-events.md) |
| Add a project | [adding-projects.md](adding-projects.md) |
| Edit exco/member info | [editing-members.md](editing-members.md) |
| Check content guidelines | [content-style-guide.md](content-style-guide.md) |
| Understand the full site architecture | [site-plan.md](site-plan.md) |

## Quick Reference

### Where things live

```
content/events/*.md      → Event pages
content/projects/*.md    → Project pages
content/about/_index.md  → About page text
content/join/_index.md   → Join Us page text
content/contact/_index.md → Contact page text
content/community/_index.md → Community page text
data/members.yaml        → Exco member profiles
data/social.yaml         → Social media links
static/images/           → All images
hugo.toml                → Site configuration
```

### How to submit changes

1. Create a branch: `git checkout -b your-branch-name`
2. Make your changes
3. Commit: `git commit -m "describe your change"`
4. Push: `git push -u origin your-branch-name`
5. Open a pull request on GitHub

Or use the **GitHub web editor** (press `.` on the repo page) to edit files directly in your browser.
