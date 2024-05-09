import { Photo } from "../APP/App.types";

export interface ImageCardProps {
  photo: Photo;
  onImageClick: (photo: Photo) => void;
}
