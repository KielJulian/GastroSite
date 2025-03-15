# Restaurant CMS Content Structure

This directory contains all the content for your restaurant website. Each folder represents a different content type.

## Content Types

### Team Members (`/team/*.md`)

Team member profiles for the staff page.

- Use the `_template.md` file as a guide for creating new team members
- Required fields: name, position (localized), bio (localized), image, order
- Images should be placed in `/public/images/team/`

### Menu Items (`/menu/items/*.md`)

Food and beverage items for the menu page.

- Use the `_template.md` file as a guide for creating new menu items
- Required fields: name (localized), description (localized), price, category, image, order
- Optional fields: tags
- Images should be placed in `/public/images/menu/`
- Categories are defined in `/menu/categories/{locale}.yaml`
- Tags are defined in `/menu/tags/{locale}.yaml`

### Menu Categories (`/menu/categories/*.yaml`)

Categories for organizing menu items (pizza, pasta, etc.)

- Defines the available categories for menu items
- Each category has: id, name, description, order

### Menu Tags (`/menu/tags/*.yaml`)

Tags for dietary preferences (vegetarian, gluten-free, etc.)

- Defines the available tags for menu items
- Each tag has: id, name, icon

### Lunch Menus (`/lunch-menus/*.md`)

Special lunch menus that change regularly.

- Each file represents a different lunch menu for a specific date
- Date format in filename: YYYY-MM-DD.md
- Contains the lunch menu items for that day

## Content Structure Guidelines

1. **File Naming**
   - Use kebab-case for filenames (example: `margherita-pizza.md`, `jane-doe.md`)
   - Use lowercase letters only
   - Separate words with hyphens

2. **Images**
   - All images should be placed in the `/public/images/` directory
   - Use the respective subdirectory for each content type (`/public/images/team/`, `/public/images/menu/`)
   - Recommended image formats: JPG, PNG
   - Keep file sizes reasonable (optimize images for web)

3. **Localization**
   - All user-facing text should be provided in both English and German
   - Use the localization format shown in the templates:
     ```yaml
     field_name:
       en: "English text"
       de: "German text"
     ```

4. **Ordering**
   - The `order` field determines the display order on the website
   - Lower numbers appear first
   - Make sure to properly manage order numbers when adding new content

5. **Templates**
   - Every content type has a `_template.md` file to guide you
   - Copy this file and rename it when creating new content
   - Follow the instructions and fill in all required fields