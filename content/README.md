# Content Management for GastroSite

## Description

This directory contains the CMS content for the GastroSite website. It's structured to be used with Nuxt Content and Nuxt Studio, which allows you to edit content via the CMS and see it reflected on the site.

## Current Status

Currently, there are some issues with the integration between the Nuxt Content module and the site components. As a temporary workaround, some pages have been updated to use hardcoded data while we address these issues.

## Integration Plan

To fix the CMS integration issues:

1. Update the Nuxt Content configuration:
   - Make sure your `nuxt.config.ts` has a proper Content configuration
   - Ensure you're using a compatible version of Nuxt and Nuxt Content

2. Fix content paths and API:
   - The content structure is correct, but the way we're accessing content needs to be updated
   - Use the correct Nuxt Content API to fetch items from the CMS

3. Update components to properly handle loading states and null data

## Content Structure

- `/team/` - Contains team member profiles
- `/menu/categories/` - Menu categories
- `/menu/tags/` - Menu item tags
- `/menu/items/` - Individual menu items
- `/lunch-menus/` - Weekly lunch menus

## File Format

Content files are written in Markdown or YAML, with YAML frontmatter for metadata:

```md
---
name: John Smith
position: Chef
---

This is the content body (only for markdown files).
```

## Templates

Each content type has a `_template.md` file that shows the required fields for that content type.