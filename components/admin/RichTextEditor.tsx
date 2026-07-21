"use client";
import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { docToBlocks } from "@/lib/blogContent";
import type { BlogBlock } from "@/components/blogsData";

function ToolbarButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`min-w-[2rem] h-8 px-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active
          ? "bg-[#764ba2] text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function LinkControl({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const isActive = editor.isActive("link");

  function openControl() {
    if (isActive) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    setUrl(editor.getAttributes("link").href ?? "");
    setOpen(true);
  }

  function apply() {
    const href = url.trim();
    if (href) editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setOpen(false);
    setUrl("");
  }

  if (open) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply();
        }}
        className="flex items-center gap-1.5"
      >
        <input
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              setOpen(false);
            }
          }}
          placeholder="https://..."
          className="h-8 w-44 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-2 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50"
        />
        <button type="submit" className="text-xs font-semibold text-[#764ba2] dark:text-[#667eea] px-1.5">
          Add
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen(false)} className="text-xs text-gray-400 px-1">
          ✕
        </button>
      </form>
    );
  }

  return (
    <ToolbarButton active={isActive} onClick={openControl} label={isActive ? "Remove link" : "Add link"}>
      🔗
    </ToolbarButton>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 dark:border-gray-800 px-2 py-1.5">
      <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} label="Bold">
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} label="Italic">
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} label="Underline">
        <span className="underline">U</span>
      </ToolbarButton>
      <LinkControl editor={editor} />

      <span className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1" />

      <ToolbarButton
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="Heading"
      >
        H2
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="Quote">
        &ldquo;&rdquo;
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} label="Bullet list">
        ≡
      </ToolbarButton>

      <span className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1" />

      <ToolbarButton disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} label="Undo">
        ↺
      </ToolbarButton>
      <ToolbarButton disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} label="Redo">
        ↻
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (blocks: BlogBlock[]) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
        orderedList: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
      }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[16rem] max-h-[32rem] overflow-y-auto outline-none px-4 py-3 text-sm text-gray-900 dark:text-white",
      },
    },
    onUpdate: ({ editor }) => onChange(docToBlocks(editor.getJSON())),
  });

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
