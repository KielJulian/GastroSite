// Define custom router options here
export default {
  routes: (routes: any[]) => {
    // Filter out routes we don't want - excluding the team route
    return routes.filter(route => route.path !== '/team')
  },
}