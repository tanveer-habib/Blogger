'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import { useState, useEffect } from "react";
import StarterKit from '@tiptap/starter-kit'

const TextEditor = ({ form, setForm }) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: form.description,
        onUpdate: ({ editor }) => {
            console.log(form.description);
            setForm((prev) => ({
                ...prev, description: editor.getHTML()
            }));
        },
        immediatelyRender: false,
    });
    if (!editor) return null

    return <>
        <div className="w-[93%] sm:w-92 lg:w-145 -mt-6 text-end mb-1 mx-1 text-xs">
            <button type="button" className={`px-1 py-1 rounded-sm border dark:border-white/50 border-black/50 cursor-pointer ${editor?.isActive("bold") ? "bg-red-400" : ""}`} onClick={() => editor?.chain().focus().toggleBold().run()}>Toggle Bold</button>

            <button type="button" className={`px-1 mx-2 py-1 rounded-sm border dark:border-white/50 border-black/50 cursor-pointer ${editor?.isActive('heading', { level: 2 }) ? 'bg-red-400' : ''}`} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>

            <button type="button" className={`px-2 py-1 rounded-sm border dark:border-white/50 border-black/50 cursor-pointer ${editor?.isActive('paragraph') ? 'bg-red-400' : ''}`} onClick={() => editor?.chain().focus().setParagraph().run()}>P</button>
        </div>

        <EditorContent editor={editor} className="w-[95%] sm:w-95 lg:w-150 h-40 max-h-40 overflow-y-auto border dark:border-white/50 border-black/50 focus:outline-none px-2 py-1 rounded-sm:" />
    </>
};

export default TextEditor;