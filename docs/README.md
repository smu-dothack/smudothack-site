# Contributor Docs

Guides for maintaining and updating the SMU .Hack website.

## Ops Structure

For any changes and discussions, first create an issue and then inform the tech department should it need to be acted on in a more timely manner. Make sure the issue contains all the info/changes that you want, including images if any.

For addition/updating of events/projects, after creation of the issue, you can either choose to create the PR yourself or have the tech department do it. Make sure to inform the tech exec assigned to your deparment.

If creating the PR yourself, make sure to obtain the relevant permissions from the tech department to have proper access.

Tech Exec Assignments:

| Department | Tech Exec |
| ---------- | --------- |
| Training         | |
| Cloud, Marketing | |
| PR, PD           | |

## Before You Start

Before making any changes, **create a GitHub issue** describing what you plan to do. This keeps the team informed and avoids duplicate work.

Use the appropriate label for your issue:

| Label | Use for |
|-------|---------|
| `update events` | Adding or editing events |
| `update projects` | Adding or editing projects |
| `update contents` | Editing members, page content, or other site updates |

## I want to...

| Task | Guide |
|------|-------|
| Run the site locally | [local-development.md](local-development.md) |
| Add a new event | [adding-events.md](adding-events.md) |
| Add a project | [adding-projects.md](adding-projects.md) |
| Edit team members | [editing-members.md](editing-members.md) |
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
data/teams/*.yaml        → Team member profiles (per academic year)
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
