import axios from 'axios';
import { Tour, TourCategory, Booking, Testimonial, WebsiteSettings, AdminUser } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for attaching admin JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('itq_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if expired
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('itq_admin_token');
        localStorage.removeItem('itq_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const tourService = {
  getPublicTours: async (params?: { category?: string; featured?: boolean; search?: string }) => {
    const res = await api.get<{ tours: Tour[]; total: number }>('/tours/public', { params });
    return res.data;
  },
  getTourBySlug: async (slug: string) => {
    const res = await api.get<{ tour: Tour; similarTours: Tour[] }>(`/tours/public/${slug}`);
    return res.data;
  },
  // Admin
  getAllTours: async () => {
    const res = await api.get<Tour[]>('/tours');
    return res.data;
  },
  getTourById: async (id: string) => {
    const res = await api.get<Tour>(`/tours/${id}`);
    return res.data;
  },
  createTour: async (data: Partial<Tour>) => {
    const res = await api.post<Tour>('/tours', data);
    return res.data;
  },
  updateTour: async (id: string, data: Partial<Tour>) => {
    const res = await api.put<Tour>(`/tours/${id}`, data);
    return res.data;
  },
  deleteTour: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/tours/${id}`);
    return res.data;
  },
  toggleTourStatus: async (id: string) => {
    const res = await api.patch<Tour>(`/tours/${id}/toggle`);
    return res.data;
  },
};

export const categoryService = {
  getPublicCategories: async () => {
    const res = await api.get<TourCategory[]>('/categories/public');
    return res.data;
  },
  getAllCategories: async () => {
    const res = await api.get<TourCategory[]>('/categories');
    return res.data;
  },
  createCategory: async (data: Partial<TourCategory>) => {
    const res = await api.post<TourCategory>('/categories', data);
    return res.data;
  },
  updateCategory: async (id: string, data: Partial<TourCategory>) => {
    const res = await api.put<TourCategory>(`/categories/${id}`, data);
    return res.data;
  },
  deleteCategory: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/categories/${id}`);
    return res.data;
  },
};

export const bookingService = {
  createBooking: async (data: {
    tourId: string;
    travelDate: string;
    numberOfGuests: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCountry?: string;
    hotelName?: string;
    pickupLocation?: string;
    specialRequests?: string;
    addons?: Array<{ addonId: string; quantity: number }>;
  }) => {
    const res = await api.post<{ booking: Booking; message: string }>('/bookings', data);
    return res.data;
  },
  getBookingByRef: async (ref: string) => {
    const res = await api.get<Booking>(`/bookings/ref/${ref}`);
    return res.data;
  },
  // Admin
  getDashboardStats: async () => {
    const res = await api.get<{
      totalTours: number;
      totalBookings: number;
      pendingBookings: number;
      approvedBookings: number;
      completedBookings: number;
      totalCustomers: number;
      totalRevenue: number;
      recentBookings: Booking[];
      monthlyData: Record<number, { count: number; revenue: number }>;
    }>('/bookings/admin/stats');
    return res.data;
  },
  getAllBookings: async (params?: { status?: string; tourId?: string; search?: string }) => {
    const res = await api.get<{ bookings: Booking[]; total: number }>('/bookings/admin/all', { params });
    return res.data;
  },
  getBookingById: async (id: string) => {
    const res = await api.get<Booking>(`/bookings/admin/${id}`);
    return res.data;
  },
  updateStatus: async (id: string, status: string, notes?: string) => {
    const res = await api.patch<Booking>(`/bookings/admin/${id}/status`, { status, notes });
    return res.data;
  },
  recordPayment: async (id: string, paymentData: { amount: number; method?: string; transactionId?: string; status: string; notes?: string }) => {
    const res = await api.post(`/bookings/admin/${id}/payment`, paymentData);
    return res.data;
  },
};

export const contentService = {
  getTestimonials: async () => {
    const res = await api.get<Testimonial[]>('/content/testimonials/public');
    return res.data;
  },
  getSettings: async () => {
    const res = await api.get<WebsiteSettings>('/content/settings/public');
    return res.data;
  },
  getGallery: async () => {
    const res = await api.get<any[]>('/content/gallery/public');
    return res.data;
  },
  sendContactMessage: async (data: { name: string; email: string; phone?: string; subject?: string; message: string }) => {
    const res = await api.post<{ message: string; id: string }>('/content/contact', data);
    return res.data;
  },
  // Admin
  getAllTestimonials: async () => {
    const res = await api.get<Testimonial[]>('/content/testimonials');
    return res.data;
  },
  updateTestimonial: async (id: string, data: Partial<Testimonial>) => {
    const res = await api.put<Testimonial>(`/content/testimonials/${id}`, data);
    return res.data;
  },
  deleteTestimonial: async (id: string) => {
    const res = await api.delete(`/content/testimonials/${id}`);
    return res.data;
  },
  getAllMessages: async () => {
    const res = await api.get<any[]>('/content/messages');
    return res.data;
  },
  markMessageRead: async (id: string) => {
    const res = await api.patch(`/content/messages/${id}/read`);
    return res.data;
  },
  deleteMessage: async (id: string) => {
    const res = await api.delete(`/content/messages/${id}`);
    return res.data;
  },
  getAllSettings: async () => {
    const res = await api.get<any[]>('/content/settings');
    return res.data;
  },
  updateSettings: async (settings: Array<{ key: string; value: string; group?: string }>) => {
    const res = await api.put('/content/settings/bulk', { settings });
    return res.data;
  },
  getReports: async (type: string, startDate?: string, endDate?: string) => {
    const res = await api.get('/content/reports', { params: { type, startDate, endDate } });
    return res.data;
  },
  getAllGallery: async () => {
    const res = await api.get<any[]>('/content/gallery');
    return res.data;
  },
  createGalleryImage: async (data: any) => {
    const res = await api.post('/content/gallery', data);
    return res.data;
  },
  deleteGalleryImage: async (id: string) => {
    const res = await api.delete(`/content/gallery/${id}`);
    return res.data;
  },
};

export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post<{ token: string; admin: AdminUser }>('/auth/login', { email, password });
    localStorage.setItem('itq_admin_token', res.data.token);
    localStorage.setItem('itq_admin_user', JSON.stringify(res.data.admin));
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('itq_admin_token');
    localStorage.removeItem('itq_admin_user');
  },
  getProfile: async () => {
    const res = await api.get<AdminUser>('/auth/profile');
    return res.data;
  },
  updateProfile: async (data: { name?: string; currentPassword?: string; newPassword?: string }) => {
    const res = await api.put<AdminUser>('/auth/profile', data);
    return res.data;
  },
  getCurrentUser: (): AdminUser | null => {
    const user = localStorage.getItem('itq_admin_user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('itq_admin_token');
  },
};

export default api;
