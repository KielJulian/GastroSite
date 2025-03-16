/**
 * This custom API endpoint for content handles requests when the default
 * Nuxt Content API is not working properly. It reads content directly from 
 * the file system and returns it as JSON.
 */
import { defineEventHandler, getRouterParam } from 'h3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define types for better TypeScript support
interface Frontmatter {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  image?: string;
  order?: number;
  [key: string]: any;
}

// Get the project root directory - use absolute approach
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Use process.cwd() for the most reliable path to project root
const projectRoot = process.cwd();
const contentDir = path.join(projectRoot, 'content');

console.log('Content API initialized with:');
console.log('- __dirname:', __dirname);
console.log('- Project root (cwd):', projectRoot);
console.log('- Content directory:', contentDir);
console.log('- Content exists:', fs.existsSync(contentDir));

// List content directory if it exists
if (fs.existsSync(contentDir)) {
  try {
    const contentItems = fs.readdirSync(contentDir);
    console.log('- Content items:', contentItems);
  } catch (err) {
    console.error('- Error listing content directory:', err);
  }
}

export default defineEventHandler(async (event) => {
  try {
    // Get the path parameter from the route
    const routePath = getRouterParam(event, 'path') || '';
    
    // Join with content directory to get full path
    const fullPath = path.join(contentDir, ...routePath.split('/'));
    
    console.log(`Accessing content at: ${fullPath}`);
    console.log(`Path exists: ${fs.existsSync(fullPath)}`);
    
    // Check if path exists
    if (!fs.existsSync(fullPath)) {
      return {
        success: false,
        message: 'Content path not found',
        path: routePath,
        fullPath,
        contentDir,
        projectRoot
      };
    }
    
    // Check if it's a directory or file
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Special handling for specific directories
      if (routePath === 'menu/categories') {
        // Look for categories.yaml file
        const categoriesPath = path.join(fullPath, 'categories.yaml');
        if (fs.existsSync(categoriesPath)) {
          const content = fs.readFileSync(categoriesPath, 'utf-8');
          return parseYamlContent(content);
        }
      } else if (routePath === 'menu/tags') {
        // Look for tags.yaml file
        const tagsPath = path.join(fullPath, 'tags.yaml');
        if (fs.existsSync(tagsPath)) {
          const content = fs.readFileSync(tagsPath, 'utf-8');
          return parseYamlContent(content);
        }
      } else if (routePath === 'team') {
        // For team members directory
        return handleTeamMembers(fullPath);
      } else {
        // For regular directories, list markdown files
        const files = fs.readdirSync(fullPath);
        // Filter out template files and only include markdown
        const markdownFiles = files.filter(file => 
          file.endsWith('.md') && 
          !file.startsWith('_')
        );
        
        if (markdownFiles.length === 0) {
          return [];
        }
        
        // Parse each markdown file
        const contents = markdownFiles.map(file => {
          try {
            const filePath = path.join(fullPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = parseMarkdownContent(content);
            
            // Add filename (without extension) as the ID if not provided
            if (!parsed.id) {
              parsed.id = path.basename(file, '.md');
            }
            
            return parsed;
          } catch (error) {
            console.error(`Error parsing file ${file}:`, error);
            return null;
          }
        }).filter(item => item !== null);
        
        return contents;
      }
    } else {
      // It's a file
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Handle based on file extension
      if (fullPath.endsWith('.md')) {
        return parseMarkdownContent(content);
      } else if (fullPath.endsWith('.yaml') || fullPath.endsWith('.yml')) {
        return parseYamlContent(content);
      } else {
        return { content };
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error in content API:', error);
    return {
      success: false,
      message: 'Error processing content',
      error: error instanceof Error ? error.message : String(error)
    };
  }
});

// Process team member files
function handleTeamMembers(dirPath: string): any[] {
  try {
    const files = fs.readdirSync(dirPath);
    const memberFiles = files.filter(file => 
      file.endsWith('.md') && 
      !file.startsWith('_')
    );
    
    console.log(`Found ${memberFiles.length} team member files`);
    
    const members = memberFiles.map(file => {
      try {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = parseMarkdownContent(content);
        
        // Add filename (without extension) as the ID if not provided
        if (!parsed.id) {
          parsed.id = path.basename(file, '.md');
        }
        
        return parsed;
      } catch (error) {
        console.error(`Error parsing team member file ${file}:`, error);
        return null;
      }
    }).filter(member => member !== null);
    
    // Sort by order if available
    return members.sort((a, b) => 
      (a.order || Number.MAX_SAFE_INTEGER) - (b.order || Number.MAX_SAFE_INTEGER)
    );
  } catch (error) {
    console.error('Error processing team members:', error);
    return [];
  }
}

// Simple function to parse frontmatter from markdown
function parseMarkdownContent(content: string): Frontmatter {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatterStr = match[1];
  const frontmatter: Frontmatter = {};
  
  // Very simple YAML parser for frontmatter
  frontmatterStr.split('\n').forEach(line => {
    // Skip comment lines and empty lines
    if (line.trim().startsWith('#') || line.trim() === '') {
      return;
    }
    
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Clean up the value - remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (like tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Simple parsing of array values
          value = value.slice(1, -1);
          // Process each item to remove quotes
          const items = value ? value.split(',').map(v => {
            const item = v.trim();
            return item.startsWith('"') && item.endsWith('"') 
              ? item.slice(1, -1) 
              : item;
          }) : [];
          frontmatter[key] = items;
        } catch (e) {
          frontmatter[key] = [];
        }
      } 
      // Handle numbers
      else if (!isNaN(Number(value)) && value !== '') {
        frontmatter[key] = Number(value);
      } 
      // Handle booleans
      else if (value === 'true') {
        frontmatter[key] = true;
      } 
      else if (value === 'false') {
        frontmatter[key] = false;
      } 
      // Handle empty tags that should be arrays
      else if (key === 'tags' && (value === '' || !value)) {
        frontmatter[key] = [];
      }
      // Default to string
      else {
        frontmatter[key] = value;
      }
    }
  });
  
  return frontmatter;
}

