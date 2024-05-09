export interface ImageModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  onRequestClose: () => void;
}