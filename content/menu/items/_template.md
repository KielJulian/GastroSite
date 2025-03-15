---
# Menu Item Template
# This file serves as a template for creating new menu items.
# You can copy this file and rename it to create a new menu item.
# Please fill in all the required fields below.

name:
  en: "Item Name in English" # Required: Name of the dish in English
  de: "Item Name in German"  # Required: Name of the dish in German

description:
  en: "Detailed description of the dish in English" # Required: Description in English
  de: "Detailed description of the dish in German"  # Required: Description in German

price: 0.0 # Required: Price in EUR, use decimal point (e.g., 12.5)

# Required: Menu category - must match one of the category IDs from menu/categories/en.yaml
# Available categories: pizza, pasta, salads, desserts
category: "" 

# Optional: Tags for dietary preferences - must match tag IDs from menu/tags/en.yaml
# Available tags: vegetarian, vegan, spicy, gluten-free
# Use empty array [] if no tags apply
tags: [] 

# Required: Path to the image file (must be in /public/images/menu/)
image: "/images/menu/your-image-filename.jpg"

# Required: Display order within the category (lower numbers appear first)
order: 1
---