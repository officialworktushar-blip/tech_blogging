# TechHelp

A tech-support help site built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, and Tiptap.

The public site includes a home page, category pages, a searchable blog, article pages, an about page, a support form, and SEO metadata. The admin area supports signing in, writing and editing articles, publishing or saving drafts, and reading support requests.

The site name, tagline, and support contact details live in [`lib/config.ts`](lib/config.ts).

## Stack

- Next.js 16.4 with Cache Components and the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Supabase Auth, Postgres, Row Level Security, and Storage
- Tiptap for the article editor
- Lucide icons

## Requirements

- Node.js 20.9 or newer
- npm
- A Supabase project

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Fill in `.env.local`:

   | Variable                        | Description                                            |
   | ------------------------------- | ------------------------------------------------------ |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL (Project Settings -> API)         |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (Project Settings -> API)     |
   | `NEXT_PUBLIC_SITE_URL`          | Public base URL, e.g. `http://localhost:3000`          |

   The anon key is safe to use in the browser. Never add a Supabase service-role key to this project or expose it with a `NEXT_PUBLIC_` variable.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

If Supabase variables are missing, public pages render their empty states and the admin area reports that Supabase is not configured.

## Supabase setup

Open your Supabase project, go to **SQL Editor -> New query**, and run these files in order:

1. `supabase/schema.sql` creates the tables, indexes, admin helper, RLS policies, and the public `blog-images` storage bucket. It is idempotent and safe to run again.
2. `supabase/seed.sql` is optional. It inserts 15 published starter articles, three per category, with detailed image notes and inline image placeholders.
3. `supabase/schema_support.sql` creates `public.support_requests` and its RLS policies. Run this after `schema.sql`.

The schema creates:

- `public.categories` for the public help categories
- `public.blogs` for articles, drafts, publishing state, cover images, and featured state
- `public.admin_users` for the admin allowlist
- `public.support_requests` for messages from the public contact form
- The public `blog-images` storage bucket

Public visitors can read only categories and blogs with `status = 'published'`. Admins can read and write all blogs and categories. Draft articles are never returned by public queries or exposed by the public RLS policy.

## Create an admin user

1. In Supabase, open **Authentication -> Users** and create a user with an email and password.
2. In the SQL Editor, register that email as an admin:

   ```sql
   insert into public.admin_users (email)
   values ('you@example.com')
   on conflict (email) do nothing;
   ```

3. Visit `/admin/login` and sign in with that email and password.

Only emails in `public.admin_users` can use the admin area or write to protected tables.

## Add or edit a blog

1. Sign in at `/admin/login`.
2. Go to **All Blogs -> Add new blog**.
3. Fill in the title, description, body, category, author, and publish controls. The slug is generated from the title unless you provide one.
4. For a cover image, upload a file to the public `blog-images` bucket in Supabase Storage and paste its public URL into **Cover image URL**. Add **Cover image alt text** for accessibility.
5. Choose **Draft** or **Published** and save.

Publishing sets `published_at` if it is empty. Saving a draft clears `published_at` so it cannot appear as a public timestamp. Drafts are hidden from public pages, search, the sitemap, and article metadata.

The editor also supports inline image placeholders. Use the placeholder button in the toolbar when a screenshot still needs to be captured; the public article renders a labeled grey placeholder in the same spot.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

For a full local check, run linting, the TypeScript compiler, and a production build:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Project structure

```text
app/                     Public pages and route states
app/admin/               Admin login and dashboard routes
app/admin/(dashboard)/   Blogs, categories, and support request tools
components/              Shared public and admin components
lib/
  config.ts              Site name, tagline, description, URL, support details
  data.ts                Cached public Supabase queries
  format.ts              Date, text, search, and URL helpers
  navigation.ts          Header and footer navigation
  presenters.ts          Blog-to-card and metadata presenters
  seo.ts                 Canonical metadata and Article JSON-LD
  supabase/              Browser, server, and proxy Supabase clients
supabase/
  schema.sql             Tables, RLS, admin helper, and storage bucket
  seed.sql               Optional 15-article starter library
  schema_support.sql     Support request table and policies
proxy.ts                 Session refresh proxy for admin auth
```

## SEO and images

- Canonical URLs are generated from `NEXT_PUBLIC_SITE_URL` through `lib/seo.ts`.
- Article pages include Article JSON-LD with headline, description, image, author, publisher, section, and published date.
- `/sitemap.xml` and `/robots.txt` are generated by `app/sitemap.ts` and `app/robots.ts`.
- Search and admin pages are marked `noindex`.
- Remote cover images are optimized with `next/image`. `next.config.ts` allows public Supabase Storage URLs under `/storage/v1/object/public/**`.
- Missing images render the accessible `ImagePlaceholder` component instead of a broken image.

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New -> Project** and import the repository.
3. Add these environment variables for Production, Preview, and Development:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` set to the final public domain, for example `https://your-domain.com`
4. Keep the default framework preset and build command (`npm run build`). The output directory is the default `.next`.
5. Deploy.
6. Run `supabase/schema.sql`, the optional `supabase/seed.sql`, and `supabase/schema_support.sql` against the production Supabase project if you have not already done so.
7. Create the production admin user and add its email to `public.admin_users`.

After deployment, sign in at `https://your-domain.com/admin/login`, confirm that published articles appear on the public site, and submit a test support request.

## Design system

The public site shell lives in `components/site-header.tsx` and `components/site-footer.tsx`. Design tokens, article typography, and base styles live in `app/globals.css`.

- Headings: Source Serif 4
- UI and body text: Inter
- Accent: deep teal (`#0f766e`)
- Reusable components: `ArticleCard`, `HeroFeatured`, `CategorySection`, `Breadcrumbs`, `Pagination`, `ImagePlaceholder`, and the loading skeletons in `components/page-skeleton.tsx`
