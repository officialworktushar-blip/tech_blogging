# TechHelp

A tech-support help site built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase, and Tiptap.

The project name is defined in [`lib/config.ts`](lib/config.ts). Change `siteConfig.name` there to rebrand the site.

## Requirements

- Node.js 20.9 or newer
- npm
- A Supabase project (needed once auth/database features are added)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Fill in the values in `.env.local`:

   | Variable                        | Description                                          |
   | ------------------------------- | ---------------------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL (Project Settings -> API)       |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (Project Settings -> API)   |
   | `NEXT_PUBLIC_SITE_URL`          | Public base URL, e.g. `http://localhost:3000`        |

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint`  | Run ESLint               |

## Project structure

```
app/                    Public pages (App Router)
app/admin/              Admin panel routes
components/             Shared React components and layout shell
lib/
  config.ts             Site name, tagline, description, and URL
  navigation.ts         Header and footer link definitions
  utils.ts              cn() helper and slugify wrapper
  supabase/
    client.ts           Browser Supabase client
    server.ts           Server Supabase client (cookie-based)
    proxy.ts            Supabase session refresh helper
proxy.ts                Next.js proxy that refreshes sessions
supabase/
  migrations/           SQL migrations and schema files
.env.example            Required environment variables
```

## Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local`.
3. Put database SQL files in `supabase/migrations/` (for example, via the Supabase CLI).

The Supabase browser and server clients are ready in `lib/supabase/`. The root `proxy.ts` keeps auth cookies refreshed on each request.

## Design system

The public site shell lives in `components/site-header.tsx` and `components/site-footer.tsx`. Design tokens (colors, fonts, container width) and base styles live in `app/globals.css`.

- **Headings:** Source Serif 4
- **UI and body text:** Inter
- **Accent:** deep teal (`#0f766e`)
- **Reusable components:** `ArticleCard`, `HeroFeatured`, `CategorySection`, `Breadcrumbs`, `Pagination`, `ImagePlaceholder`

`ImagePlaceholder` renders a grey, correctly proportioned box with a description of the image that should go there when no real image is available.
