import React, { ReactElement, createElement } from 'react';
import { LazyLoad } from './LazyLoad';

interface ILazyImage {
  id?: string;
  className?: string;
  alt?: string;
  width?: string;
  height?: string;
  src?: string;
  srcset?: string;
  placeholder?: string;
}

const LazyImage = ({ id, className, alt, width, height, src, srcset, placeholder }: ILazyImage): JSX.Element => {
  const plchldr: string = placeholder || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC';

  const img: HTMLImageElement | ReactElement = createElement('img', {
    id,
    className: `js-lazyimage ${className || ''}`,
    alt,
    width,
    height,
    src: plchldr,
    'data-src': src,
    'data-srcset': srcset,
  }, null);

  new LazyLoad({ selector: '.js-lazyimage' });

  return <>{img}</>;
};

export default LazyImage;
