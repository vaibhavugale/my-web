"use client";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { Bold, Italic, Underline, Strikethrough } from 'lucide-react';

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-200">
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
    </div>
  );
}

function Placeholder() {
  return <div className="absolute top-[68px] left-[17px] text-gray-400 pointer-events-none">Write your blog content here...</div>;
}

export default function LexicalEditor({ onChange, initialContent }: { onChange?: (content: string) => void, initialContent?: string }) {
  const initialConfig = {
    namespace: 'BlogEditor',
    theme,
    editorState: initialContent ? initialContent : undefined,
    onError: (error: Error) => console.error(error),
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white relative text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="p-4 min-h-[400px] outline-none" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin onChange={(editorState) => {
            if (onChange) {
              onChange(JSON.stringify(editorState.toJSON()));
            }
          }} />
        </div>
      </LexicalComposer>
    </div>
  );
}
