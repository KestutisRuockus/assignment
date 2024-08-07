import PhotoCard from "../PhotoCard/PhotoCard";
import "./photo-gallery.css";

type PhotosProps = {
  photos: {
    id: string;
    owner: string;
    title: string;
    server: string;
    secret: string;
  }[];
};

// container to store all photos
// @param {Object} props - The props object.
// @param {Array} props.photos - The list of items.
// @retuns {JSX.Element} - Infinite scroll Component that contains all fetched PhotoCard components.
const PhotosGallery = ({ photos }: PhotosProps) => {
  return (
    <div className="photo-gallery">
      {photos.map((photo, index) => (
        <PhotoCard key={index} photo={photo} />
      ))}
    </div>
  );
};

export default PhotosGallery;
