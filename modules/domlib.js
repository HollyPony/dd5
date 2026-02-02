/**
 * Create an HTMLElement
 * @param {string} type the name of the element to create. e.g. div
 * @param {null|undefined|string|HTMLElement|string[]|HTMLElement[]} children if provided, append all children as textContext or direct as Element
 * @param {object} props 
 * @param {object} props.eventListeners { [eventType]: callbackFunction } element
 * @param {attributes} ...props Rest of props used as element attributes
 * @returns 
 */
export function createElement(type, children = [], { eventListeners = {}, ...attributes } = {}) {
  const element = type ? document.createElement(type) : document.createDocumentFragment()
  Object.entries(attributes).forEach(([name, value]) => {
    switch (name) {
      case 'checked':
      case 'disabled': return value ? element.setAttribute(name, 'true') : element.removeAttribute(name)
      default: return (value !== undefined) && element.setAttribute(name, value)
    }
  })
  Array().concat(children).filter(child => child)
    .forEach(child => element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child))
  Object.entries(eventListeners).forEach(params => element.addEventListener(...params))
  return element
}

/**
 * Remove every child of an element
 * @param {HTMLElement} element The element to process
 * @returns undefined
 */
export function removeAllChildren(element) {
  if (element) {
    while (element.firstChild) { element.removeChild(element.firstChild) }
  }
}

/**
 * Fill element
 * @param {*} element to fill with ...
 * @param {HTMLElement[]|HTMLElement} items to put on element
 * @param {*} params could be { clear: true } default. To clear content of element before fill
 * @returns the element
 */
export function fillElement(element, items = [], params = { clear: true }) {
  const fragment = document.createDocumentFragment()
  if (params.clear) {
    removeAllChildren(element)
  }

  Array().concat(items).forEach(item => fragment.appendChild(item))
  element.appendChild(fragment)
  return element
}

/**
 * Append options / optgroups from `items` to the provided `selectElement`
 * @param {HTMLSelectElement} selectElement The <select> Element to append the <option> elements
 * @param {object[]} items the element to append
 * @param {object} params Some params...
 * @param {boolean} [params.clear=false] `true` to clear previous content. Call `removeAllChildren` on `selectElement`
 * @param {string} [params.placeholder=null] Append an `<option>` as first element with this `placeholder` as textContent and value to `''` (empty string)
 * @returns the selectElement for chaining or re-use. (ie. for `.value = ` ...)
 */
export function populateSelect(selectElement, items, params = {
  clear: false,
  placeholder: null
}) {
  return fillElement(selectElement, Array()
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
    ), { clear: params.clear })
}
