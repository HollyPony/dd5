export function createElement(type, children, attributes = {}) {
  const element = document.createElement(type)
  Object.entries(attributes).forEach(([name, value]) => (value !== undefined) && element.setAttribute(name, value))
  if (children && Array.isArray(children)) {
    children.forEach(child => element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child))
  }
  return element
}

export function clearSelect(selectElement) {
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }
}

export function populateSelect(selectElement, items, options = {}) {
  const fragment = document.createDocumentFragment()
  if (options.clear) {
    clearSelect(selectElement)
  }

  items.forEach(item => {
    if (item.isGroup) {
      fragment.appendChild(createElement(
        'optgroup',
        item.options.map(optItem => createElement('option', [optItem.text], { value: optItem.value, disabled: item.disabled })),
        { label: item.label }
      ))
    } else {
      fragment.appendChild(createElement('option', [item.text], { value: item.value, disabled: item.disabled }))
    }
  })

  selectElement.appendChild(fragment)
  return selectElement
}
