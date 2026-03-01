# How to Edit Exco / Member Info

Member profiles are stored in a single file: `data/members.yaml`.

## File Structure

```yaml
exco:
  - name: "Full Name"
    role: "President"
    bio: "A short bio (1-2 sentences)."
    photo: "/images/members/name.jpg"
    github: "https://github.com/username"
    linkedin: "https://linkedin.com/in/username"
    order: 1

  - name: "Another Member"
    role: "Vice President"
    bio: "Short bio here."
    photo: "/images/members/another.jpg"
    github: ""
    linkedin: ""
    order: 2

alumni:
  - name: "Past Member"
    role: "President (2024-2025)"
    bio: ""
    photo: "/images/members/past.jpg"
    github: ""
    linkedin: ""
```

## Adding a New Member

1. Open `data/members.yaml`
2. Add a new entry under `exco:` (keep the indentation — 2 spaces)
3. Add their profile photo to `static/images/members/`
4. Submit a PR

### Profile Photo Guidelines

- Square aspect ratio (e.g., 400x400px)
- JPG or PNG, under 200KB
- Name the file consistently: `firstname-lastname.jpg`

## Updating a Member

Edit the relevant fields in `data/members.yaml`. Common updates:

- Change `role` after elections
- Update `bio`
- Add/update `github` or `linkedin` URLs

## Changing Display Order

Change the `order` field. Lower numbers appear first.

## Moving Members to Alumni

When exco members graduate or step down:

1. Cut their entry from the `exco:` section
2. Paste it under the `alumni:` section
3. Update their `role` to include the year (e.g., `"President (2024-2025)"`)
4. Remove the `order` field (alumni don't need ordering)

## YAML Syntax Tips

- Use **2 spaces** for indentation (not tabs)
- Strings with special characters need quotes: `"VP (Tech)"`
- Empty values: use `""` for empty strings
- Each member entry starts with `- name:`
- Make sure all entries are aligned at the same indentation level
