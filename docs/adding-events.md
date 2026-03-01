# How to Add a New Event

## Quick Steps

1. Create a new file in the correct year subdirectory (e.g., `content/events/2026/`)
2. Fill in the front matter
3. Write the event description in markdown
4. Add a poster image (optional)
5. Submit a pull request

## Step 1: Create the File

Events are organised by year. Place your event in the matching year folder.

### Option A: Using Hugo CLI (if running locally)

```bash
hugo new events/2026/my-event-name.md
```

This creates a file with the front matter pre-filled from the archetype.

### Option B: Manually

Create a new file at `content/events/2026/my-event-name.md`.

### Option C: GitHub Web Editor

1. Go to the repo on GitHub
2. Navigate to `content/events/2026/`
3. Click **Add file** > **Create new file**
4. Name it `my-event-name.md`

> **New year?** If the year folder doesn't exist yet, create `content/events/<year>/_index.md` with:
> ```yaml
> ---
> title: "Events <year>"
> ---
> ```

## Step 2: Fill in the Front Matter

Every event file starts with front matter (the section between `---` markers):

```yaml
---
title: "My Event Title"
date: 2026-03-01                    # When this page was created (for Hugo sorting)
draft: false                         # Set to true to hide from the site
description: "A short summary of the event for cards and SEO."
status: "planning"                   # Options: planning, confirmed, done (see below)
auto_status: true                    # Auto-track ongoing/done from dates (default: true)
start_date: "2026-04-15"            # Event start date (leave empty for TBC)
end_date: ""                         # End date for multi-day events (leave empty for single-day)
start_time: "7:00 PM"              # Start time (leave empty for TBC)
end_time: "9:00 PM"                # End time (leave empty if open-ended)
all_day: false                       # Set true for all-day events (hides time)
location: "SMU SIS SR B1-1"         # Venue
poster: "/images/events/my-event.jpg"  # Path to poster (optional)
signup_url: "https://forms.gle/..."  # Registration link (optional)
resources_url: ""                    # Link to slides/materials (optional)
tags: ["workshop", "python"]         # Tags for categorization
---
```

### Status Values

| Status | Displays as | When to use |
|--------|-------------|-------------|
| `planning` | Planning | Initial state, details still TBC |
| `confirmed` | Up Next | Date and details are finalised |
| `done` | Done | After the event ends (only needed if `auto_status: false`) |

### Auto Status Tracking

When `auto_status: true` (the default), you only need to set `planning` or `confirmed` in the markdown. The site automatically computes `ongoing` and `done` at runtime based on the event's dates and times — no rebuild or manual update needed.

- `planning` → stays as Planning (not auto-tracked)
- `confirmed` → auto-updates to Ongoing when the event starts, then Done when it ends

When `auto_status: false`, all status changes are manual. Use `planning`, `up-next`, `ongoing`, or `done` and update them yourself as the event progresses.

### Date & Time Examples

**Single-day event with set times:**
```yaml
start_date: "2026-03-15"
end_date: ""
start_time: "7:00 PM"
end_time: "9:00 PM"
all_day: false
```

**Multi-day event (e.g., hackathon):**
```yaml
start_date: "2026-04-05"
end_date: "2026-04-07"
start_time: "9:00 AM"
end_time: "9:00 AM"
all_day: false
```

**All-day event:**
```yaml
start_date: "2026-05-10"
end_date: ""
start_time: ""
end_time: ""
all_day: true
```

**Date TBC (no date known yet):**
```yaml
start_date: ""
end_date: ""
start_time: ""
end_time: ""
all_day: false
```

**Date known but time TBC:**
```yaml
start_date: "2026-06-20"
end_date: ""
start_time: ""
end_time: ""
all_day: false
```

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
git add content/events/2026/my-event-name.md
git add static/images/events/my-event.jpg  # if you added a poster
git commit -m "Add event: My Event Name"
git push -u origin add-event/my-event-name
```

Then open a pull request on GitHub.

## Directory Structure

```
content/events/
├── _index.md           # Events section index
├── 2025/
│   ├── _index.md       # 2025 year index
│   └── *.md            # 2025 events
├── 2026/
│   ├── _index.md       # 2026 year index
│   └── *.md            # 2026 events
└── ...
```

## Example

See any existing file in `content/events/2026/` for a complete example.
