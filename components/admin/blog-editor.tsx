"use client";

import {
  EditorContent,
  mergeAttributes,
  Node,
  useEditor,
} from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Redo2,
  Save,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";

import {
  saveBlog,
  type BlogFormState,
} from "@/app/admin/(dashboard)/blogs/actions";
import type { AdminBlog, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const initialState: BlogFormState = { status: "idle" };

const fieldClass =
  "w-full rounded-md border border-line bg-background px-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent";
const labelClass = "block text-sm font-medium text-foreground";
const hintClass = "mt-1 text-xs leading-relaxed text-subtle";

const ImagePlaceholderNode = Node.create({
  name: "imagePlaceholder",
  group: "block",
  content: "inline*",
  defining: true,
  parseHTML() {
    return [{ tag: "div.image-placeholder" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "image-placeholder" }),
      0,
    ];
  },
});

type BlogEditorProps = {
  blog?: AdminBlog;
  categories: Category[];
};

function toDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate(),
  )}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active || undefined}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
        active && "bg-background text-accent-strong shadow-sm",
      )}
    >
      {children}
    </button>
  );
}

export function BlogEditor({ blog, categories }: BlogEditorProps) {
  const [state, formAction, isPending] = useActionState(saveBlog, initialState);
  const [content, setContent] = useState(blog?.content ?? "");

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer nofollow" },
        },
      }),
      Image.configure({ allowBase64: false }),
      ImagePlaceholderNode,
    ],
    content: blog?.content ?? "",
    editorProps: {
      attributes: {
        class: "article-content admin-editor-content",
        "aria-label": "Article content",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      setContent(currentEditor.getHTML());
    },
  });

  const insertPlaceholder = () => {
    editor
      ?.chain()
      .focus()
      .insertContent(
        '<div class="image-placeholder">Describe the screenshot, photo, or mockup needed here.</div>',
      )
      .run();
  };

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="id" value={blog?.id ?? ""} />
      <input type="hidden" name="content" value={content} />

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-lg border border-line bg-background p-5 sm:p-6">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Article details
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="title" className={labelClass}>
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={blog?.title ?? ""}
                  placeholder="How to fix…"
                  className={cn(fieldClass, "h-11")}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subtitle" className={labelClass}>
                  Subtitle
                </label>
                <input
                  id="subtitle"
                  name="subtitle"
                  type="text"
                  defaultValue={blog?.subtitle ?? ""}
                  placeholder="Optional one-line summary shown under the title"
                  className={cn(fieldClass, "h-11")}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="slug" className={labelClass}>
                  URL slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  defaultValue={blog?.slug ?? ""}
                  placeholder="leave-blank-to-generate-from-title"
                  className={cn(fieldClass, "h-11")}
                />
                <p className={hintClass}>
                  Published at /blog/your-slug. Leave blank to generate it from
                  the title.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="description" className={labelClass}>
                  SEO description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  maxLength={300}
                  defaultValue={blog?.description ?? ""}
                  placeholder="One or two sentences for search results and card summaries."
                  className={cn(fieldClass, "py-3 leading-relaxed")}
                />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-background">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Content
                </h2>
                <p className="text-xs text-subtle">
                  Use headings, lists, and image placeholder blocks.
                </p>
              </div>
              <button
                type="button"
                onClick={insertPlaceholder}
                disabled={!editor}
                className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ImagePlus aria-hidden="true" className="size-4" />
                Image placeholder
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1 border-b border-line bg-surface/70 px-2 py-2">
              <ToolbarButton
                label="Bold"
                active={editor?.isActive("bold")}
                disabled={!editor}
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <Bold aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Italic"
                active={editor?.isActive("italic")}
                disabled={!editor}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <Italic aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <span
                aria-hidden="true"
                className="mx-1 h-6 w-px bg-line"
              />
              <ToolbarButton
                label="Heading 2"
                active={editor?.isActive("heading", { level: 2 })}
                disabled={!editor}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Heading 3"
                active={editor?.isActive("heading", { level: 3 })}
                disabled={!editor}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3 aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <span
                aria-hidden="true"
                className="mx-1 h-6 w-px bg-line"
              />
              <ToolbarButton
                label="Bulleted list"
                active={editor?.isActive("bulletList")}
                disabled={!editor}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                <List aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Numbered list"
                active={editor?.isActive("orderedList")}
                disabled={!editor}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Quote"
                active={editor?.isActive("blockquote")}
                disabled={!editor}
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              >
                <Quote aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <span
                aria-hidden="true"
                className="mx-1 h-6 w-px bg-line"
              />
              <ToolbarButton
                label="Undo"
                disabled={!editor}
                onClick={() => editor?.chain().focus().undo().run()}
              >
                <Undo2 aria-hidden="true" className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Redo"
                disabled={!editor}
                onClick={() => editor?.chain().focus().redo().run()}
              >
                <Redo2 aria-hidden="true" className="size-4" />
              </ToolbarButton>
            </div>

            <div className="admin-editor-shell">
              {editor ? (
                <EditorContent editor={editor} />
              ) : (
                <div className="flex min-h-64 items-center justify-center text-sm text-muted">
                  Loading editor…
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-line bg-background p-5">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Publishing
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="status" className={labelClass}>
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={blog?.status ?? "draft"}
                  className={cn(fieldClass, "h-11")}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="published_at" className={labelClass}>
                  Publish date (UTC)
                </label>
                <input
                  id="published_at"
                  name="published_at"
                  type="datetime-local"
                  defaultValue={toDateTimeLocal(blog?.published_at)}
                  className={cn(fieldClass, "h-11")}
                />
                <p className={hintClass}>
                  Leave blank to use the current time when publishing.
                </p>
              </div>

              <label className="flex items-start gap-2.5 rounded-md border border-line bg-surface/60 px-3 py-2.5">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={blog?.is_featured ?? false}
                  className="mt-0.5 size-4 rounded border-line text-accent"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    Featured article
                  </span>
                  <span className="block text-xs leading-relaxed text-subtle">
                    Used for the home page hero when available.
                  </span>
                </span>
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-background p-5">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Organization
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="category_id" className={labelClass}>
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  defaultValue={blog?.category_id?.toString() ?? ""}
                  className={cn(fieldClass, "h-11")}
                >
                  <option value="">Uncategorized</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="author_name" className={labelClass}>
                  Author
                </label>
                <input
                  id="author_name"
                  name="author_name"
                  type="text"
                  defaultValue={blog?.author_name ?? ""}
                  placeholder="Author name"
                  className={cn(fieldClass, "h-11")}
                />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-background p-5">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Cover image
            </h2>
            <p className={hintClass}>
              Leave the URL blank to show a grey image placeholder based on the
              note below.
            </p>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="cover_image_url" className={labelClass}>
                  Image URL
                </label>
                <input
                  id="cover_image_url"
                  name="cover_image_url"
                  type="url"
                  defaultValue={blog?.cover_image_url ?? ""}
                  placeholder="https://…"
                  className={cn(fieldClass, "h-11")}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cover_image_alt" className={labelClass}>
                  Alt text
                </label>
                <input
                  id="cover_image_alt"
                  name="cover_image_alt"
                  type="text"
                  defaultValue={blog?.cover_image_alt ?? ""}
                  placeholder="Describe the image for screen readers"
                  className={cn(fieldClass, "h-11")}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cover_image_note" className={labelClass}>
                  Image note
                </label>
                <textarea
                  id="cover_image_note"
                  name="cover_image_note"
                  rows={4}
                  defaultValue={blog?.cover_image_note ?? ""}
                  placeholder="Describe the exact screenshot or mockup needed."
                  className={cn(fieldClass, "py-3 leading-relaxed")}
                />
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Save aria-hidden="true" className="size-4" />
          )}
          {isPending ? "Saving…" : "Save blog"}
        </button>

        <Link
          href="/admin/blogs"
          className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Cancel
        </Link>

        {blog?.status === "published" ? (
          <Link
            href={`/blog/${blog.slug}`}
            className="text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
          >
            View live article
          </Link>
        ) : null}
      </div>
    </form>
  );
}
