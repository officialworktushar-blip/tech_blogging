import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";

import { ImagePlaceholderView } from "@/components/admin/image-placeholder-view";

export const DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION =
  "Describe the screenshot, photo, or mockup needed here.";

function createPlaceholderId() {
  return `imgph-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export const ImagePlaceholderNode = Node.create({
  name: "imagePlaceholder",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  defining: true,

  addAttributes() {
    return {
      id: {
        default: () => createPlaceholderId(),
        parseHTML: (element) =>
          element.getAttribute("data-id") || createPlaceholderId(),
        renderHTML: (attributes) => ({ "data-id": attributes.id }),
      },
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
        getAttrs: (element) => {
          const htmlElement = element as HTMLElement;

          return {
            id: htmlElement.getAttribute("data-id") || createPlaceholderId(),
            description:
              htmlElement.textContent?.trim() ||
              DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ class: "image-placeholder" }, HTMLAttributes),
      node.attrs.description || DEFAULT_IMAGE_PLACEHOLDER_DESCRIPTION,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderView);
  },
});
