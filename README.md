# LazyLoad
LazyLoad for images and background images.

<sub>Version: 1.0.0</sub>\
<sub>Demo: [https://furcan.github.io/LazyLoad/](https://furcan.github.io/LazyLoad/)</sub>\
<sub>License: MIT - https://opensource.org/licenses/MIT</sub>

---

## API
```ts
interface IOptions {
  selector?: string;
  attributeNameSrc?: string;
  attributeNameSrcset?: string;
  classNameLoaded?: string;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

const defaultOptions: IOptions = {
  selector: '.js-lazyload',
  attributeNameSrc: 'data-src',
  attributeNameSrcset: 'data-srcset',
  classNameLoaded: 'js-lazyloaded',
  root: null,
  rootMargin: '0px',
  threshold: 0,
};
```

```ts
/*
* @param1 {Object}: Optional, IOptions.
*
* @param2 {Array<HTMLImageElement> | NodeListOf<HTMLImageElement>}: Optional, image elements.
*/

import { LazyLoad } from '/src/lazyload/LazyLoad';

new LazyLoad(param1, param2);

// or

import lazyload from '/src/lazyload/LazyLoad';

lazyload(param1, param2);
```

---

## React Component => LazyImage

```ts
interface ILazyImage {
  id?: string;
  className?: string;
  alt?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  src?: string;
  srcset?: string;
  attributeNameSrc?: string;
  attributeNameSrcset?: string;
  classNameLoaded?: string;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}
```

```tsx
import LazyImage from '/src/lazyload/LazyImage';

// srcset
<LazyImage
  threshold={0.25}
  classNameLoaded="image--loaded"
  className="component__image"
  width="1923"
  height="1881"
  alt="LazyImage"
  srcset="https://example.com/image.png, https://example.com/image-2x.png 2x"
/>

// src
<LazyImage
  threshold={0.5}
  classNameLoaded="image--loaded"
  className="component__image"
  width="1923"
  height="1881"
  alt="LazyImage"
  src="https://example.com/image.png"
/>
```

---

## React Component => LazyBackground

```ts
type TChildren = React.ReactNode
  | JSX.Element
  | JSX.Element[]
  | string
  | string[]
  | React.ReactChild
  | React.ReactChild[];

interface ILazyBackground {
  backgroundImageUrl: string;
  attributeNameSrc?: string;
  classNameLoaded?: string;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
  id?: string;
  className?: string;
  children?: TChildren;
}
```

```tsx
import LazyBackground from '/src/lazyload/LazyBackground';

<LazyBackground
  className="banner"
  backgroundImageUrl="https://example.com/image.png"
>
  <h1 className="banner__title">Lorem Ipsum</h1>
  <p className="banner__desc">Lorem ipsum dolor sit amet...</p>
</LazyBackground>
```
