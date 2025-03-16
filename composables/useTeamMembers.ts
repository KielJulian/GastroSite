import { useAsyncData } from '#imports';
import { useContentHelper } from './useContentHelper';

// Define interfaces
interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  order?: number;
  socials?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    [key: string]: string | undefined;
  };
}

export const useTeamMembers = () => {
  // Get the content helper
  const contentHelper = useContentHelper();
  
  // Fetch team members using Nuxt Content
  const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    try {
      console.log('Fetching team members using Nuxt Content');
      
      // Use content helper to get all team members
      const teamMembers = await contentHelper.findAll('team', {
        where: { _extension: 'md' }
      });
      
      console.log('Team members from Content:', teamMembers);
      
      if (teamMembers && Array.isArray(teamMembers) && teamMembers.length > 0) {
        // Map result to TeamMember interface
        return teamMembers.map((member: any) => {
          // Extract the ID from the path
          const id = member._path?.split('/').pop() || '';
          
          return {
            id,
            name: String(member.name || ''),
            position: String(member.position || ''),
            bio: member.bio ? String(member.bio) : undefined,
            image: member.image ? String(member.image) : undefined,
            order: member.order ? Number(member.order) : undefined,
            socials: member.socials || {}
          };
        }).sort((a: any, b: any) => (a.order || 999) - (b.order || 999));
      }
      
      // Return empty array if no team members found
      console.warn('No team members found in content');
      return [];
    } catch (err) {
      console.error('Error fetching team members from content:', err);
      return [];
    }
  };

  /**
   * Get all team members
   */
  const getTeamMembers = async (): Promise<TeamMember[]> => {
    try {
      console.log('Getting team members');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'team-members',
        () => fetchTeamMembers()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching team members:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No team members found, returning empty array');
        return [];
      }
      
      const result = data.value;
      console.log('Team members result:', result);
      return result;
    } catch (err) {
      console.error('Unexpected error in getTeamMembers:', err);
      return [];
    }
  };

  return {
    getTeamMembers
  };
}; 