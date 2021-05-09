import React, { ReactElement, createElement, createRef, useEffect } from 'react';
import { LazyLoad } from './LazyLoad';

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
  loadedClassName?: string;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

const LazyImage = (
  {
    id,
    className,
    alt,
    width,
    height,
    placeholder,
    src,
    srcset,
    attributeNameSrc,
    attributeNameSrcset,
    loadedClassName,
    root,
    rootMargin,
    threshold,
  }: ILazyImage): JSX.Element => {

  const plchldr: string = placeholder || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC';

  const thisRef = createRef<HTMLImageElement>();

  useEffect(() => {
    if (thisRef.current) {
      new LazyLoad(
        {
          src: attributeNameSrc,
          srcset: attributeNameSrcset,
          loadedClassName,
          root,
          threshold,
          rootMargin,
        },
        [thisRef.current],
      );
    }
  }, [
    thisRef,
    attributeNameSrc,
    attributeNameSrcset,
    loadedClassName,
    root,
    rootMargin,
    threshold,
  ]);

  const img: HTMLImageElement | ReactElement = createElement(
    'img',
    {
      ref: thisRef,
      id,
      className: (className || ''),
      alt,
      width,
      height,
      [attributeNameSrc || 'data-src']: src,
      [attributeNameSrcset || 'data-srcet']: srcset,
      src: plchldr,
    },
    null,
  );

  return <>{img}</>;
};

export default LazyImage;
