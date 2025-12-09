// Base user profile (matches what we fetch from API)
export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  profileImage: string | null;
  // Computed field for public profile link
  publicProfileUrl: string | null;
}

// Extended profile with links
export interface UserProfileWithLinks extends UserProfile {
  links: Array<{
    id: string;
    platform: string;
    url: string;
    order: number;
  }>;
}

// API Response types
export interface UserProfileResponse {
  user: UserProfile;
}

export interface UserProfileWithLinksResponse {
  user: UserProfileWithLinks;
}

// API wrapper types (following existing pattern)
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    fields?: Record<string, string[]>;
  };
}
