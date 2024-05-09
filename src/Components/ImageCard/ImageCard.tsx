import css from "./ImageCard.module.css";
import { ImageCardProps } from "./ImageCard.types";


const ImageCard: React.FC<ImageCardProps> = ({ photo, onImageClick }) => {
  return (
    <div>
      <img
        onClick={() => onImageClick(photo)}
        className={css.image}
        src={photo.urls.small}
        alt={photo.description}
      />
    </div>
  );
};

export default ImageCard;
