import style from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ showLoadMore, isLoading, loadMore }) => {
    if (!showLoadMore || isLoading) return null;

    return (
        <button className={style.loadMoreBtn} onClick={loadMore}>
            Load more
        </button>
    );
};

export default LoadMoreBtn;