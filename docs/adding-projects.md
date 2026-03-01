# How to Add a Project

## Quick Steps

1. Create a new file in `content/projects/`
2. Fill in the front matter
3. Write the project description
4. Add a screenshot (optional)
5. Submit a pull request

## Step 1: Create the File

### Option A: Using Hugo CLI

```bash
hugo new projects/my-project-name.md
```

### Option B: Manually or via GitHub

Create `content/projects/my-project-name.md`.

## Step 2: Fill in the Front Matter

```yaml
---
title: "My Project Name"
date: 2026-03-01
draft: false
description: "A one-line description of what the project does."
screenshot: "/images/projects/my-project.jpg"  # Optional
repo_url: "https://github.com/smu-dothack/my-project"
demo_url: "https://my-project.example.com"      # Optional
tech_stack: ["Python", "Flask", "PostgreSQL"]
authors: ["Your Name", "Partner Name"]
featured: false                                   # Set true to show on landing page
---
```

### Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Project name |
| `description` | Yes | Short summary for cards |
| `repo_url` | Yes | GitHub repository link |
| `tech_stack` | Yes | List of technologies used |
| `authors` | Yes | List of contributors |
| `screenshot` | No | Path to screenshot image |
| `demo_url` | No | Link to live demo |
| `featured` | No | Show on landing page (default: false) |

## Step 3: Write the Description

```markdown
A brief description of what the project does and why it exists.

## Features

- Feature one
- Feature two
- Feature three

## How It Works

Explain the architecture or how to use it.
```

## Step 4: Add a Screenshot (Optional)

1. Add the image to `static/images/projects/`
   - Recommended: JPG or PNG, under 500KB
   - Recommended: 16:9 ratio (e.g., 1280x720)
2. Set `screenshot: "/images/projects/my-project.jpg"`

## Step 5: Submit a PR

```bash
git checkout -b add-project/my-project-name
git add content/projects/my-project-name.md
git add static/images/projects/my-project.jpg  # if applicable
git commit -m "Add project: My Project Name"
git push -u origin add-project/my-project-name
```

Then open a pull request on GitHub.

## Making a Project Featured

Set `featured: true` in the front matter. Featured projects appear on the landing page. Limit to 3 featured projects at a time to keep the landing page clean.
