import { Photo } from "../APP/App.types";

export interface ImageGalleryProps {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}