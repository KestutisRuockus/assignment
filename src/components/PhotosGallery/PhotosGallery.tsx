import { useEffect, useState } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./photo-gallery.css";
import PhotoModal from "../PhotoModal/PhotoModal";

type PhotosProps = {
  photos: {
    photoId: string;
    ownerId: string;
    realname?: string;
    username?: string;
    title: string;
    server: string;
    secret: string;
  }[];
};

type ModalWindowProps = {
  photoId: string;
  ownerId: string;
  realname?: string;
  username?: string;
  server: string;
  secret: string;
  title: string;
} | null;

// container to store all photos
// @param {Object} props - The props object.
// @param {Array} props.photos - The list of items.
// @retuns {JSX.Element} - Infinite scroll Component that contains all fetched PhotoCard components.
const PhotosGallery = ({ photos }: PhotosProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalWindowDetails, setModalWindowDetails] =
    useState<ModalWindowProps | null>(null);

  useEffect(() => {
    document.body.style.overflowY = isModalOpen ? "hidden" : "unset";
  }, [isModalOpen]);

  return (
    <div className="container">
      {isModalOpen ? (
        <PhotoModal
          setIsModalOpen={setIsModalOpen}
          modalWindowDetails={modalWindowDetails}
        />
      ) : (
        ""
      )}
      <div className="photo-gallery">
        {photos.map((photo, index) => (
          <PhotoCard
            key={index}
            photo={photo}
            setIsModalOpen={setIsModalOpen}
            setModalWindowDetails={setModalWindowDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotosGallery;
