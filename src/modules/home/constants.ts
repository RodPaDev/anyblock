export const PROJECT_TEMPLATES = [
  {
    emoji: "🔘",
    title: "Toggle Switch",
    prompt:
      "Build an accessible toggle switch with on/off state, keyboard navigation, and customizable labels. Ensure it can be themed and reused in forms or settings panels.",
  },
  {
    emoji: "📤",
    title: "File Upload Dropzone",
    prompt:
      "Create a drag-and-drop file uploader with hover states, file preview, and fallback button. Handle single and multi-file modes, and make the logic cleanly abstracted.",
  },
  {
    emoji: "📊",
    title: "Stat Card",
    prompt:
      "Design a responsive stat card showing an icon, title, number, and trend indicator. Make it composable and layout-agnostic for dashboards.",
  },
  {
    emoji: "🧾",
    title: "Table with Pagination",
    prompt:
      "Build a table component with sortable headers, pagination, and an optional empty state. Style it for clarity and ensure cells can render custom content.",
  },
  {
    emoji: "🎯",
    title: "Command Palette",
    prompt:
      "Create a command palette component with fuzzy search, keyboard shortcuts, and grouped commands. It should be accessible, fast, and easy to customize.",
  },
  {
    emoji: "🧭",
    title: "Sidebar Navigation",
    prompt:
      "Build a vertical navigation sidebar with icons, nested routes, and active state highlighting. Keep styles clean and behavior predictable.",
  },
  {
    emoji: "💬",
    title: "Toast Notification",
    prompt:
      "Design a toast notification component with stacked layout, animations, and type-based variants (info, error, success). Support auto-dismiss and manual close.",
  },
  {
    emoji: "🔍",
    title: "Search Input with Suggestions",
    prompt:
      "Build a search input with live suggestions, keyboard support, and loading state. Structure it so the logic and UI can be reused separately.",
  }
] as const;
