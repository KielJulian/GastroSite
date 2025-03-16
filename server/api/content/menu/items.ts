import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'menu', 'items');
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch (err) {
      return {
        error: `Menu items directory does not exist: ${contentDir}`,
        items: []
      };
    }
    
    // Read all files in the directory
    const files = await fs.readdir(contentDir);
    
    // Filter for markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    // Parse each file and extract frontmatter
    const menuItems = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(content);
        
        // Create a unique ID from the filename (without extension)
        const id = file.replace(/\.md$/, '');
        
        // Return the menu item with id and frontmatter data
        return {
          id,
          name: data.name || '',
          description: data.description || '',
          price: Number(data.price) || 0,
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
          image: data.image || '',
          order: Number(data.order) || 999
        };
      })
    );
    
    // Sort by order property
    menuItems.sort((a, b) => {
      return (a.order || 999) - (b.order || 999);
    });
    
    return menuItems;
  } catch (error: any) {
    console.error('Error fetching menu items:', error);
    return {
      error: `Failed to fetch menu items: ${error.message}`,
      items: []
    };
  }
}); 