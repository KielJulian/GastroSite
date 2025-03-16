import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Fallback lunch menu data
const fallbackLunchMenus = [
  {
    id: 'current-week',
    title: 'Current Week Lunch Menu',
    startDate: '2025-03-11',
    endDate: '2025-03-15',
    items: [
      {
        day: 'Monday',
        name: 'Grilled Salmon',
        description: 'Served with roasted vegetables and quinoa',
        price: 14.95,
        order: 1
      },
      {
        day: 'Tuesday',
        name: 'Chicken Parmesan',
        description: 'With fresh pasta and tomato sauce',
        price: 12.95,
        order: 1
      },
      {
        day: 'Wednesday',
        name: 'Vegetable Curry',
        description: 'Served with basmati rice and naan bread',
        price: 11.95,
        order: 1
      },
      {
        day: 'Thursday',
        name: 'Beef Stroganoff',
        description: 'With egg noodles and seasonal vegetables',
        price: 13.95,
        order: 1
      },
      {
        day: 'Friday',
        name: 'Fish Tacos',
        description: 'With avocado, salsa, and cilantro-lime rice',
        price: 12.95,
        order: 1
      }
    ]
  }
];

export default defineEventHandler(async (event) => {
  try {
    // Log the current working directory for debugging
    const cwd = process.cwd();
    console.log('Current working directory:', cwd);
    
    const contentDir = path.join(cwd, 'content', 'lunch-menus');
    console.log('Lunch menus content directory path:', contentDir);
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
      console.log('Lunch menus directory exists');
    } catch (err) {
      console.error('Lunch menus directory access error:', err);
      console.log('Returning fallback lunch menus');
      return fallbackLunchMenus;
    }
    
    // Read all files in the directory
    const files = await fs.readdir(contentDir);
    console.log('Files in lunch-menus directory:', files);
    
    // Filter for markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    console.log('Markdown files in lunch-menus directory:', mdFiles);
    
    if (mdFiles.length === 0) {
      console.log('No lunch menu files found, returning fallback data');
      return fallbackLunchMenus;
    }
    
    // Parse each file and extract frontmatter and content
    const lunchMenus = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);
        
        // Create a unique ID from the filename (without extension)
        const id = file.replace(/\.md$/, '');
        
        // Parse items from the markdown content if they exist in frontmatter
        let items = [];
        if (Array.isArray(data.items)) {
          items = data.items;
        }
        
        // Return the lunch menu with id, frontmatter data, and items
        return {
          id,
          title: data.title || 'Lunch Menu',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          items: items
        };
      })
    );
    
    // Sort by start date (newest first)
    lunchMenus.sort((a, b) => {
      const dateA = new Date(a.startDate || '1970-01-01');
      const dateB = new Date(b.startDate || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log(`Returning ${lunchMenus.length} lunch menus`);
    return lunchMenus;
  } catch (error: any) {
    console.error('Error fetching lunch menus:', error);
    console.log('Returning fallback lunch menus due to error');
    return fallbackLunchMenus;
  }
}); 