# GastroSite - Multilingual Restaurant Website

A Nuxt 3 restaurant website with multilingual support and content management capabilities.

## Features

- Multilingual support (English and German)
- Content management via Nuxt Content and Nuxt Studio
- Responsive, mobile-first design
- Menu management with categories and tags
- Weekly lunch specials
- Team member profiles
- Reservation form

## Technology Stack

- [Nuxt 3](https://nuxt.com/) - Vue-based framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Nuxt Content](https://content.nuxtjs.org/) - Git-based CMS
- [Nuxt i18n](https://i18n.nuxtjs.org/) - Internationalization
- [Nuxt Studio](https://nuxt.studio/) - Visual content editing

## Setup

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gastro-site.git
   cd gastro-site
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
   
3. Edit the `.env` file and add your actual credentials and API keys. This file is gitignored and will not be committed to the repository.

4. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Security Notes

- **IMPORTANT**: Never commit `.env` files with real credentials to the repository
- All authentication details, API keys, and database credentials should only exist in your local `.env` file
- The `robots.txt` file is configured to prevent search engines from indexing the site during development
- For production deployment, update the `robots.txt` file to allow indexing

### Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Content Management

### Content Structure

The website content is organized as follows:

- **Menu Items**: `/content/menu/items/[item-slug].md`
- **Menu Categories**: `/content/menu/categories/[locale].yaml`
- **Menu Tags**: `/content/menu/tags/[locale].yaml`
- **Lunch Menus**: `/content/lunch-menus/[yyyy-mm-dd].md`
- **Team Members**: `/content/team/[member-slug].md`

### Using Nuxt Studio

Nuxt Studio provides a visual interface for managing content:

1. Access the Nuxt Studio dashboard (URL provided during setup)
2. Navigate to the content section you want to edit
3. Make changes using the visual editor
4. Save your changes, which will be committed to your repository

### Adding Menu Items

1. In Nuxt Studio, go to "Menu" > "Menu Items"
2. Click "Add new"
3. Fill in the required fields in both languages
4. Select a category and any applicable tags
5. Set the display order
6. Upload an image
7. Click "Save"

### Managing Menu Categories

1. In Nuxt Studio, go to "Menu" > "Categories"
2. Edit the existing categories or add new ones
3. Drag and drop to change the order

### Creating Weekly Lunch Menus

1. In Nuxt Studio, go to "Lunch Menus"
2. Click "Add new"
3. Set the start and end dates for the week
4. Add a title in both languages
5. Add menu items for each day of the week
6. Click "Save"

### Adding Team Members

1. In Nuxt Studio, go to "Team"
2. Click "Add new"
3. Fill in the name, position, and bio in both languages
4. Upload a profile image
5. Set the display order
6. Click "Save"

## Project Structure

- `/assets`: CSS, fonts, and images
- `/components`: Vue components
- `/composables`: Reusable composition functions
- `/content`: CMS content files
- `/layouts`: Page layouts
- `/locales`: Translation files
- `/pages`: Application pages
- `/public`: Static files
- `/.studio`: Nuxt Studio configuration

## Development

### Adding a New Language

1. Add the new locale in `nuxt.config.ts`:
   ```typescript
   i18n: {
     locales: [
       // existing locales
       {
         code: 'fr',
         iso: 'fr-FR',
         name: 'Français'
       }
     ]
   }
   ```

2. Create a new translation file in `/locales/fr.json`

3. Create locale-specific content files:
   - `/content/menu/categories/fr.yaml`
   - `/content/menu/tags/fr.yaml`

4. Update the Nuxt Studio configuration to support the new language

### Creating a New Component

1. Create the component file in `/components/`
2. Use TypeScript for prop definitions
3. Follow the established design patterns
4. Import and use the component where needed

## License

[MIT License](LICENSE)

## Contact

For questions or support, contact [your-email@example.com](mailto:your-email@example.com)