import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export default defineEventHandler(async (event) => {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'menu', 'tags');
    const yamlFile = path.join(contentDir, 'tags.yaml');
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch (err) {
      console.error(`Tags directory does not exist: ${contentDir}`);
      // Return fallback tags
      return [
        { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
        { id: "vegan", name: "Vegan", icon: "plant" },
        { id: "spicy", name: "Spicy", icon: "fire" },
        { id: "gluten-free", name: "Gluten-Free", icon: "wheat-slash" }
      ];
    }
    
    // Try to read the YAML file
    try {
      const fileContent = await fs.readFile(yamlFile, 'utf-8');
      const data = yaml.load(fileContent) as any;
      
      if (data && Array.isArray(data.tags)) {
        // Map the tags to ensure each one has an id
        const tags = data.tags.map((tag: any, index: number) => {
          // If no id is provided, use the slugified name or a default
          if (!tag.id) {
            tag.id = tag.name 
              ? tag.name.toLowerCase().replace(/\s+/g, '-')
              : `tag-${index}`;
          }
          return tag;
        });
        
        return tags;
      }
    } catch (err) {
      console.error(`Error reading tags YAML: ${err}`);
    }
    
    // Fallback: Return hardcoded tags
    return [
      { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
      { id: "vegan", name: "Vegan", icon: "plant" },
      { id: "spicy", name: "Spicy", icon: "fire" },
      { id: "gluten-free", name: "Gluten-Free", icon: "wheat-slash" }
    ];
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    // Return fallback tags
    return [
      { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
      { id: "vegan", name: "Vegan", icon: "plant" },
      { id: "spicy", name: "Spicy", icon: "fire" },
      { id: "gluten-free", name: "Gluten-Free", icon: "wheat-slash" }
    ];
  }
}); 