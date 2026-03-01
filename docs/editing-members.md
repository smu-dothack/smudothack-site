# How to Edit Team Members

Team members are stored in per-year YAML files under `data/teams/`. The current team year is set in `hugo.toml` via the `currentTeamYear` param.

## File Structure

Each academic year has its own file (e.g., `data/teams/ay2025_2026.yaml`):

```yaml
label: "AY2025-2026"
departments:
  - name: "Big 4"
    order: 1
    members:
      - name: "Full Name"
        bio: "Is the President and an Information Systems undergrad."

      - name: "Another Member"
        bio: "Is the Vice President and a Software Engineering undergrad."

  - name: "Tech & Google Dev Group"
    order: 2
    members:
      - name: "Member Name"
        bio: "Is a Computer Science undergrad."
```

## Adding a New Member

1. Open the current team file (check `hugo.toml` for `currentTeamYear` to find which file)
2. Find the correct department
3. Add a new entry under `members:` (keep the indentation — 2 spaces)
4. Submit a PR

## Updating a Member

Edit the relevant fields (`name`, `bio`) in the appropriate year file.

## Changing Department Order

Change the `order` field on the department. Lower numbers appear first.

## Transitioning to a New Academic Year

1. Create a new file: `data/teams/ay20XX_20YY.yaml` with the new team
2. Update `hugo.toml`: change `currentTeamYear` to match the new filename (without `.yaml`)
3. Done — the previous year's file automatically appears on the Past Teams page

## YAML Syntax Tips

- Use **2 spaces** for indentation (not tabs)
- Strings with special characters need quotes: `"Tech & Google Dev Group"`
- Each member entry starts with `- name:`
- Make sure all entries are aligned at the same indentation level