// Simple YAML parser for categories and tags
function parseYamlContent(content: string): any[] {
  // For categories.yaml
  if (content.includes('categories:')) {
    const categoriesMatch = content.match(/categories:([\s\S]*?)(?:\n\w|$)/s);
    if (categoriesMatch) {
      const categoriesSection = categoriesMatch[1];
      const categories: any[] = [];
      
      let currentCategory: Record<string, any> = {};
      let inCategory = false;
      
      categoriesSection.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('-')) {
          // Start of a new category
          if (inCategory && Object.keys(currentCategory).length > 0) {
            categories.push(currentCategory);
          }
          
          currentCategory = {};
          inCategory = true;
        } else if (trimmedLine.includes(':') && inCategory) {
          const [key, value] = trimmedLine.split(':', 2);
          const trimmedKey = key.trim();
          const trimmedValue = value.trim();
          
          if (trimmedKey && trimmedValue) {
            if (!isNaN(Number(trimmedValue))) {
              currentCategory[trimmedKey] = Number(trimmedValue);
            } else {
              // Clean up quotes from values
              let cleanValue = trimmedValue;
              if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
                cleanValue = cleanValue.slice(1, -1);
              }
              currentCategory[trimmedKey] = cleanValue;
            }
          }
        }
      });
      
      // Don't forget the last category
      if (inCategory && Object.keys(currentCategory).length > 0) {
        categories.push(currentCategory);
      }
      
      console.log('Parsed categories:', categories);
      return [{ categories }];
    }
  }
  
  // For tags.yaml
  if (content.includes('tags:')) {
    const tagsMatch = content.match(/tags:([\s\S]*?)(?:\n\w|$)/s);
    if (tagsMatch) {
      const tagsSection = tagsMatch[1];
      const tags: any[] = [];
      
      let currentTag: Record<string, any> = {};
      let inTag = false;
      
      tagsSection.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('-')) {
          // Start of a new tag
          if (inTag && Object.keys(currentTag).length > 0) {
            tags.push(currentTag);
          }
          
          currentTag = {};
          inTag = true;
        } else if (trimmedLine.includes(':') && inTag) {
          const [key, value] = trimmedLine.split(':', 2);
          const trimmedKey = key.trim();
          const trimmedValue = value.trim();
          
          if (trimmedKey && trimmedValue) {
            // Clean up quotes from values
            let cleanValue = trimmedValue;
            if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
              cleanValue = cleanValue.slice(1, -1);
            }
            currentTag[trimmedKey] = cleanValue;
          }
        }
      });
      
      // Don't forget the last tag
      if (inTag && Object.keys(currentTag).length > 0) {
        tags.push(currentTag);
      }
      
      console.log('Parsed tags:', tags);
      return [{ tags }];
    }
  }
  
  return [];
} 