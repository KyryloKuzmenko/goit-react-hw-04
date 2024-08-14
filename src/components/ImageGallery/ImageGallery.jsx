import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css'

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => (
        <li key={image.id} onClick={() => openModal(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
