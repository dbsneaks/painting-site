# CMS Integration Retrospective

## What Happened
We attempted to add Decap CMS to manage paintings after the site was already built with a JavaScript data file (paintings.js).

## The Problem
- Decap CMS (and most CMSs) expect structured data formats: JSON, YAML, or Markdown
- Our paintings.js is a JavaScript file with a const declaration
- This mismatch meant the CMS couldn't read our existing data

## What We Should Have Planned Upfront
1. **Data architecture**: If a CMS might be added later, use JSON from the start
2. **Authentication strategy**: Research OAuth requirements before committing to a CMS
3. **CMS compatibility**: Check if the CMS can work with our chosen stack (Vercel, static site, etc.)

## Options Going Forward
1. Convert paintings.js → paintings.json and update site code
2. Build a custom admin tool that works with paintings.js
3. Accept manual editing of paintings.js (simplest, what we started with)

## Decision Template for Future Projects
Before starting:
- [ ] Will this need a CMS eventually?
- [ ] What data format supports both manual editing AND CMS integration?
- [ ] What's the authentication strategy?
- [ ] Does the hosting platform support the chosen CMS?
- [ ] Can we start with the CMS-compatible approach even if we're editing manually at first?

## Lesson Learned
Start with the end state in mind, even if you're building incrementally. A JSON file is just as easy to edit manually as a JS file, but has more future flexibility.
