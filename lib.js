const lib = {
  clearSelect: function (selectElement) {
    while(selectElement.options.length > 0) {
      selectElement.remove(0);
    }
  },
  populateSelect: function (selectElement, items, options = {}) {
    if (options.clear) {
      lib.clearSelect(selectElement)
    }
    items.forEach(item => {
      let opt = document.createElement("option")
      opt.value = item.value
      opt.innerText = item.text
      selectElement.append(opt)
    });
  }
}
