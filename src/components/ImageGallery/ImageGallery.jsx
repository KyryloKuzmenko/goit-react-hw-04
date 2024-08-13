import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css'

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
