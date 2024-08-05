import PhotoCard from "../PhotoCard/PhotoCard";
import "./photo-gallery.css";

const photo = {
  title: "Just Something",
  author: "John Doe",
  imageUrl: "https://picsum.photos/300/200",
};

const PhotosGallery: React.FC = () => {
  return (
    <div className="photo-gallery">
      <PhotoCard photo={photo} />
    </div>
  );
};

export default PhotosGallery;
