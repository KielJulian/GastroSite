import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export default defineEventHandler(async (event) => {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'menu', 'categories');
    const yamlFile = path.join(contentDir, 'categories.yaml');
    
    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch (err) {
      console.error(`Categories directory does not exist: ${contentDir}`);
      // Return fallback categories
      return [
        { id: "pizza", name: "Pizza", description: "Our stone-baked pizzas", order: 1 },
        { id: "pasta", name: "Pasta", description: "Homemade pasta dishes", order: 2 },
        { id: "salads", name: "Salads", description: "Fresh seasonal salads", order: 3 },
        { id: "desserts", name: "Desserts", description: "Sweet treats", order: 4 }
      ];
    }
    
    // Try to read the YAML file first
    try {
      const fileContent = await fs.readFile(yamlFile, 'utf-8');
      const data = yaml.load(fileContent) as any;
      
      if (data && Array.isArray(data.categories)) {
        // Map the categories to ensure each one has an id
        const categories = data.categories.map((category: any, index: number) => {
          // If no id is provided, use the slugified name or a default
          if (!category.id) {
            category.id = category.name 
              ? category.name.toLowerCase().replace(/\s+/g, '-')
              : `category-${index}`;
          }
          return category;
        });
        
        return categories;
      }
    } catch (err) {
      console.error(`Error reading categories YAML: ${err}`);
    }
    
    // Fallback: Return hardcoded categories
    return [
      { id: "pizza", name: "Pizza", description: "Our stone-baked pizzas", order: 1 },
      { id: "pasta", name: "Pasta", description: "Homemade pasta dishes", order: 2 },
      { id: "salads", name: "Salads", description: "Fresh seasonal salads", order: 3 },
      { id: "desserts", name: "Desserts", description: "Sweet treats", order: 4 }
    ];
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    // Return fallback categories
    return [
      { id: "pizza", name: "Pizza", description: "Our stone-baked pizzas", order: 1 },
      { id: "pasta", name: "Pasta", description: "Homemade pasta dishes", order: 2 },
      { id: "salads", name: "Salads", description: "Fresh seasonal salads", order: 3 },
      { id: "desserts", name: "Desserts", description: "Sweet treats", order: 4 }
    ];
  }
}); 