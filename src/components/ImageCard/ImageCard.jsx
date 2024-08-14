
const ImageCard = ({image}) => {
    return (
      <div>
        <img src={image.urls.small} alt={image.urls.description} />
      </div>
    );
}

export default ImageCard;