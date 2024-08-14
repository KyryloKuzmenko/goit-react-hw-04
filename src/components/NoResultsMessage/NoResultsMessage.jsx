import style from './NoResultsMessage.module.css'

const NoResultsMessage = () => {
    return (
      <div className={style.div}>
        <p className={style.p}>Search returned no results</p>
      </div>
    );
}


export default NoResultsMessage;