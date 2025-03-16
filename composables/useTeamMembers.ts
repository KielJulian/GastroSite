import { useAsyncData } from '#imports';

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
  // Create a valid URL for both server and client side
  const createApiUrl = (path: string): string => {
    // Check if we're running on client or server
    if (typeof window !== 'undefined') {
      // Client-side - use relative URL
      return path;
    } else {
      // Server-side - use absolute URL with origin
      try {
        return `http://localhost:3000${path}`;
      } catch (err) {
        console.error('Error creating API URL:', err);
        return path;
      }
    }
  };

  // Fetch team members from API
  const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    try {
      const apiUrl = createApiUrl('/api/content/team');
      console.log('Fetching team members from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Team API failed:', err);
          return [];
        });

      console.log('Raw team members result:', result);
      
      if (result && result.success === false) {
        console.error('Error fetching team members:', result.error);
        return [];
      }
      
      if (Array.isArray(result)) {
        // Map result to TeamMember interface
        return result.map((member: any) => ({
          id: String(member.id || ''),
          name: String(member.name || ''),
          position: String(member.position || ''),
          bio: member.bio ? String(member.bio) : undefined,
          image: member.image ? String(member.image) : undefined,
          order: member.order ? Number(member.order) : undefined,
          socials: member.socials || {}
        }));
      }
      
      return [];
    } catch (err) {
      console.error('Error fetching team members:', err);
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