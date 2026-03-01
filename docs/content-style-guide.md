# Content Style Guide

Guidelines for writing content on the .Hack website.

## Markdown Basics

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
`inline code`

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

![Alt text](/images/example.jpg)
```

## Writing Tone

- **Casual but professional** — we're a student club, not a corporation
- **Inclusive** — "No experience required" > "For beginners only"
- **Action-oriented** — "Build your first app" > "Learn about app development"
- **Concise** — get to the point quickly

## Event Descriptions

- Start with a one-line summary of what the event is
- Use `## What You'll Learn` for workshop topics
- Use `## Prerequisites` to list requirements
- Include a schedule table for longer events
- Keep descriptions under 300 words

## Project Descriptions

- Start with what the project does (1-2 sentences)
- Use `## Features` for a bullet list of capabilities
- Use `## How It Works` for technical explanation
- Mention how others can contribute if applicable

## Image Guidelines

| Type | Dimensions | Max Size | Format |
|------|-----------|----------|--------|
| Event poster | 1200x630px (16:9) | 500KB | JPG/PNG |
| Project screenshot | 1280x720px (16:9) | 500KB | JPG/PNG |
| Member photo | 400x400px (1:1) | 200KB | JPG/PNG |

### Naming Convention

```
static/images/events/2026-event-name.jpg
static/images/projects/project-name.jpg
static/images/members/firstname-lastname.jpg
```

Use lowercase, hyphens instead of spaces, no special characters.

## Front Matter

- Always fill in `title` and `description` — they're used for SEO and card previews
- Keep `description` under 160 characters
- Use lowercase for `tags`: `["workshop", "python"]` not `["Workshop", "Python"]`
- Set `draft: true` while working on content, change to `false` when ready
