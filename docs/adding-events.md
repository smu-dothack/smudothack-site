# How to Add a New Event

## Quick Steps

1. Create a new file in `content/events/`
2. Fill in the front matter
3. Write the event description in markdown
4. Add a poster image (optional)
5. Submit a pull request

## Step 1: Create the File

### Option A: Using Hugo CLI (if running locally)

```bash
hugo new events/2026-my-event-name.md
```

This creates a file with the front matter pre-filled from the archetype.

### Option B: Manually

Create a new file at `content/events/2026-my-event-name.md`.

### Option C: GitHub Web Editor

1. Go to the repo on GitHub
2. Navigate to `content/events/`
3. Click **Add file** > **Create new file**
4. Name it `2026-my-event-name.md`

## Step 2: Fill in the Front Matter

Every event file starts with front matter (the section between `---` markers):

```yaml
---
title: "My Event Title"
date: 2026-03-01                    # When this page was created
draft: false                         # Set to true to hide from the site
description: "A short summary of the event for cards and SEO."
status: "planning"                   # Options: planning, up-next, done
event_date: "2026-04-15"            # The actual event date
event_time: "7:00 PM - 9:00 PM"    # Event time
location: "SMU SIS SR B1-1"         # Venue
poster: "/images/events/my-event.jpg"  # Path to poster (optional)
signup_url: "https://forms.gle/..."  # Registration link (optional)
resources_url: ""                    # Link to slides/materials (optional)
tags: ["workshop", "python"]         # Tags for categorization
---
```

### Status Values

| Status | Meaning | Shows under |
|--------|---------|-------------|
| `planning` | Event is being planned, details may change | Planning tab |
| `up-next` | Confirmed and coming soon | Up Next tab |
| `done` | Event has happened | Done tab |

Update the status as the event progresses: `planning` → `up-next` → `done`.

## Step 3: Write the Description

Below the front matter, write the event description in markdown:

```markdown
A hands-on workshop covering the basics of Python.

## What You'll Learn

- Variables and data types
- Functions and loops
- Working with files

## Prerequisites

- A laptop with Python installed
- No prior experience needed
```

## Step 4: Add a Poster Image (Optional)

1. Add your poster image to `static/images/events/`
   - Recommended: JPG or PNG, under 500KB
   - Recommended dimensions: 1200x630px (or 16:9 ratio)
2. Set the `poster` field: `poster: "/images/events/my-event.jpg"`

## Step 5: Submit a PR

```bash
git checkout -b add-event/my-event-name
git add content/events/2026-my-event-name.md
git add static/images/events/my-event.jpg  # if you added a poster
git commit -m "Add event: My Event Name"
git push -u origin add-event/my-event-name
```

Then open a pull request on GitHub.

## Example

See any existing file in `content/events/` for a complete example.
