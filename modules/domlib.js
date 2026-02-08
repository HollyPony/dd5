const BOOLEAN_ATTRIBUTES = new Set([
  'allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'controls',
  'default', 'defer', 'disabled', 'formnovalidate', 'hidden', 'inert', 'ismap',
  'itemscope', 'loop', 'multiple', 'muted', 'novalidate', 'nomodule', 'open',
  'required', 'reversed', 'selected', 'shadowrootclonable',
  'shadowrootcustomelementregistry', 'shadowrootdelegatesfocus'
])

/**
 * Normalize a value into a DOM Node.
 * @param {any} item
 * @returns {Node}
 */
export function toNode(item) {
  return item instanceof Node ? item : document.createTextNode(item)
}

/**
 * Append one or many children to a parent, normalizing values to Nodes.
 * Fails fast if a non-renderable value is provided.
 * @param {Node} parent
 * @param {null|undefined|string|number|Node|(string|number|Node)[]} children
 */
export function appendChild(parent, children) {
  if (children != null) {
    if (Array.isArray(children)) for (const child of children) parent.appendChild(toNode(child))
    else parent.appendChild(toNode(children))
  }
}

/**
 * Create an HTMLElement or a DocumentFragment.
 * @param {string} type Element tag name. Falsy creates a DocumentFragment.
 * @param {null|undefined|string|number|Node|(string|number|Node)[]} children if provided, append all children as textContext or direct as Element
 * @param {object} props 
 * @param {Record<string, Function>} [props.eventListeners] Map of eventName -> handler.
 * @param {attributes} ...props Rest of props used as element attributes
 * @returns {HTMLElement|DocumentFragment}
 */
export function createElement(type, children = [], { eventListeners = {}, ...attributes } = {}) {
  const element = type ? document.createElement(type) : document.createDocumentFragment()
  for (const [name, value] of Object.entries(attributes))
    value !== undefined && (BOOLEAN_ATTRIBUTES.has(name)
      ? value && element.setAttribute(name, '')
      : element.setAttribute(name, value))

  appendChild(element, children)

  for (const [eventName, callback] of Object.entries(eventListeners))
    element.addEventListener(eventName, callback)
  return element
}

/**
 * Replace all children of an element with provided content.
 * @param {Element} element to fill with ...
 * @param {null|undefined|string|number|Node|(string|number|Node)[]} children if provided, append all children as textContext or direct as Element
 * @returns {Element} the element
 */
export function replaceElement(element, children = []) {
  const fragment = document.createDocumentFragment()

  appendChild(fragment, children)

  element.replaceChildren(fragment)
  return element
}

/**
 * Populate a <select> with options and optgroups.
 * @param {HTMLSelectElement} selectElement The <select> Element to append the <option> elements
 * @param {object[]} items the element to append
 * @param {object} params Some params...
 * @param {string} [params.placeholder=null] Append an `<option>` as first element with this `placeholder` as textContent and value to `''` (empty string)
 * @returns {HTMLSelectElement} the selectElement for chaining or re-use. (ie. for `.value = ` ...)
 */
export function populateSelect(selectElement, items, params = {
  placeholder: null
}) {
  return replaceElement(selectElement, Array()
    .concat(params.placeholder && ({ value: '', text: params.placeholder, disabled: true }))
    .concat(items)
    .filter(item => item)
    .map(item => item.isGroup
      ? createElement(
        'optgroup',
        item.options.map(optItem => createElement('option', [optItem.text], { value: optItem.value, disabled: item.disabled })),
        { label: item.label }
      )
      : createElement('option', item.text, { value: item.value, disabled: item.disabled })
    ))
}
/**
 * Subscribe to a DOM event and return the unsubscribe function.
 * @param {EventTarget} domElement
 * @param {string} eventName
 * @param {Function} handler
 * @param {object|boolean} [options]
 * @returns {Function} Unsubscribe callback.
 */
export function domSubscribe(domElement, eventName, handler, options) {
  domElement.addEventListener(eventName, handler, options)

  return () => domElement.removeEventListener(eventName, handler, options)
}

