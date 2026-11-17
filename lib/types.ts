export type CategoryRef = {
  id: number;
  name: string;
  slug: string;
};

export type Category = CategoryRef & {
  description: string | null;
  sort_order: number;
};

export type BlogListItem = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_note: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string | null;
  category: CategoryRef | null;
};

export type BlogDetail = BlogListItem & {
  content: string | null;
};

export type BlogPage = {
  blogs: BlogListItem[];
  total: number;
  page: number;
  totalPages: number;
};

export type SupportRequest = {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  created_at: string;
};
