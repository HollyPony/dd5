import { createElement } from './domlib.js';

/**
 * Markdown parser minimal (CommonMark partiel) → DOM Element
 * Implémente :
 * - Paragraphes (\n\n)
 * - Hard line breaks (␠␠\n)
 * - Listes non ordonnées
 *
 * @param {string} markdown
 * @returns {Element}
 */
export default function markdownToElement(markdown) {
  if (typeof markdown !== 'string') {
    throw new TypeError('markdown must be a string')
  }

  const root = document.createDocumentFragment()
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')

  let buffer = []
  let currentList = null

  function flushParagraph() {
    if (buffer.length === 0) return

    root.appendChild(createElement("p", parseInlineWithBreaks(buffer.join('\n'))))
    buffer = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Blank line → paragraph break
    if (line.trim() === "") {
      flushParagraph()
      currentList = null
      continue;
    }

    // List item
    const listMatch = line.match(/^([*+-])\s+(.*)$/)
    if (listMatch) {
      flushParagraph()

      if (!currentList) {
        currentList = createElement('ul')
        root.appendChild(currentList)
      }

      currentList.appendChild(createElement('li', parseInlineWithBreaks(listMatch[2])))
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushParagraph()
      currentList = null

      root.appendChild(createElement(`h${headingMatch[1].length}`, parseInlineWithBreaks(headingMatch[2])))
      continue
    }

    // Regular text → paragraph buffer
    currentList = null
    buffer.push(line)
  }

  flushParagraph();
  return root;
}

/**
 * Inline parsing with CommonMark hard line breaks
 * @param {string} text
 * @returns {DocumentFragment}
 */
function parseInlineWithBreaks(text) {
  const fragment = document.createDocumentFragment();
  const lines = text.split("\n");

  lines.forEach(line => {
    const hardBreak = / {2,}$/.test(line);
    const cleanLine = line.replace(/ {2,}$/, "");

    fragment.appendChild(parseInline(cleanLine));

    if (hardBreak) {
      fragment.appendChild(document.createElement("br"));
    }
  });

  return fragment;
}

/**
 * Inline markdown: bold, italic, links
 * @param {string} text
 * @returns {DocumentFragment}
 */
function parseInline(text) {
  const fragment = document.createDocumentFragment();
  let cursorStart = 0
  let cursorEnd = 0

  if (!text.includes('*') && !text.includes('[')) {
    fragment.appendChild(createElement(undefined, text))
    return fragment
  }

  function flush() {
    if (cursorStart < cursorEnd)
      fragment.appendChild(createElement(undefined, text.slice(cursorStart, cursorEnd)))
    return cursorEnd
  }

  function catcher(marker, callback) {
    const markerSize = marker.length
    if (text.slice(cursorEnd, cursorEnd + markerSize) === marker) {
      const end = text.indexOf(marker, cursorEnd + markerSize);
      if (end !== -1) {
        cursorStart = flush(fragment, cursorStart, cursorEnd)
        fragment.appendChild(callback(text.slice(cursorEnd + markerSize, end)));
        cursorEnd = end + markerSize
        cursorStart = cursorEnd
        return true
      }
    }
  }

  function catchUrl() {
    if (text[cursorEnd] === "[") {
      const endText = text.indexOf("]", cursorEnd);
      const startUrl = text.indexOf("(", endText);
      const endUrl = text.indexOf(")", startUrl);

      if (endText !== -1 && startUrl === endText + 1 && endUrl !== -1) {
        cursorStart = flush()
        const contentText = text.slice(cursorEnd + 1, endText)
        fragment.appendChild(createElement('a', contentText, { href: text.slice(startUrl + 1, endUrl) }));
        cursorEnd = endUrl + 1
        cursorStart = cursorEnd
        return true
      }
    }
  }

  while (cursorEnd < text.length) {
    // Link
    if (catchUrl()) continue

    // Italic/Bold
    if (catcher('***', contentText => createElement('em', createElement('strong', contentText)))) continue

    // Bold
    if (catcher('**', contentText => createElement('strong', contentText))) continue

    // Italic
    if (catcher('*', contentText => createElement('em', contentText))) continue
    cursorEnd++
  }

  cursorStart = flush(fragment, cursorStart, cursorEnd)

  return fragment;
}
