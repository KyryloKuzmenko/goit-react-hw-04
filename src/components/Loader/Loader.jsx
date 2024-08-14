import { MagnifyingGlass } from 'react-loader-spinner';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loader}>
      <MagnifyingGlass />
    </div>
  );
};

export default Loader;
