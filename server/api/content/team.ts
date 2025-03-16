import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Team member data for fallback
const fallbackTeamMembers = [
  {
    id: 'chef',
    name: 'Chef Michael Brown',
    position: 'Head Chef',
    bio: 'With over 15 years of culinary experience, Chef Michael leads our kitchen with passion and creativity.',
    image: '/images/team/chef.jpg',
    order: 1
  },
  {
    id: 'sous-chef',
    name: 'Jane Doe',
    position: 'Sous Chef',
    bio: 'Jane brings international flavors to our kitchen with her extensive training in French and Italian cuisine.',
    image: '/images/team/sous-chef.jpg',
    order: 2
  },
  {
    id: 'pastry-chef',
    name: 'John Smith',
    position: 'Pastry Chef',
    bio: 'John creates dessert masterpieces that are as beautiful as they are delicious.',
    image: '/images/team/pastry-chef.jpg',
    order: 3
  }
];

export default defineEventHandler(async (event) => {
  try {
    // Log the current working directory for debugging
    const cwd = process.cwd();
    console.log('Current working directory:', cwd);
    
    const contentDir = path.join(cwd, 'content', 'team');
    console.log('Team content directory path:', contentDir);
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
      console.log('Team directory exists');
    } catch (err) {
      console.error('Team directory access error:', err);
      
      console.log('Returning fallback team members');
      return fallbackTeamMembers;
    }
    
    // Read all files in the directory
    const files = await fs.readdir(contentDir);
    console.log('Files in team directory:', files);
    
    // Filter for markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    console.log('Markdown files in team directory:', mdFiles);
    
    if (mdFiles.length === 0) {
      console.log('No team member files found, returning fallback data');
      return fallbackTeamMembers;
    }
    
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
    
    console.log(`Returning ${teamMembers.length} team members`);
    return teamMembers;
  } catch (error: any) {
    console.error('Error fetching team members:', error);
    
    // Return fallback data in case of error
    console.log('Returning fallback team members due to error');
    return fallbackTeamMembers;
  }
}); 