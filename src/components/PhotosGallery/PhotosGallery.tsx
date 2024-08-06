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

// container to store all photos components
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
