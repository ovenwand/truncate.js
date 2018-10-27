import Dom from './Dom';

const DEFAULT_OPTIONS = {
  callback: () => {
  },
  ellipsis: '\u2026',
  height: null,
  tolerance: 0,
  truncate: 'word',
  watch: 'window',
  debug: false,
};
const FILTER_CHARACTERS = [' ', '\u3000', ',', ';', '.', '!', '?'];
const CLASS_NAME_PREFIX = 'truncate-js';
const CLASS_NAMES = {
  keep: `${CLASS_NAME_PREFIX}-keep`,
  truncated: `${CLASS_NAME_PREFIX}-truncated`,
};

const ResizeObserver = (el, handler) => {
  el.addEventListener('resize', handler);
  return { destroy: () => el.removeEventListener('resize', handler) };
};

export default class TruncateJS {
  constructor(el, options = {}) {
    this.el = el;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.debug = this.options.debug;
    this.originalContent = this._getOriginalContent();
    this.originalStyles = this.el.getAttribute('style');

    this.init();
    this.truncate();

    if (this.options.watch) {
      this._watch();
    }
  }

  init() {
    this.$options = { ...this.options };

    if (Dom.css(this.el, 'word-wrap') !== 'break-word') {
      Dom.style(this.el, 'word-wrap', 'break-word');
    }

    if (Dom.css(this.el, 'white-space') === 'nowrap') {
      Dom.style(this.el, 'white-space', 'normal');
    }

    if (this.options.height === null) {
      this.$options.height = this._getMaxHeight();
    }

    if (typeof this.options.ellipsis === 'string') {
      this.$options.ellipsis = document.createTextNode(this.options.ellipsis);
    }
  }

  truncate() {
    // Create wrapper element to calculate size
    this.inner = document.createElement('div');
    Dom.style(this.inner, {
      border: 'none',
      display: 'block',
      height: 'auto',
      margin: 0,
      padding: 0,
      width: 'auto',
    });

    // Wrap the contents with this.inner
    Dom.clear(this.el);
    Dom.append(this.el, this.inner);
    this.originalContent.forEach((n) =>
      Dom.append(this.inner, n.cloneNode(true)),
    );

    this.maxHeight = this._getMaxHeight();

    let isTruncated = false;
    if (this._shouldTruncate()) {
      isTruncated = true;
      this._truncateToNode(this.inner);
    }

    // Add/remove the truncated class
    this.el.classList[isTruncated ? 'add' : 'remove'](CLASS_NAMES.truncated);

    Dom.clear(this.el);
    Dom.contents(this.inner).forEach((node) => {
      Dom.append(this.el, node);
    });
    this.inner = null;

    if (this.$options.callback) {
      this.$options.callback.call(this.el, isTruncated);
    }

    return isTruncated;
  }

  restore() {
    this._unwatch();

    Dom.clear(this.el);
    this.originalContent.forEach((n) => Dom.append(this.el, n));
    this.el.setAttribute('style', this.originalStyles || '');
    this.el.classList.remove(CLASS_NAMES.truncated);
  }

  _watch() {
    this._unwatch();

    let oldSizes = {};

    const checkSizes = () => {
      const newSizes = {
        height: this.$options.watch === 'window' ? window.innerHeight : this.el.offsetHeight,
        width: this.$options.watch === 'window' ? window.innerWidth : this.el.offsetWidth,
      };

      if (oldSizes.height !== newSizes.height || oldSizes.width !== newSizes.width) {
        this.truncate();
      }

      return newSizes;
    };

    if (this.$options.watch === 'watch') {
      this._windowObserver = ResizeObserver(window, () => {
        if (this._watchTimeout) {
          clearTimeout(this._watchTimeout);
        }
        this._watchTimeout = setTimeout(() => oldSizes = checkSizes(), 100);
      });
    } else {
      this._watchInterval = setInterval(() => oldSizes = checkSizes(), 500);
    }
  }

  _unwatch() {
    if (this._windowObserver) {
      this._windowObserver.destroy();
      this._windowObserver = null;
    }

    if (this._watchInterval) {
      clearInterval(this._watchInterval);
    }

    if (this._watchTimeout) {
      clearTimeout(this._watchTimeout);
    }
  }

