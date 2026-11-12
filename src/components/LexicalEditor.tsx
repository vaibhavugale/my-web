"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  $getSelection,
  $setSelection,
  $isRangeSelection,
  $isElementNode,
  $isTextNode,
  $createParagraphNode,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
import { CodeNode, CodeHighlightNode, $createCodeNode } from '@lexical/code';
import {
  $setBlocksType,
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection';
import { HeadingNode, QuoteNode, $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { LinkNode, AutoLinkNode, TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Terminal,
  Highlighter,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
  Minus,
  Plus,
  Check,
  Undo,
  Redo,
} from 'lucide-react';

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-[#f1f1ef] text-[#eb5757] font-mono text-sm px-1.5 py-0.5 rounded',
    highlight: 'bg-[#fbf3db] text-[#37352f] px-1 rounded',
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

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72, 96];

const FONT_FAMILIES = [
  { label: 'Default', value: 'Inter, sans-serif' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'Monospace', value: 'monospace' },
];

const BLOCK_TYPES = [
  { label: 'Normal text', value: 'paragraph', className: 'text-sm font-normal' },
  { label: 'Heading 1', value: 'h1', className: 'text-lg font-bold' },
  { label: 'Heading 2', value: 'h2', className: 'text-base font-semibold' },
  { label: 'Heading 3', value: 'h3', className: 'text-sm font-semibold' },
];

const CASE_OPTIONS = [
  { id: 'sentence', badge: 'Aa', label: 'Sentence case' },
  { id: 'lower', badge: 'aa', label: 'lowercase' },
  { id: 'upper', badge: 'AA', label: 'UPPERCASE' },
  { id: 'title', badge: 'Aa', label: 'Capitalize Each Word' },
  { id: 'toggle', badge: 'aA', label: 'tOGGLE cASE' },
];

function transformCase(text: string, type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle'): string {
  switch (type) {
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, prefix, char) => prefix + char.toUpperCase());
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      return text.toLowerCase().replace(/\b(\p{L})/gu, (char) => char.toUpperCase());
    case 'toggle':
      return text.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('');
    default:
      return text;
  }
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [blockType, setBlockType] = useState<'paragraph' | 'h1' | 'h2' | 'h3' | 'quote' | 'code'>('paragraph');
  const [fontFamily, setFontFamily] = useState<string>('Inter, sans-serif');
  const [fontSize, setFontSize] = useState<string>('16');

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left');

  const [isBlockDropdownOpen, setIsBlockDropdownOpen] = useState(false);
  const [isFontFamilyDropdownOpen, setIsFontFamilyDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);

  const blockDropdownRef = useRef<HTMLDivElement>(null);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const caseDropdownRef = useRef<HTMLDivElement>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);

  // Store last valid RangeSelection to preserve it even when focus temporarily moves to toolbar
  const lastSelectionRef = useRef<ReturnType<typeof $getSelection>>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      lastSelectionRef.current = selection.clone();

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsHighlight(selection.hasFormat('highlight'));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementType = element.getType();
      if (elementType === 'heading') {
        const tag = (element as HeadingNode).getTag();
        setBlockType(tag as 'h1' | 'h2' | 'h3');
      } else if (elementType === 'quote') {
        setBlockType('quote');
      } else if (elementType === 'code') {
        setBlockType('code');
      } else {
        setBlockType('paragraph');
      }

      if (elementType === 'list') {
        const listType = (element as ListNode).getListType();
        setIsBulletList(listType === 'bullet');
        setIsNumberedList(listType === 'number');
      } else {
        setIsBulletList(false);
        setIsNumberedList(false);
      }

      const parent = anchorNode.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(anchorNode));

      if ($isElementNode(element)) {
        const fmt = element.getFormatType();
        setAlignment((fmt as 'left' | 'center' | 'right' | 'justify') || 'left');
      }

      // Font size
      const rawFontSize = $getSelectionStyleValueForProperty(selection, 'font-size', '');
      if (rawFontSize) {
        const numeric = rawFontSize.replace(/(px|pt)/g, '').trim();
        setFontSize(numeric);
      } else {
        let defaultSize = '16';
        if (elementType === 'heading') {
          const tag = (element as HeadingNode).getTag();
          if (tag === 'h1') defaultSize = '36';
          else if (tag === 'h2') defaultSize = '28';
          else if (tag === 'h3') defaultSize = '22';
        }
        setFontSize(defaultSize);
      }

      // Font family
      const rawFontFamily = $getSelectionStyleValueForProperty(selection, 'font-family', '');
      setFontFamily(rawFontFamily || 'Inter, sans-serif');
    }
  }, [editor]);

  useEffect(() => {
    const unregister1 = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    const unregister2 = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });

    const unregister3 = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload: boolean) => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    const unregister4 = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload: boolean) => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    return () => {
      unregister1();
      unregister2();
      unregister3();
      unregister4();
    };
  }, [editor, updateToolbar]);

  // Click outside listener for dropdown menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(e.target as Node)) {
        setIsSizeDropdownOpen(false);
      }
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(e.target as Node)) {
        setIsFontFamilyDropdownOpen(false);
      }
      if (blockDropdownRef.current && !blockDropdownRef.current.contains(e.target as Node)) {
        setIsBlockDropdownOpen(false);
      }
      if (caseDropdownRef.current && !caseDropdownRef.current.contains(e.target as Node)) {
        setIsCaseDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll active font size into view when dropdown opens
  useEffect(() => {
    if (isSizeDropdownOpen && sizeMenuRef.current) {
      const activeItem = sizeMenuRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        (activeItem as HTMLElement).scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isSizeDropdownOpen]);

  const applyFontSize = useCallback((sizeVal: number | string) => {
    const parsed = parseInt(String(sizeVal), 10);
    if (isNaN(parsed) || parsed < 1) return;
    const clamped = Math.max(6, Math.min(144, parsed));

    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }

      if ($isRangeSelection(selection)) {
        if (!selection.isCollapsed()) {
          $patchStyleText(selection, {
            'font-size': `${clamped}px`,
          });
        } else {
          // If collapsed, resize the current word or line
          const node = selection.anchor.getNode();
          const textNode = $isTextNode(node) ? node : (node.getFirstDescendant ? node.getFirstDescendant() : null);
          if ($isTextNode(textNode)) {
            const text = textNode.getTextContent();
            const offset = selection.anchor.offset;
            let start = Math.min(offset, text.length);
            let end = Math.min(offset, text.length);
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
              textNode.select(start, end);
              const newSel = $getSelection();
              if ($isRangeSelection(newSel)) {
                $patchStyleText(newSel, { 'font-size': `${clamped}px` });
              }
            } else {
              $patchStyleText(selection, { 'font-size': `${clamped}px` });
            }
          } else {
            $patchStyleText(selection, { 'font-size': `${clamped}px` });
          }
        }
        lastSelectionRef.current = selection.clone();
      }
    });

    setFontSize(String(clamped));
    editor.focus();
  }, [editor]);

  const incrementFontSize = useCallback(() => {
    const current = parseInt(fontSize, 10) || 16;
    applyFontSize(Math.min(144, current + 1));
  }, [fontSize, applyFontSize]);

  const decrementFontSize = useCallback(() => {
    const current = parseInt(fontSize, 10) || 16;
    applyFontSize(Math.max(6, current - 1));
  }, [fontSize, applyFontSize]);

  const applyCaseChange = useCallback((type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle') => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }

      if ($isRangeSelection(selection)) {
        if (!selection.isCollapsed()) {
          const nodes = selection.getNodes();
          const textNodes = nodes.filter($isTextNode);
          if (textNodes.length > 1) {
            for (const tn of textNodes) {
              tn.setTextContent(transformCase(tn.getTextContent(), type));
            }
          } else {
            const text = selection.getTextContent();
            selection.insertText(transformCase(text, type));
          }
        } else {
          // If collapsed, convert word at cursor or the whole line/sentence
          const node = selection.anchor.getNode();
          const textNode = $isTextNode(node) ? node : (node.getFirstDescendant ? node.getFirstDescendant() : null);
          if ($isTextNode(textNode)) {
            const text = textNode.getTextContent();
            const offset = selection.anchor.offset;
            let start = Math.min(offset, text.length);
            let end = Math.min(offset, text.length);
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
              textNode.select(start, end);
              const newSel = $getSelection();
              if ($isRangeSelection(newSel)) {
                newSel.insertText(transformCase(text.slice(start, end), type));
              }
            } else if (text.length > 0) {
              textNode.select(0, text.length);
              const newSel = $getSelection();
              if ($isRangeSelection(newSel)) {
                newSel.insertText(transformCase(text, type));
              }
            }
          }
        }
        lastSelectionRef.current = selection.clone();
      }
    });
    editor.focus();
  }, [editor]);

  const applyFontFamily = useCallback((family: string) => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }
      if ($isRangeSelection(selection)) {
        if (!selection.isCollapsed()) {
          $patchStyleText(selection, {
            'font-family': family,
          });
        } else {
          const node = selection.anchor.getNode();
          const textNode = $isTextNode(node) ? node : (node.getFirstDescendant ? node.getFirstDescendant() : null);
          if ($isTextNode(textNode)) {
            const text = textNode.getTextContent();
            const offset = selection.anchor.offset;
            let start = Math.min(offset, text.length);
            let end = Math.min(offset, text.length);
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
              textNode.select(start, end);
              const newSel = $getSelection();
              if ($isRangeSelection(newSel)) {
                $patchStyleText(newSel, { 'font-family': family });
              }
            } else {
              $patchStyleText(selection, { 'font-family': family });
            }
          } else {
            $patchStyleText(selection, { 'font-family': family });
          }
        }
        lastSelectionRef.current = selection.clone();
      }
    });
    setFontFamily(family);
    editor.focus();
  }, [editor]);

  const applyBlockType = useCallback((type: 'paragraph' | 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }
      if ($isRangeSelection(selection)) {
        if (type === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(type));
        }
        lastSelectionRef.current = selection.clone();
      }
    });
    setBlockType(type);
    editor.focus();
  }, [editor]);

  const formatCodeBlock = () => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }
      if ($isRangeSelection(selection)) {
        if (blockType === 'code') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createCodeNode());
        }
        lastSelectionRef.current = selection.clone();
      }
    });
    editor.focus();
  };

  const formatQuote = () => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection && lastSelectionRef.current) {
        $setSelection(lastSelectionRef.current.clone());
        selection = $getSelection();
      }
      if ($isRangeSelection(selection)) {
        if (blockType === 'quote') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createQuoteNode());
        }
        lastSelectionRef.current = selection.clone();
      }
    });
    editor.focus();
  };

  const insertLink = () => {
    if (!isLink) {
      const url = prompt('Enter URL:');
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  const currentBlockLabel =
    BLOCK_TYPES.find((b) => b.value === blockType)?.label ||
    (blockType === 'quote' ? 'Quote' : blockType === 'code' ? 'Code' : 'Normal text');

  const currentFontLabel =
    FONT_FAMILIES.find((f) => f.value === fontFamily || f.value.includes(fontFamily))?.label ||
    'Default';

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 sticky top-0 z-20 shadow-sm rounded-t-lg">
      {/* Undo / Redo */}
      <button
        type="button"
        disabled={!canUndo}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Undo (Ctrl+Z)"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Redo (Ctrl+Y)"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Block Type (Normal, H1, H2, H3) */}
      <div ref={blockDropdownRef} className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setIsBlockDropdownOpen((prev) => !prev);
            setIsFontFamilyDropdownOpen(false);
            setIsSizeDropdownOpen(false);
            setIsCaseDropdownOpen(false);
          }}
          className="h-8 px-2.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors min-w-[105px] justify-between shadow-xs cursor-pointer"
          title="Text style"
        >
          <span className="truncate">{currentBlockLabel}</span>
          <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
        </button>
        {isBlockDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50">
            {BLOCK_TYPES.map((block) => (
              <button
                key={block.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  applyBlockType(block.value as 'paragraph' | 'h1' | 'h2' | 'h3');
                  setIsBlockDropdownOpen(false);
                }}
                className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer ${
                  blockType === block.value ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-gray-800'
                }`}
              >
                <span className={block.className}>{block.label}</span>
                {blockType === block.value && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Font Family Dropdown */}
      <div ref={fontDropdownRef} className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setIsFontFamilyDropdownOpen((prev) => !prev);
            setIsBlockDropdownOpen(false);
            setIsSizeDropdownOpen(false);
            setIsCaseDropdownOpen(false);
          }}
          className="h-8 px-2.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors max-w-[125px] justify-between shadow-xs cursor-pointer"
          title="Font family"
        >
          <span className="truncate">{currentFontLabel}</span>
          <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
        </button>
        {isFontFamilyDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50">
            {FONT_FAMILIES.map((font) => (
              <button
                key={font.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  applyFontFamily(font.value);
                  setIsFontFamilyDropdownOpen(false);
                }}
                style={{ fontFamily: font.value }}
                className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer ${
                  fontFamily === font.value ? 'bg-indigo-50 font-bold text-indigo-600' : 'text-gray-800'
                }`}
              >
                <span className="truncate">{font.label}</span>
                {fontFamily === font.value && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Font Size Adjustment: Google Docs Style ("Doc number dropdown") */}
      <div className="flex items-center">
        {/* Decrease Font Size Button */}
        <button
          type="button"
          disabled={parseInt(fontSize, 10) <= 6}
          onMouseDown={(e) => e.preventDefault()}
          onClick={decrementFontSize}
          className="h-8 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Decrease font size"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        {/* Font Size Dropdown Button */}
        <div ref={sizeDropdownRef} className="relative">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setIsSizeDropdownOpen((prev) => !prev);
              setIsBlockDropdownOpen(false);
              setIsFontFamilyDropdownOpen(false);
              setIsCaseDropdownOpen(false);
            }}
            className="h-8 px-2 flex items-center justify-between gap-1 text-xs font-semibold text-gray-800 bg-white border-y border-gray-300 hover:bg-gray-50 transition-colors min-w-[50px] shadow-xs cursor-pointer"
            title="Font size presets"
          >
            <span>{fontSize}</span>
            <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
          </button>

          {/* Doc Number Dropdown Menu */}
          {isSizeDropdownOpen && (
            <div
              ref={sizeMenuRef}
              className="absolute top-full left-0 mt-1 w-20 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50"
            >
              {FONT_SIZES.map((size) => {
                const isActive = Number(fontSize) === size;
                return (
                  <button
                    key={size}
                    type="button"
                    data-active={isActive ? 'true' : 'false'}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      applyFontSize(size);
                      setIsSizeDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-1 text-xs text-left flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer ${
                      isActive ? 'bg-indigo-50 font-bold text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    <span>{size}</span>
                    {isActive && <Check className="w-3 h-3 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Increase Font Size Button */}
        <button
          type="button"
          disabled={parseInt(fontSize, 10) >= 144}
          onMouseDown={(e) => e.preventDefault()}
          onClick={incrementFontSize}
          className="h-8 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Increase font size"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Case Options (Aa, aa, AA, Title Case, aA Toggle Case) */}
      <div ref={caseDropdownRef} className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setIsCaseDropdownOpen((prev) => !prev);
            setIsBlockDropdownOpen(false);
            setIsFontFamilyDropdownOpen(false);
            setIsSizeDropdownOpen(false);
          }}
          className="h-8 px-2 flex items-center gap-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors shadow-xs cursor-pointer"
          title="Change text case (Aa, AA, aA...)"
        >
          <span className="font-bold text-xs tracking-tight">Aa</span>
          <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
        </button>
        {isCaseDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50">
            {CASE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  applyCaseChange(opt.id as 'sentence' | 'lower' | 'upper' | 'title' | 'toggle');
                  setIsCaseDropdownOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left flex items-center gap-2.5 hover:bg-gray-100 transition-colors group cursor-pointer"
              >
                <span className="w-6 h-6 flex items-center justify-center font-mono font-bold text-xs bg-gray-100 group-hover:bg-indigo-100 text-gray-700 group-hover:text-indigo-700 rounded transition-colors shrink-0">
                  {opt.badge}
                </span>
                <span className="text-xs font-medium text-gray-800">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Formatting: Bold, Italic, Underline, Strikethrough, Code, Highlight */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isBold ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isItalic ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isUnderline ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Underline (Ctrl+U)"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isStrikethrough ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isCode ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Inline Code"
      >
        <Terminal className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isHighlight ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Highlight"
      >
        <Highlighter className="w-4 h-4" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={insertLink}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isLink ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Code Block / Quote */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={formatCodeBlock}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          blockType === 'code' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={formatQuote}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          blockType === 'quote' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Lists */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isBulletList ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          isNumberedList ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Alignment */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          alignment === 'left' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          alignment === 'center' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          alignment === 'right' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          alignment === 'justify' ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-200'
        }`}
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
