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
import { CodeNode, CodeHighlightNode, $createCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { HeadingNode, QuoteNode, $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { Bold, Italic, Underline, Strikethrough, Code, Terminal, Highlighter, Heading1, Heading2, Quote, List, ListOrdered, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { useEffect } from 'react';

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-100 text-indigo-600 font-mono text-sm px-1.5 py-0.5 rounded-md',
    highlight: 'bg-yellow-200 border-2 border-black px-1',
  },
  code: 'bg-gray-50 border border-gray-200 text-gray-800 font-mono text-sm p-4 rounded-lg block overflow-x-auto my-4 whitespace-pre-wrap',
  codeHighlight: {
    atrule: 'text-purple-600',
    attr: 'text-blue-600',
    boolean: 'text-rose-500',
    builtin: 'text-green-600',
    cdata: 'text-gray-500 italic',
    char: 'text-green-600',
    class: 'text-blue-600 font-bold',
    'class-name': 'text-blue-600 font-bold',
    comment: 'text-gray-400 italic',
    constant: 'text-purple-600',
    deleted: 'text-rose-500',
    doctype: 'text-gray-500 italic',
    entity: 'text-blue-600',
    function: 'text-blue-500',
    important: 'text-purple-600 font-bold',
    inserted: 'text-green-600',
    keyword: 'text-purple-600 font-bold',
    namespace: 'text-blue-600',
    number: 'text-orange-500',
    operator: 'text-cyan-500',
    prolog: 'text-gray-500 italic',
    property: 'text-rose-500',
    punctuation: 'text-gray-400',
    regex: 'text-orange-500',
    selector: 'text-green-600',
    string: 'text-green-600',
    symbol: 'text-purple-600',
    tag: 'text-rose-500',
    url: 'text-blue-600',
    variable: 'text-orange-500',
  },
  heading: {
    h1: 'text-4xl md:text-5xl font-black uppercase tracking-tight mt-10 mb-6',
    h2: 'text-3xl md:text-4xl font-black uppercase tracking-tight mt-8 mb-4',
    h3: 'text-2xl font-black uppercase tracking-tight mt-6 mb-3',
    h4: 'text-xl font-bold mt-4 mb-2',
    h5: 'text-lg font-bold mt-4 mb-1',
    h6: 'text-base font-bold mt-4 mb-1',
  },
  list: {
    ul: 'list-disc list-outside ml-8 mb-6',
    ol: 'list-decimal list-outside ml-8 mb-6',
    listitem: 'mb-2 font-medium',
    listitemChecked: 'line-through text-gray-400',
    listitemUnchecked: '',
  },
  quote: 'border-l-8 border-black pl-6 italic font-medium text-gray-800 my-6 bg-yellow-50 py-4 shadow-[4px_4px_0_0_#000]',
  link: 'text-black font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-all',
  paragraph: 'mb-4 leading-relaxed',
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
    <div className="flex flex-row flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm rounded-t-lg">
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
  return <div className="absolute top-[16px] left-[16px] text-gray-400 pointer-events-none">Write your blog content here...</div>;
}

export default function LexicalEditor({
  onChange,
  initialContent,
  isReadOnly = false
}: {
  onChange?: (content: string) => void,
  initialContent?: string,
  isReadOnly?: boolean
}) {
  const initialConfig = {
    namespace: 'BlogEditor',
    theme,
    editable: !isReadOnly,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      CodeHighlightNode,
      HorizontalRuleNode,
    ],
    editorState: initialContent ? initialContent : undefined,
    onError: (error: Error) => console.error(error),
  };

  return (
    <div className={`border-gray-200 bg-white relative text-gray-900 transition-all ${isReadOnly ? 'border-none bg-transparent' : 'border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500'}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="flex flex-col h-full min-h-[400px]">
          {!isReadOnly && <ToolbarPlugin />}
          <div className="relative flex-1">
            <RichTextPlugin
            contentEditable={<ContentEditable className={`outline-none ${isReadOnly ? 'p-0 min-h-0' : 'p-4 min-h-[400px]'}`} />}
            placeholder={!isReadOnly ? <Placeholder /> : null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {!isReadOnly && <HistoryPlugin />}
          {!isReadOnly && <AutoFocusPlugin />}
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin />
          {!isReadOnly && <OnChangePlugin onChange={(editorState) => {
            if (onChange) {
              onChange(JSON.stringify(editorState.toJSON()));
            }
          }} />}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
