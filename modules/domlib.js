/**
 * Create an HTMLElement
 * @param {string} type the name of the element to create. e.g. div
 * @param {null|undefined|string|HTMLElement|string[]|HTMLElement[]} children if provided, append all children as textContext or direct as Element
 * @param {object} props 
 * @param {object} props.eventListeners { [eventType]: callbackFunction } element
 * @param {attributes} ...props Rest of props used as element attributes
 * @returns 
 */
export function createElement(type, children, { eventListeners = {}, ...attributes } = {}) {
  const element = document.createElement(type)
  Object.entries(attributes).forEach(([name, value]) => {
    switch (name) {
      case 'checked':
      case 'disabled': return value ? element.setAttribute(name, 'true') : element.removeAttribute(name)
      default: return (value !== undefined) && element.setAttribute(name, value)
    }
  })
  children && [].concat(children).forEach(child => element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child))
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
 * Append options / optgroups from `items` to the provided `selectElement`
 * @param {HTMLSelectElement} selectElement The <select> Element to append the <option> elements
 * @param {object[]} items the element to append
 * @param {object} params Some params...
 * @param {boolean} [params.clear=false] `true` to clear previous content. Call `removeAllChildren` on `selectElement`
 * @param {string} [params.placeholder=null] Append an `<option>` as first element with this `placeholder` as textContent and value to `''` (empty string)
 * @returns the selectElement for chaining or re-use
 */
export function populateSelect(selectElement, items, params = {
  clear: false,
  placeholder: null
}) {
  const fragment = document.createDocumentFragment()
  if (params.clear) {
    removeAllChildren(selectElement)
  }

  items.forEach(item => {
    if (item.isGroup) {
      fragment.appendChild(createElement(
        'optgroup',
        item.options.map(optItem => createElement('option', [optItem.text], { value: optItem.value, disabled: item.disabled })),
        { label: item.label }
      ))
    } else {
      fragment.appendChild(createElement('option', item.text, { value: item.value, disabled: item.disabled }))
    }
  })

  selectElement.appendChild(fragment)
  return selectElement
}
