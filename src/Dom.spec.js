import Dom from './Dom';

let el;

describe('Dom', () => {
  beforeEach(() => {
    if (el) {
      el.remove();
    }

    el = document.createElement('div');
    document.body.appendChild(el);
  });

  describe('#text', () => {
    it ('gets the text content of the element', () => {
      expect(Dom.text(el)).toBe('');
    });
    it('sets the text content of the element', () => {
      Dom.text(el, 'test');
      expect(Dom.text(el)).toBe('test');
    });
  });

  describe('#clear', () => {
    it('clears the contents of an element', () => {
      const child = document.createComment('');

      el.appendChild(child);
      expect(el.childNodes.length).toBeGreaterThan(0);

      Dom.clear(el);
      expect(el.childNodes.length).toBe(0);
    });
  });

  describe('#css', () => {
    it('gets computed style by property name', () => {
      expect(Dom.css(el, 'height')).toBe('0px');
      el.style.height = '100px';
      expect(Dom.css(el, 'height')).toBe('100px');
    });

    it('gets all computed styles', () => {
      expect(Dom.css(el) instanceof CSSStyleDeclaration).toBe(true);
    });

    describe('#style', () => {
      it('gets style property', () => {
        expect(Dom.style(el, 'background')).toBe('');
        el.style.background = '#000';
        expect(Dom.style(el, 'background')).toBe('rgb(0, 0, 0)');
      });

      it('sets a single style property', () => {
        expect(Dom.style(el, 'background')).toBe('');
        Dom.style(el, 'background', '#000');
        expect(Dom.style(el, 'background')).toBe('rgb(0, 0, 0)');
      });

      it('sets multiple style properties', () => {
        Dom.style(el, {
          color: '#fff',
          height: '200px',
          width: '200px',
        });

        expect(Dom.style(el, 'color')).toBe('rgb(255, 255, 255)');
        expect(Dom.style(el, 'height')).toBe('200px');
        expect(Dom.style(el, 'width')).toBe('200px');
      });
    });

    describe('#append', () => {
      it('appends a node to the element', () => {
        expect(el.childNodes.length).toBe(0);
        Dom.append(el, document.createComment(''));
        expect(el.childNodes.length).toBe(1);
      });
    });

    describe('#remove', () => {
      it('removes an node from the dom', () => {
        const c = document.createComment('');

        Dom.append(el, c);
        expect(c.parentNode).toBe(el);
        expect(el.childNodes[0]).toBe(c);

        Dom.remove(c);
        expect(c.parentNode).toBe(null);
        expect(el.childNodes[0]).not.toBe(c);
      });
    });

    describe('#replace', () => {
      it('replaces the target node with a new node', () => {
        const c1 = document.createComment('');
        const c2 = document.createComment('');

        el.appendChild(c1);
        expect(el.childNodes[0]).toBe(c1);

        Dom.replace(c1, c2);
        expect(el.childNodes[0]).toBe(c2);
      });
    });

    describe('#contents', () => {
      it('gets all of the elements\' child nodes', () => {
        const c = document.createComment('');
        expect(Dom.contents(el).length).toBe(0);
        expect(Dom.contents(el)[0]).toBe(undefined);

        el.appendChild(c);
        expect(Dom.contents(el).length).toBe(1);
        expect(Dom.contents(el)[0]).toBe(c);
      });
    });
  });
});
