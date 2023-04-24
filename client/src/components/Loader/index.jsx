import cls from './loader.module.scss';

import React from 'react';

const Loader = () => {
  return (
    <div className={cls.root}>
      <svg
        version="1.1"
        id="Слой_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 86.6 74.7"
        xmlSpace="preserve">
        <title>Ресурс 1</title>
        <path d="M45.3,5c2.8,1.9,5.5,3.7,8.3,5.6" />
        <g>
          <g id="Слой_1-2">
            <circle cx="71.4" cy="59.5" r="14.7" />
            <g className={cls.hammer}>
              <path d="M81.5,29.8l-28-19.2l-5.3,7.7l-6.5,9.4l6.8,9.7c0.6,0.9,1.7,1.3,2.7,1L81.5,29.8z" />
              <path
                d="M43.6,3.9L30.3,0.6c-2-0.5-4.4,1-5.5,3.3l-2.9,6c-1.3,2.7-0.4,5.4,2,5.8l10.4,1.6l9.5-13.2
			C43.7,4,43.6,4,43.6,3.9z"
              />
              <path
                d="M35.3,16.7L0.9,66.7c-0.7,0.9-0.5,2.3,0.5,2.9c0,0,0.1,0,0.1,0.1l6.1,4.2c1,0.7,2.3,0.4,3-0.5c0,0,0,0,0,0
			l31.3-45.7l-6.2-8.9C35.2,18.1,35.1,17.4,35.3,16.7z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
