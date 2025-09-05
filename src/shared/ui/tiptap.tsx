"use client";

import { BulletList } from "@tiptap/extension-bullet-list";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline as UnderlineExtension } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  Link2,
  List,
  Smile,
  Underline,
} from "lucide-react";

import { cn } from "../lib";
import { Button } from "./button";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      UnderlineExtension,
      BulletList.configure({
        HTMLAttributes: {
          class: "tiptap-bullet-list",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "tiptap-ordered-list",
        },
      }),
      ListItem,
    ],
    content: "",
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden ">
      {/* Header */}

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50/50">
        {/* Font Size Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-transparent border-none text-sm text-gray-700 pr-6 focus:outline-none cursor-pointer">
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Text Formatting Group */}
        <div className="flex items-center">
          {/* Font Style Button (T with dot) */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-lg font-medium">T</span>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Bold, Italic, Underline */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:bg-gray-200",
              editor.isActive("bold") && "bg-gray-200"
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:bg-gray-200",
              editor.isActive("italic") && "bg-gray-200"
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:bg-gray-200",
              editor.isActive("underline") && "bg-gray-200"
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <Underline className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <AlignLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <AlignCenter className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 hover:bg-gray-200",
              editor.isActive("bulletList") && "bg-gray-200"
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Additional Tools */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <Smile className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200">
            <Link2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[172px] px-4 py-4">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none h-[]"
        />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          color: #3a4754;
          font-size: 14px;
          line-height: 1.5;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: "text_area";
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }

        .tiptap-bullet-list {
          list-style-type: disc;
          margin-left: 1rem;
        }

        .ProseMirror ul {
          padding-left: 1rem;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }

        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Tiptap;
