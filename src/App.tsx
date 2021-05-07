import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { Properties } from 'csstype';

import { LazyLoad } from './lazyload/LazyLoad';
import LazyImage from './lazyload/LazyImage';

const styleApp: Properties = {
  width: '100%',
  minHeight: '100vh',
  background: 'inherit',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function App(): ReactElement {

  const [disconnected, setDisconnected] = useState<boolean>(false);
  const [reconnected, setReconnected] = useState<boolean>(false);
  const [lazyState, setLazyState] = useState<LazyLoad>();

  const disconnectButtonClickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log('BUTTON__EVENT: ', event);
    lazyState?.disconnect();
    setDisconnected(true);
    setReconnected(false);
  };

  const reconnectButtonClickHandler = (): void => {
    lazyState?.reconnect();
    setReconnected(true);
    setDisconnected(false);
  };

  useEffect(() => {
    if (!lazyState) {
      setLazyState(
        new LazyLoad(
          {
            loadedClassName: 'js-lazyloaded',
          },
        ),
      );
      setReconnected(true);
    }
    console.log('APP__LAZYSTATE: ', lazyState);
  }, [lazyState]);

  return (
    <section className="App" style={styleApp}>

      <section className="main">
        <div className="main__item js-lazyload" data-src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80">
          <h1 className="main__title">{'LazyLoad'}</h1>

          <button className={`main__button button--disconnect ${disconnected ? 'state--disconnected' : ''}`} type="button" onClick={(event) => disconnectButtonClickHandler(event)}>
            <svg className="main__button__icon" width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m254.277 331.652-45.96-30.131 56.067-107.402c1.492-2.86 1.514-6.265.058-9.143-1.457-2.879-4.214-4.877-7.402-5.368l-47.45-7.3 22.643-83.778c.944-3.492-.071-7.222-2.656-9.753-19.587-19.184-44.292-31.763-71.443-36.375-26.522-4.508-53.461-1.152-77.897 9.701-5.048 2.242-7.322 8.151-5.081 13.198 2.242 5.046 8.153 7.323 13.198 5.08 41.051-18.232 89.729-10.614 123 18.751l-23.986 88.75c-.743 2.747-.279 5.681 1.272 8.065 1.553 2.385 4.048 3.995 6.86 4.428l44.689 6.875-53.791 103.041c-2.378 4.556-.916 10.173 3.383 12.991l48.308 31.67-12.841 101.117c-41.102-23.244-100.164-70.913-145.731-130.479-31.822-41.6-80.557-121.343-49.404-188.029 2.337-5.004.176-10.955-4.828-13.292-5.006-2.338-10.955-.176-13.293 4.828-14.406 30.839-15.838 66.242-4.256 105.224 9.785 32.932 28.592 67.729 55.896 103.422 52.396 68.493 122.445 122.086 165.356 142.896 1.379.669 2.872 1.002 4.363 1.002 1.641 0 3.279-.404 4.764-1.207 2.831-1.534 4.751-4.338 5.157-7.533l15.443-121.625c.482-3.793-1.24-7.527-4.438-9.624z" /><path d="m471.869 79.606c-52.467-52.301-137.838-52.301-190.307 0-1.969 1.963-4.105 3.698-6.35 5.157-2.037 1.324-3.521 3.344-4.178 5.683l-13.145 46.845c-.778 2.771-.323 5.743 1.246 8.155 1.569 2.413 4.103 4.032 6.951 4.443l48.708 7.042-57.772 118.942c-2.086 4.294-.845 9.465 2.963 12.345l43.321 32.766-31.732 137.067c-.875 3.778.514 7.72 3.562 10.117 1.798 1.414 3.982 2.139 6.183 2.139 1.53 0 3.068-.351 4.489-1.065 41.098-20.659 92.292-61.637 133.604-106.941 35.672-39.12 80.332-99.073 90.509-162.538 7.544-47.042-5.259-87.468-38.052-120.157zm18.305 116.989c-15.606 97.322-123.928 200.651-194 243.876l28.081-121.295c.89-3.844-.563-7.851-3.71-10.231l-41.942-31.723 60.162-123.861c1.395-2.871 1.335-6.234-.16-9.054s-4.246-4.756-7.404-5.212l-50.976-7.37 9.104-32.442c2.225-1.671 4.353-3.517 6.354-5.512 44.683-44.541 117.387-44.541 162.067 0 27.982 27.894 38.892 62.489 32.424 102.824z" /><path d="m47.182 96.689c5.522 0 10-4.477 10-10s-4.478-10-10-10h-.008c-5.522 0-9.996 4.477-9.996 10s4.481 10 10.004 10z" /></g></svg>
            <span className="main__button__text">{'Disconnect'}</span>
          </button>
          <button className={`main__button button--reconnect ${reconnected ? 'state--reconnected' : ''}`} type="button" onClick={reconnectButtonClickHandler}>
            <svg className="main__button__icon" width="20" height="20" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g><path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25 c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826	c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514	c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" /></g></svg>
            <span className="main__button__text">{'Reconnect'}</span>
          </button>
        </div>
      </section>

      <section className="horizontal">

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1583125311319-300af4db4abc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1998&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1573616420487-df5d87ba9594?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1567376783778-8878fdda7871?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1565038914410-bceb20161823?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1567146295017-af5941244fbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        {/* <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1556424163-81bc36b07e24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div> */}

        {/* <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1505004607697-46e7f7ed7731?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div> */}

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1570327920374-cad141a2d341?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="horizontal__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1578953600642-0b88f8aeb66a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

      </section>

      <section className="vertical">

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1583125311319-300af4db4abc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1998&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1573616420487-df5d87ba9594?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1567376783778-8878fdda7871?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1565038914410-bceb20161823?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1567146295017-af5941244fbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1556424163-81bc36b07e24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1505004607697-46e7f7ed7731?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1570327920374-cad141a2d341?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

        <div className="vertical__image">
          <img className="js-lazyload" width="300" height="300" data-src="https://images.unsplash.com/photo-1578953600642-0b88f8aeb66a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKAAQMAAAA2A1tgAAAAA1BMVEXb29tVa/CDAAAASElEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiDsqAAAHRK0/GAAAAAElFTkSuQmCC" alt="test" />
        </div>

      </section>

      <div className="component">
        <LazyImage className="component__image" width="200" height="200" alt="LazyImage" src="https://images.unsplash.com/photo-1576173992415-e0ca34dc0a8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80" />

        <LazyImage className="component__image" width="300" height="300" alt="LazyImage" src="https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80" />
      </div>

    </section >
  );
}

export default App;
