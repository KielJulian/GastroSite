import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

export default defineEventHandler(async () => {
  // Get current directory
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const cwd = process.cwd()
  const serverDir = path.resolve(__dirname, '../../')
  const projectRoot = path.resolve(serverDir, '..')
  const contentDir = path.join(projectRoot, 'content')
  
  try {
    // Get basic file system info
    const info: Record<string, any> = {
      cwd: cwd,
      homeDir: os.homedir(),
      isAbsolute: path.isAbsolute(cwd),
      dirname: __dirname,
      serverDir: serverDir,
      projectRoot: projectRoot,
      contentPath: contentDir,
      hostname: os.hostname(),
      platform: os.platform(),
      separator: path.sep,
      exists: {
        content: fs.existsSync(contentDir),
        menuItems: fs.existsSync(path.join(contentDir, 'menu', 'items')),
        menuCategories: fs.existsSync(path.join(contentDir, 'menu', 'categories')),
        menuTags: fs.existsSync(path.join(contentDir, 'menu', 'tags')),
        team: fs.existsSync(path.join(contentDir, 'team'))
      }
    }
    
    // Try to list content directory if it exists
    if (info.exists.content) {
      const contentDirectory = contentDir
      try {
        info.contentFiles = fs.readdirSync(contentDirectory)
      } catch (err) {
        info.contentFilesError = `Error reading content dir: ${err instanceof Error ? err.message : String(err)}`
      }
      
      // Check menu items
      if (info.exists.menuItems) {
        try {
          const itemsDir = path.join(contentDirectory, 'menu', 'items')
          info.menuItemsFiles = fs.readdirSync(itemsDir)
          
          // Check the content of a few menu items
          if (info.menuItemsFiles && info.menuItemsFiles.length > 0) {
            info.menuItemsSamples = []
            
            for (const file of info.menuItemsFiles.slice(0, 3)) {
              if (file.endsWith('.md') && !file.startsWith('_')) {
                const filePath = path.join(itemsDir, file)
                try {
                  const content = fs.readFileSync(filePath, 'utf-8')
                  
                  // Extract frontmatter
                  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
                  
                  info.menuItemsSamples.push({
                    file,
                    exists: true,
                    size: fs.statSync(filePath).size,
                    hasFrontmatter: !!frontmatterMatch,
                    excerpt: content.slice(0, 200) + '...'
                  })
                } catch (fileErr) {
                  info.menuItemsSamples.push({
                    file,
                    exists: true,
                    error: `Error reading file: ${fileErr instanceof Error ? fileErr.message : String(fileErr)}`
                  })
                }
              }
            }
          }
        } catch (err) {
          info.menuItemsError = `Error reading menu items: ${err instanceof Error ? err.message : String(err)}`
        }
      }
      
      // Check categories
      if (info.exists.menuCategories) {
        try {
          const categoriesDir = path.join(contentDirectory, 'menu', 'categories')
          info.categoriesFiles = fs.readdirSync(categoriesDir)
          
          // Check categories.yaml
          const categoriesFile = path.join(categoriesDir, 'categories.yaml')
          if (fs.existsSync(categoriesFile)) {
            try {
              const content = fs.readFileSync(categoriesFile, 'utf-8')
              info.categoriesYaml = {
                exists: true,
                size: fs.statSync(categoriesFile).size,
                excerpt: content.slice(0, 200) + '...'
              }
            } catch (err) {
              info.categoriesYamlError = `Error reading categories.yaml: ${err instanceof Error ? err.message : String(err)}`
            }
          } else {
            info.categoriesYamlMissing = true
          }
        } catch (err) {
          info.categoriesError = `Error reading categories: ${err instanceof Error ? err.message : String(err)}`
        }
      }
      
      // Check team
      if (info.exists.team) {
        try {
          const teamDir = path.join(contentDirectory, 'team')
          const teamFiles = fs.readdirSync(teamDir)
          info.teamFiles = teamFiles
          
          // Check a sample team member file
          if (teamFiles && teamFiles.length > 0) {
            for (const file of teamFiles) {
              if (file.endsWith('.md') && !file.startsWith('_')) {
                const filePath = path.join(teamDir, file)
                try {
                  const content = fs.readFileSync(filePath, 'utf-8')
                  info.teamMemberSample = {
                    file,
                    exists: true,
                    size: fs.statSync(filePath).size,
                    excerpt: content.slice(0, 200) + '...'
                  }
                  break
                } catch (err) {
                  // Continue to next file
                }
              }
            }
          }
        } catch (err) {
          info.teamError = `Error reading team: ${err instanceof Error ? err.message : String(err)}`
        }
      }
    }
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      info
    }
  } catch (err) {
    return {
      success: false,
      error: `Server error: ${err instanceof Error ? err.message : String(err)}`
    }
  }
}) 