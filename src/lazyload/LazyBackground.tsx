import React, { createRef, useEffect } from 'react';

import { LazyLoad } from './LazyLoad';

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

function LazyBackground({
  backgroundImageUrl,
  attributeNameSrc,
  classNameLoaded,
  root,
  rootMargin,
  threshold,
  id,
  className,
  children,
}: ILazyBackground): React.ReactElement {

  const thisRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (thisRef.current) {
      new LazyLoad({
        attributeNameSrc,
        classNameLoaded,
        root,
        rootMargin,
        threshold,
      }, [thisRef.current]);
    }
  }, [
    thisRef,
    attributeNameSrc,
    classNameLoaded,
    root,
    rootMargin,
    threshold,
  ]);

  const lazyLoadAttributeSrc = {
    [attributeNameSrc || 'data-src']: backgroundImageUrl,
  };

  return (
    <div ref={thisRef} {...lazyLoadAttributeSrc} id={id} className={className}>
      {children}
    </div>
  );
}

export default LazyBackground;
