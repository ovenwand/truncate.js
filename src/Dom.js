const TEXT_CONTENT_PROPS = ['nodeValue', 'textContent', 'innerText'];

export default class Dom {
  static text(el, content) {
    // Set
    if (arguments.length >= 2) {
      for (const prop of TEXT_CONTENT_PROPS) {
        el[prop] = content;
      }
      return content;
    }

    // Get
    for (const prop of TEXT_CONTENT_PROPS) {
      if (typeof el[prop] === 'string') {
        return el[prop];
      }
    }

    return '';
  }

  static clear(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  static css(el, prop, parse) {
    const computedStyle = getComputedStyle(el);

    if (!prop) {
      return computedStyle;
    }

    const val = computedStyle.getPropertyValue(prop);

    return parse
      ? parseFloat(val) || 0
      : val;
  }

  static style(el, prop, value) {
    // Set single property
    if (arguments.length >= 3) {
      el.style.setProperty(prop, value);
      return;
    }

    // Set multiple properties
    if (typeof prop === 'object') {
      Object.keys(prop).forEach((p) =>
        el.style.setProperty(p, prop[p]),
      );
      return;
    }

    // Get single property
    if (typeof prop === 'string') {
      return el.style.getPropertyValue(prop);
    }

    return el.style;
  }

  static innerHeight(el) {
    const arr = ['padding-bottom', 'padding-top'];
    let padding = 0;

    for (const prop of arr) {
      padding += Dom.css(el, prop, true);
    }

    const height = Dom.css(el, 'height', true);

    return (height || el.offsetHeight) - padding;
  }

  static append(el, content) {
    if (
      el.nodeType === Node.ELEMENT_NODE ||
      el.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
      el.nodeType === Node.DOCUMENT_NODE
    ) {
      el.appendChild(content);
    }

    return content;
  }

  static remove(el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }

    return el;
  }

  static replace(oldNode, newNode) {
    if (oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    }

    return oldNode;
  }

  static contents(el) {
    return Array.from(el.childNodes);
  }
}
