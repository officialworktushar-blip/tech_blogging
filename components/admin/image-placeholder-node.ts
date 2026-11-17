import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";

import { ImagePlaceholderView } from "@/components/admin/image-placeholder-view";

export const DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION =
  "Describe the screenshot, photo, or mockup needed here.";

export const ImagePlaceholderNode = Node.create({
  name: "imagePlaceholder",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  defining: true,

  addAttributes() {
    return {
      description: {
        default: DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
        parseHTML: (element) =>
          element.textContent?.trim() || DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.image-placeholder",
        getAttrs: (element) => ({
          description:
            (element as HTMLElement).textContent?.trim() ||
            DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "image-placeholder" }),
      node.attrs.description || DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderView);
  },
});
