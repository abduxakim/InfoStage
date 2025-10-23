export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  imageUrl: string;
  ticketUrl: string;
  ticketSite: 'Afisha' | 'iTicket';
  isTrending: boolean;
  isPopular: boolean;
  likes: number;
  views: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Comment {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  parentId?: string;
  isApproved: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  favorites: string[];
  theme: 'light' | 'dark';
}

export interface Stats {
  totalEvents: number;
  activeUsers: number;
  totalComments: number;
  trendingEvents: number;
}
