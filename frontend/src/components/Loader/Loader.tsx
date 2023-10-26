import './loader.css';

import { LoaderProps } from '../../types/types';

function Loader({ className }: LoaderProps) {
  const containerClassName = className ? `loader__container ${className}` : 'loader__container';

  return (
    <div className={containerClassName}>
      <span className='loader'></span>
    </div>
  );
}

export default Loader;
