import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'lunch-menus');
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch (err) {
      return {
        error: `Lunch menus directory does not exist: ${contentDir}`,
        lunchMenus: []
      };
    }
    
    // Read all files in the directory
    const files = await fs.readdir(contentDir);
    
    // Filter for markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
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
    
    return lunchMenus;
  } catch (error: any) {
    console.error('Error fetching lunch menus:', error);
    return {
      error: `Failed to fetch lunch menus: ${error.message}`,
      lunchMenus: []
    };
  }
}); 