  _truncateToNode(el) {
    const comments = [];
    const elements = [];

    // Empty the node, replace all contents with comment nodes
    Dom.contents(el).forEach((node) => {
      const comment = document.createComment('');
      elements.push(Dom.replace(node, comment));
      comments.push(comment);
    });

    if (!elements.length) {
      return;
    }

    let i;

    // Re-fill the node, replace all comments until it doesn't fit anymore
    for (i = 0; i < elements.length; i++) {
      Dom.replace(comments[i], elements[i]);
      Dom.append(elements[i], this.$options.ellipsis);
      const shouldTruncate = this._shouldTruncate();
      Dom.remove(this.$options.ellipsis);

      if (shouldTruncate) {
        if (this.$options.truncate === 'node' && i > 1) {
          Dom.remove(elements[i - 2]);
          return;
        }
        break;
      }
    }

    // Remove left over comments
    for (let c = i; c < comments.length; c++) {
      Dom.remove(comments[c]);
    }

    // Get the last node (the node that overflows)
    let last = elements[Math.max(0, Math.min(i, elements.length - 1))];

    // Handle case when last node only has the ellipsis in it
    if (last.nodeType === Node.ELEMENT_NODE) {
      const e = document.createElement(last.nodeName);
      Dom.append(e, this.$options.ellipsis);
      Dom.replace(last, e);

      // If it fits, restore the full last node
      if (!this._shouldTruncate()) {
        Dom.replace(e, last);
      } else {
        Dom.remove(e);
        last = elements[Math.max(0, i - 1)];
      }
    }

    // Proceed inside last node
    if (last.nodeType === Node.ELEMENT_NODE) {
      this._truncateToNode(last);
    } else {
      this._truncateToWord(last);
    }
  }

  _truncateToWord(el) {
    const text = Dom.text(el);
    const separator = ~text.indexOf(' ') ? ' ' : '\u3000';
    const arr = text.split(separator);
    let str = '';

    for (let i = arr.length; i >= 0; i--) {
      str = arr.slice(0, i).join(separator);

      Dom.text(el, this._addEllipsis(str));

      if (!this._shouldTruncate()) {
        if (this.$options.truncate === 'letter') {
          Dom.text(el, arr.slice(0, i + 1).join(separator));
          this._truncateToLetter(el);
        }
        break;
      }
    }
  }

  _truncateToLetter(el) {
    const text = Dom.text(el);
    const arr = text.split('');
    let str = '';

    for (let i = arr.length; i >= 0; i--) {
      str = arr.slice(0, i).join('');

      if (!str.length) {
        continue;
      }

      Dom.text(el, this._addEllipsis(str));

      if (!this._shouldTruncate()) {
        break;
      }
    }
  }

  _shouldTruncate() {
    return Dom.innerHeight(this.inner) > (this.maxHeight + this.$options.tolerance);
  }

  /**
   * Util methods
   */
  _getOriginalContent() {
    const trim = (str) => {
      const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      return str == null
        ? ''
        : (str + '').replace(rtrim, '');
    };

    Dom.contents(this.el).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (trim(Dom.text(node)) === '') {
          if (!node.nextSibling) {
            Dom.remove(node);
            return;
          }
          if (!node.previousSibling) {
            Dom.remove(node);
            return;
          }
          if (['table', 'thead', 'tbody', 'tfoot', 'tr', 'dl', 'ul', 'ol', 'video'].includes(node.parentNode.nodeName.toLowerCase())) {
            Dom.remove(node);
            return;
          }
          if (['div', 'p', 'table', 'td', 'dt', 'dd', 'li'].includes(node.previousSibling.nodeName.toLowerCase())) {
            Dom.remove(node);
            return;
          }
          if (['div', 'p', 'table', 'td', 'dt', 'dd', 'li'].includes(node.nextSibling.nodeName.toLowerCase())) {
            Dom.remove(node);
            return;
          }
        }
      }
    });

    return Dom.contents(this.el);
  }

  _getMaxHeight() {
    if (typeof this.$options.height === 'number') {
      return this.$options.height;
    }

    const arr = ['height', 'maxHeight'];
    let height = 0;

    for (let prop of arr) {
      const val = Dom.css(this.el, prop, true);
      if (val) {
        height = val;
        break;
      }
    }

    arr.length = 0;

    switch (Dom.css(this.el, 'box-sizing')) {
    case 'border-box':
      arr.push('border-top-width', 'border-bottom-width');
      // Don't break, padding needs to be applied too
      // eslint-disable-next-line no-fallthrough
    case 'padding-box':
      arr.push('padding-bottom', 'padding-top');
      break;
    }

    for (const prop of arr) {
      height -= Dom.css(this.el, prop, true);
    }

    return Math.max(height, 0);
  }

  _addEllipsis(str) {
    while (FILTER_CHARACTERS.includes(str.slice(-1))) {
      str = str.slice(0, -1);
    }

    str += Dom.text(this.$options.ellipsis);

    return str;
  }
}
