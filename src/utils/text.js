export function toLowerCase(text) {
  return text.toLowerCase();
}

export function textLimit(text = '', length) {
  if (!text) {
    return '';
  }
  return text.length > length ? text.substring(0, length) + '...' : text;
}