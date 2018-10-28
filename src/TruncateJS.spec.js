import Dom from './Dom';
import TruncateJS, { CLASS_NAMES } from './TruncateJS';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit augue est. Phasellus purus sem, varius nec eros sit amet, efficitur tincidunt felis. Donec congue eu lacus et eleifend. Phasellus arcu enim, malesuada at sem a, bibendum dignissim est. Aliquam eu turpis iaculis, ullamcorper lectus non, hendrerit nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum eros non condimentum laoreet. Aenean condimentum semper finibus.

Donec sodales molestie tellus, sed tincidunt urna ornare a. Duis bibendum rhoncus dui id laoreet. Suspendisse et erat justo. Morbi sapien lectus, ultricies in neque nec, feugiat suscipit magna. Nunc lacinia urna ac est placerat pretium. Nulla sit amet ipsum quam. Praesent porttitor sit amet sapien nec pretium. Vestibulum facilisis dictum libero quis tempus. Duis in neque ut velit dictum tempor a quis massa. Morbi et nisi laoreet, varius ex semper, ornare magna. Quisque imperdiet vitae odio non ultrices. Phasellus vel nibh quis quam aliquet gravida non eu est. Ut augue lorem, dapibus sit amet blandit ut, tempus id mauris.

Sed quis sapien vitae sapien pretium laoreet. Sed porta, lorem fringilla viverra consectetur, mauris sem tempor arcu, vel pellentesque odio metus a lorem. Donec placerat ultrices sem eu volutpat. Nam enim nunc, sagittis eget vehicula eu, tristique vel sapien. Cras ac ligula pharetra, cursus lectus quis, pretium libero. Proin id commodo sapien. In vitae euismod justo, ac tristique mi. Vestibulum ac nibh tristique, iaculis magna sed, cursus nunc. Aenean ut nibh sit amet leo maximus venenatis. Donec mauris ex, tempus iaculis eleifend at, tincidunt in libero. Donec rhoncus urna facilisis dui fermentum, vitae viverra tellus consequat. Aliquam erat volutpat. Integer consectetur sapien at augue tristique, sit amet rhoncus lacus porta. Curabitur volutpat velit lorem, ut volutpat odio volutpat at. Duis sit amet finibus lacus, tempus eleifend nulla. Proin ultricies sollicitudin leo, id auctor risus aliquet ut.

Ut et varius erat. Donec mattis facilisis accumsan. Nullam nec turpis tellus. In vestibulum pellentesque pharetra. Sed viverra lorem in sem luctus ultrices. Cras fermentum, ligula vel semper consequat, odio dui iaculis diam, ut fringilla urna justo sit amet urna. Fusce magna odio, porta sed urna eget, tristique eleifend magna. Quisque scelerisque euismod luctus. In hac habitasse platea dictumst. Praesent in tincidunt urna, eget convallis purus. Vestibulum non arcu tempus, ornare dolor eget, aliquam sem. Praesent vulputate vestibulum turpis ac molestie. Ut interdum placerat malesuada. Fusce ut velit pharetra, sollicitudin leo a, faucibus tellus.

Maecenas finibus justo a elit gravida cursus. Nunc hendrerit, lectus quis consectetur facilisis, ex velit aliquam sapien, at fringilla quam quam ac mi. Phasellus sagittis ante mauris, in venenatis arcu scelerisque id. Aenean lacinia egestas augue ac consequat. Pellentesque tristique ultricies ante, quis pharetra odio vehicula at. Phasellus tortor ante, eleifend venenatis augue vel, rhoncus vehicula mi. Sed ornare metus nibh, quis blandit mi ultricies vel. Praesent malesuada lorem rhoncus dui varius maximus in malesuada risus. Praesent non ante bibendum, dapibus nulla ornare, viverra mi. Nunc condimentum efficitur tempus. Mauris egestas semper leo, id blandit velit dictum a. Fusce vel justo fermentum, sagittis sem vel, mollis velit. Pellentesque vitae tristique eros. Vestibulum dui erat, feugiat sit amet nulla vitae, suscipit ornare arcu.`;

let el;
let trunc;
let originalStyles;

function createElement(setStyles = true) {
  if (typeof el !== 'undefined') {
    Dom.remove(el);
  }

  const el = document.createElement('div');

  if (setStyles) {
    Dom.style(el, {
      height: '400px',
      width: '400px',
      ...setStyles,
    });
  }

  Dom.text(el, text);
  Dom.append(document.body, el);

  originalStyles = el.style.toString();

  return el;
}

function createTruncator(elOptions, truncOptions) {
  if (trunc) {
    trunc.restore();
  }
  if (el) {
    Dom.remove(el);
  }

  el = createElement(elOptions);
  trunc = new TruncateJS(el, truncOptions);
}

describe('TruncateJS', () => {
  beforeEach(() => createTruncator());

  it('applies the required styles', () => {
    expect(Dom.css(el, 'word-wrap')).toBe('break-word');
    expect(Dom.css(el, 'white-space')).not.toBe('nowrap');
  });

  it('truncates the content to the appropriate height', () => {
    expect(el.scrollHeight).toBeLessThanOrEqual(trunc._getMaxHeight());
    createTruncator({ padding: '16px' });
    expect(el.scrollHeight - 32).toBeLessThanOrEqual(trunc._getMaxHeight());
  });

  it('watches window size and truncates accordingly', () => {
    createTruncator({ width: '100%' });
    expect(el.scrollHeight).toBeLessThanOrEqual(trunc._getMaxHeight());
    window.resizeTo(500, window.innerHeight);

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(el.scrollHeight).toBeLessThanOrEqual(trunc._getMaxHeight());
        resolve();
      });
    });
  });

  it('watches element size and truncates accordingly', () => {
    createTruncator({ width: '100%' }, { watch: true });
    expect(el.scrollHeight).toBeLessThanOrEqual(trunc._getMaxHeight());
    window.resizeTo(500, window.innerHeight);

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(el.scrollHeight).toBeLessThanOrEqual(Dom.innerHeight(el));
        resolve();
      }, 500);
    });
  });

  describe('$truncate', () => {
    it('returns true when the element has been truncated', () => {
      expect(trunc.truncate()).toBe(true);
      createTruncator(false);
      expect(trunc.truncate()).toBe(false);
    });

    it('adds a class to the element when the element has been truncated', () => {
      expect(el.classList.contains(CLASS_NAMES.truncated)).toBe(true);
      createTruncator(false);
      expect(el.classList.contains(CLASS_NAMES.truncated)).toBe(false);
    });
  });

  describe('$restore', () => {
    it('restores the original inline styles', () => {
      trunc.restore();
      expect(el.style.toString()).toBe(originalStyles);
    });
  });
});

