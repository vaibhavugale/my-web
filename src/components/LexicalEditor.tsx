"use client";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { CodeNode, $createCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { HeadingNode, QuoteNode, $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { Bold, Italic, Underline, Strikethrough, Code, Terminal, Highlighter, Heading1, Heading2, Quote, List, ListOrdered, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-100 font-mono text-sm px-1 py-0.5 rounded text-indigo-600',
    highlight: 'bg-yellow-200',
  },
  code: 'bg-gray-900 text-gray-50 font-mono text-sm p-4 rounded-md block overflow-x-auto my-4',
  heading: {
    h1: 'text-4xl font-bold mt-6 mb-4',
    h2: 'text-3xl font-bold mt-5 mb-3',
    h3: 'text-2xl font-bold mt-4 mb-2',
    h4: 'text-xl font-bold mt-3 mb-2',
    h5: 'text-lg font-bold mt-2 mb-1',
    h6: 'text-base font-bold mt-1 mb-1',
  },
  list: {
    ul: 'list-disc list-outside ml-6 mb-4',
    ol: 'list-decimal list-outside ml-6 mb-4',
    listitem: 'mb-1',
    listitemChecked: 'line-through text-gray-400',
    listitemUnchecked: '',
  },
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4 bg-gray-50 py-2 rounded-r',
  link: 'text-indigo-600 hover:underline',
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-200 flex-wrap">
      <button 
        type="button"
        onClick={() => formatHeading('h1')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => formatHeading('h2')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Inline Code"
      >
        <Terminal className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Highlight"
      >
        <Highlighter className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
      <button 
        type="button"
        onClick={formatCodeBlock}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={formatQuote}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button 
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
        title="Justify"
      >
        <AlignJustify className="w-4 h-4" />
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
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      HorizontalRuleNode,
    ],
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
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin />
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
