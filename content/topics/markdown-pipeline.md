---
title: Markdown Pipeline
intro: Notes about how markdown moves from source files into hydrated static pages.
---

# Markdown Pipeline

The site reads markdown from the root-level `content` folder during Vite builds.

Each document keeps its writing format small and portable, while React handles navigation, page framing, and hydration.
