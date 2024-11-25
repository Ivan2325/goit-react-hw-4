import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoad }) => {
  return (
    <div className={s.box}>
      <button className={s.button} type="button" onClick={onLoad}>
        Load more 
      </button>
    </div>
  );
};

export default LoadMoreBtn;
