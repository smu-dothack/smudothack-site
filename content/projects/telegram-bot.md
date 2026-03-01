---
title: "Attendance Telegram Bot (test)"
date: 2026-01-15
draft: false
description: "A Telegram bot that tracks event attendance and sends reminders to club members."
screenshot: ""
repo_url: "https://github.com/smu-dothack/attendance-bot"
demo_url: ""
tech_stack: ["Python", "python-telegram-bot", "SQLite"]
authors: ["Jane Doe", "John Smith"]
featured: true
---

A Telegram bot built to streamline event attendance tracking for .Hack.

## Features

- `/register` — Members register with their student ID
- `/checkin <event>` — Check in to an event via QR code or command
- `/stats` — View personal attendance history
- Automatic event reminders 24 hours before
- Admin dashboard for exco to view attendance reports

## How It Works

The bot runs on a simple Python backend with a SQLite database. It uses the `python-telegram-bot` library to interface with the Telegram API. Event data is synced from our Google Calendar.
