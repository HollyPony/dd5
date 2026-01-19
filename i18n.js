
const language = document.language ?? "fr";

const i18n = {
  /**
  * Interpolates variables wrapped with `{}` in `str` with variables in `obj`
  * It will replace what it can, and leave the rest untouched
  *
  * Usage:
  *
  * named variables:
  * strObjInterpolation("I'm {age} years old!", { age: 29 });
  *
  * ordered variables
  * strObjInterpolation("The {0} says {1}, {1}, {1}!", ['cow', 'moo']);
  */
  strObjInterpolation: function (str, obj) {
    obj = obj || [];
    str = str ? str.toString() : '';
    return str.replace(
      /{([^{}]*)}/g,
      (a, b) => {
        const r = obj[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      },
    );
  },

  /**
   * Navigates inside `obj` with `path` string,
   *
   * Usage:
   * objNavigate({a: {b: 123}}, "a.b") // returns 123
   *
   * Returns undefined if variable is not found.
   * Fails silently.
   */
  objNavigate: function (obj, path) {
    aPath = path.split('.');
    try {
      return aPath.reduce((a, v) => a[v], obj) || path;
    } catch {
      return path;
    }
  },

  translations: {
    fr: fr
  },

  _: function (key, interpolations) {
    const value = i18n.objNavigate(i18n.translations[language], key);
    return i18n.strObjInterpolation(value, interpolations);
  },

  translate: function (element, key, interpolation = '', attributes = []) {
    for (attribute of attributes) {
      i18n._(attribute.key, attribute.interpolation)
    }

    const result = i18n._(key, interpolation)
    if (result) {
      element.innerText = result
    }
  },
}

for (element of document.querySelectorAll('[data-i18n]')) {
  const key = element.dataset.i18n
  const values = element.dataset.i18nValues ? JSON.parse(element.dataset.i18nValues) : undefined
  const attrs = element.dataset.i18nAttrs ? JSON.parse(element.dataset.i18nAttrs) : undefined

  i18n.translate(element, key, values, attrs)
}