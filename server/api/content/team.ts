import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'team');
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch (err) {
      return {
        error: `Team directory does not exist: ${contentDir}`,
        teamMembers: []
      };
    }
    
    // Read all files in the directory
    const files = await fs.readdir(contentDir);
    
    // Filter for markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    // Parse each file and extract frontmatter
    const teamMembers = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(content);
        
        // Create a unique ID from the filename (without extension)
        const id = file.replace(/\.md$/, '');
        
        // Return the team member with id and frontmatter data
        return {
          id,
          ...data,
          // Ensure order is a number (default to 999 if not specified)
          order: typeof data.order === 'number' ? data.order : 999
        };
      })
    );
    
    // Sort by order property
    teamMembers.sort((a, b) => {
      return (a.order || 999) - (b.order || 999);
    });
    
    return teamMembers;
  } catch (error: any) {
    console.error('Error fetching team members:', error);
    return {
      error: `Failed to fetch team members: ${error.message}`,
      teamMembers: []
    };
  }
}); 