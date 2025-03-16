/**
 * This API endpoint is for debugging content issues.
 * It directly checks the content directory structure and file existence.
 */
import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Use process.cwd() to get the current working directory
const projectRoot = path.resolve(process.cwd());
const contentDir = path.join(projectRoot, 'content');

console.log('Debug API initialized with:');
console.log('- Project root:', projectRoot);
console.log('- Content directory:', contentDir);

export default defineEventHandler(async () => {
  try {
    // Check if content directory exists
    const contentExists = fs.existsSync(contentDir);
    
    if (!contentExists) {
      return {
        success: false,
        error: 'Content directory does not exist',
        contentDirPath: contentDir
      };
    }
    
    // Get all directories and files
    const contentStructure: Record<string, any> = {};
    
    // Function to list files in a directory
    const listFiles = (dir: string, relativePath: string = ''): string[] => {
      if (!fs.existsSync(dir)) return [];
      
      try {
        const files = fs.readdirSync(dir);
        return files.map(file => {
          const filePath = path.join(dir, file);
          const relPath = path.join(relativePath, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            return `[DIR] ${relPath}/`;
          } else {
            return relPath;
          }
        });
      } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return [`Error reading: ${relativePath}`];
      }
    };
    
    // List main content directory
    contentStructure.rootFiles = listFiles(contentDir);
    
    // Check for menu directory specifically
    const menuDir = path.join(contentDir, 'menu');
    if (fs.existsSync(menuDir)) {
      contentStructure.menuFiles = listFiles(menuDir, 'menu');
      
      // Check for items directory
      const itemsDir = path.join(menuDir, 'items');
      if (fs.existsSync(itemsDir)) {
        contentStructure.menuItemsFiles = listFiles(itemsDir, 'menu/items');
        
        // Read a sample of menu items
        try {
          const menuItemFiles = fs.readdirSync(itemsDir)
            .filter(file => file.endsWith('.md'))
            .slice(0, 3); // Just grab the first few for sample
          
          const menuItemsSample: Array<{filename: string, content: string}> = [];
          
          for (const file of menuItemFiles) {
            const filePath = path.join(itemsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            menuItemsSample.push({
              filename: file,
              content: content.slice(0, 250) + '...' // Just show the first part
            });
          }
          
          contentStructure.menuItemsSample = menuItemsSample;
        } catch (err) {
          contentStructure.menuItemsError = `Error reading menu items: ${err instanceof Error ? err.message : String(err)}`;
        }
      }
      
      // Check for categories.yaml
      const categoriesFile = path.join(menuDir, 'categories', 'categories.yaml');
      if (fs.existsSync(categoriesFile)) {
        try {
          const content = fs.readFileSync(categoriesFile, 'utf-8');
          contentStructure.categoriesFile = {
            exists: true,
            path: path.relative(projectRoot, categoriesFile),
            content: content.slice(0, 250) + (content.length > 250 ? '...' : '')
          };
        } catch (err) {
          contentStructure.categoriesFile = {
            exists: true,
            path: path.relative(projectRoot, categoriesFile),
            error: `Error reading file: ${err instanceof Error ? err.message : String(err)}`
          };
        }
      } else {
        contentStructure.categoriesFile = {
          exists: false,
          expectedPath: path.relative(projectRoot, categoriesFile)
        };
      }
      
      // Check for tags.yaml
      const tagsFile = path.join(menuDir, 'tags', 'tags.yaml');
      if (fs.existsSync(tagsFile)) {
        try {
          const content = fs.readFileSync(tagsFile, 'utf-8');
          contentStructure.tagsFile = {
            exists: true,
            path: path.relative(projectRoot, tagsFile),
            content: content.slice(0, 250) + (content.length > 250 ? '...' : '')
          };
        } catch (err) {
          contentStructure.tagsFile = {
            exists: true,
            path: path.relative(projectRoot, tagsFile),
            error: `Error reading file: ${err instanceof Error ? err.message : String(err)}`
          };
        }
      } else {
        contentStructure.tagsFile = {
          exists: false,
          expectedPath: path.relative(projectRoot, tagsFile)
        };
      }
    }
    
    return {
      success: true,
      message: 'Content directory exists and was scanned',
      contentDirPath: contentDir,
      contentStructure
    };
  } catch (err) {
    console.error('Error checking content directory:', err);
    return {
      success: false,
      error: `Error checking content directory: ${err instanceof Error ? err.message : String(err)}`,
      contentDirPath: contentDir
    };
  }
}); 