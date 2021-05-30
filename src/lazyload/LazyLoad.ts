interface IOptions {
  selector?: string;
  attributeNameSrc?: string;
  attributeNameSrcset?: string;
  classNameLoaded?: string;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

interface IObserver {
  root?: HTMLElement | null;
  rootMargin: string;
  threshold: number[];
}

type TElement = HTMLImageElement | HTMLElement | Element;
type TElements = Array<TElement> | NodeListOf<TElement>;

export class LazyLoad {
  constructor(options?: IOptions, elements?: TElements) {
    this.self = this;
    this.options = { ...this.defaults, ...options };
    this.elements = elements || window.document.querySelectorAll(this.options.selector || this.defaults.selector);
    this.observer = null;
    this.init();
  }

  private self: LazyLoad;
  private options: IOptions;
  private elements: TElements;
  private observer: IntersectionObserver | null;

  private defaults = {
    selector: '.js-lazyload',
    attributeNameSrc: 'data-src',
    attributeNameSrcset: 'data-srcset',
    classNameLoaded: 'js-lazyloaded',
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  private observe = (): void => {
    const _self = this.self;
    Array.prototype.forEach.call(this.elements, (element) => {
      _self.observer?.observe(element);
    });
  };

  private loader = (element: TElement): void => {
    const src = element.getAttribute(this.options.attributeNameSrc || this.defaults.attributeNameSrc) || '';
    const srcset = element.getAttribute(this.options.attributeNameSrcset || this.defaults.attributeNameSrcset) || '';
    const checkSrc = src.length > 1;
    const checkSrcset = srcset.length > 1;

    if (element instanceof HTMLImageElement) {
      if (checkSrc) {
        element.src = src;
      }
      if (checkSrcset) {
        element.srcset = srcset;

        if (window.navigator.userAgent.toLocaleLowerCase('en').indexOf('.net4') > -1) {
          if (!String.prototype.startsWith) {
            Object.defineProperty(String.prototype, 'startsWith', {
              value: function (searchString: string, position?: number) {
                const pos = (position && position > 0) ? position : 0;
                return this.substring(pos, (pos + searchString.length)) === searchString;
              },
            });
          }

          if (srcset.trim().startsWith('data:image')) {
            element.src = (
              srcset.split(', data:image')[0] ||
              srcset.split(',data:image')[0] ||
              srcset.split(', http')[0] ||
              srcset.split(',http')[0] ||
              srcset.split(', /')[0] ||
              srcset.split(',/')[0] ||
              ''
            ).trim();
          } else {
            element.src = ((
              srcset.trim().split(', ')[0] ||
              srcset.trim().split(',')[0] ||
              ''
            ).trim().split(' ')[0]).trim();
          }
        }
      }
    } else if (element instanceof HTMLElement && checkSrc) {
      element.style.backgroundImage = `url("${src}")`;
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    }
    if (checkSrc || checkSrcset) {
      element.classList.add(this.options.classNameLoaded || this.defaults.classNameLoaded);
    }
  };

  private loadImages = (): void => {
    const _self = this.self;
    Array.prototype.forEach.call((_self.elements), (element) => {
      _self.loader(element);
    });
  };

  private init = (): void => {
    if (!window.IntersectionObserver) {
      this.loadImages();
      return;
    }

    const observerConfig: IObserver = {
      root: this.options.root || this.defaults.root,
      rootMargin: this.options.rootMargin || this.defaults.rootMargin,
      threshold: [(this.options.threshold || this.defaults.threshold)],
    };

    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const _self = this.self;
      Array.prototype.forEach.call(entries, (entry: IntersectionObserverEntry) => {
        const isLoaded = entry.target.classList.contains(_self.options.classNameLoaded || _self.defaults.classNameLoaded);
        if (entry.isIntersecting && !isLoaded) {
          this.loader(entry.target);
          this.observer?.unobserve(entry.target);
        }
      });
    }, observerConfig);

    this.observe();
  };

  disconnect = (): void => {
    this.observer?.disconnect();
  };

  reconnect = (): void => {
    this.observe();
  };
}

const lazyload = (options?: IOptions, elements?: TElements): LazyLoad => {
  return new LazyLoad(options, elements);
};

export default lazyload;
