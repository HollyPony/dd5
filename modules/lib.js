export const f = Object.freeze

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

  const addOptionGroupTo = function addOptionGroupTo({ label }, elem) {
    const optgroup = document.createElement("optgroup")
    optgroup.label = label
    elem.append(optgroup)
    return optgroup
  }

  const addOptionTo = function addOptionTo({ value, text }, elem) {
    const opt = document.createElement("option")
    opt.value = value
    opt.appendChild(document.createTextNode(text))
    elem.append(opt)
  }

  items.forEach(item => {
    if (item.isGroup) {
      const optgroup = addOptionGroupTo(item, selectElement)
      item.options.forEach(optItem => addOptionTo(optItem, optgroup))
    } else {
      addOptionTo(item, selectElement)
    }
  })
}

export default {
  clearSelect,
  populateSelect,
}
