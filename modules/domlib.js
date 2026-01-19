export const f = Object.freeze

export function createElement(type, content, attributes = {}) {
  const element = document.createElement(type)
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
  if (content) {
    element.appendChild(typeof content === 'string' ? document.createTextNode(content) : content)
  }
  return element
}

export function clearSelect(selectElement) {
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }
}

export const selectHelper = {
  populate: populateSelect
}
export function populateSelect(selectElement, items, options = {}) {
  if (options.clear) {
    clearSelect(selectElement)
  }

  const addOptionGroupTo = ({ label }) => createElement('optgroup', null, { label })
  const addOptionTo = ({ value, text }) => createElement('option', text, { value })

  items.forEach(item => {
    if (item.isGroup) {
      const optgroup = addOptionGroupTo(item, selectElement)
      selectElement.appendChild(optgroup)
      item.options.forEach(optItem => optgroup.appendChild(addOptionTo(optItem)))
    } else {
      addOptionTo(item, selectElement)
    }
  })
}
