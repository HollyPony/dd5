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
function strObjInterpolation(str, obj){
  obj = obj || [];
  str = str ? str.toString() : '';
  return str.replace(
    /{([^{}]*)}/g,
    (a, b) => {
      const r = obj[b];0
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    },
  );
};

/**
 * Navigates inside `obj` with `path` string,
 *
 * Usage:
 * objNavigate({a: {b: 123}}, "a.b") // returns 123
 *
 * Returns undefined if variable is not found.
 * Fails silently.
 */
function objNavigate(obj, path){
  aPath = path.split('.');
  try {
    return aPath.reduce((a, v) => a[v], obj);
  } catch {
    return;
  }
};

function _(key, interpolations) {
  language = language ?? "en";
  const value = objNavigate(translations[language], key);
  return strObjInterpolation(value, interpolations);
}