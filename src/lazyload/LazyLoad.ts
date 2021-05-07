interface IOptions {
  selector?: string;
  src?: string;
  srcset?: string;
  loadedClassName?: string;
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
    src: 'data-src',
    srcset: 'data-srcset',
    selector: '.js-lazyload',
    loadedClassName: 'js-lazyloaded',
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
    const src = element.getAttribute(this.options.src || this.defaults.src) || '';
    const srcset = element.getAttribute(this.options.srcset || this.defaults.srcset) || '';
    const checkSrc = src.length > 1;
    const checkSrcset = srcset.length > 1;

    if (element instanceof HTMLImageElement) {
      if (checkSrc) {
        element.src = src;
      }
      if (checkSrcset) {
        element.srcset = srcset;
        if (window.navigator.userAgent.toLocaleLowerCase('en').indexOf('.net4') > -1) {
          element.src = (srcset.split(',')[0] || '').trim();
        }
      }
    } else if (element instanceof HTMLElement && checkSrc) {
      element.style.backgroundImage = `url("${src}")`;
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    }
    if (checkSrc || checkSrcset) {
      element.classList.add(this.options.loadedClassName || this.defaults.loadedClassName);
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
        const isLoaded = entry.target.classList.contains(_self.options.loadedClassName || _self.defaults.loadedClassName);
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
