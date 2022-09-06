import * as React from 'react';
import Loader from 'react-loader-spinner';

function LoaderButton({ style, text, loading, width, height, onClick }) {
  return (
    <button className={style} disabled={loading} onClick={onClick} type='button'>
      {loading ? <Loader type='Grid' color='#ffffff' height={height} width={width} /> : text}
    </button>
  );
}

export default LoaderButton;
