import React from "react";
import css from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.types";


const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onIncrement }) => {
  return (
    <div>
      <button
        className={css.loadMoreBtn}
        type="button"
        onClick={() => onIncrement()}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
