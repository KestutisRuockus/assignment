import { useEffect, useState } from "react";
import "./photoCard.css";
import {
  toggleFavourite,
  checkOrPhotoIsInFavouriteList,
} from "../../utils/HandlePhotoFavouriteStatus";

type PhotoProps = {
  photoId: string;
  ownerId: string;
  realname?: string;
  username?: string;
  title: string;
  server: string;
  secret: string;
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

type PhotoCardProps = {
  photo: PhotoProps;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalWindowDetails: React.Dispatch<React.SetStateAction<ModalWindowProps>>;
};

// single photo component
// @param photo - single photo object
// @returns Single photo component
const PhotoCard = ({
  photo,
  setIsModalOpen,
  setModalWindowDetails,
}: PhotoCardProps) => {
  const [isPhotoInFavourite, setIsPhotoInFavourite] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // check if photo exist in favourite list on component mount
  useEffect(() => {
    setIsPhotoInFavourite(checkOrPhotoIsInFavouriteList(photo.photoId));
  }, []);

  return (
    <div
      onClick={() => {
        setModalWindowDetails(photo);
        setIsModalOpen(true);
      }}
      className="photo-card"
    >
      <div className="loading-message loading-message-animation">
        {isLoading ? "Loading..." : ""}
      </div>
      <img
        className="image-loading-animation"
        alt={photo.title}
        loading="lazy"
        src={`https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}.jpg`}
        srcSet={`https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}_m.jpg 320w, 
                https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}_n.jpg 768w,
                https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}_w.jpg 1024w,
                https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}.jpg 1280w,
                https://live.staticflickr.com/${photo.server}/${photo.photoId}_${photo.secret}_c.jpg 1440w,
                `}
        onLoad={() => setIsLoading(false)}
      />

      <div className="info">
        <div className="details">
          <h1>{photo.title}</h1>
          <div className="dash"></div>
          <h2>{photo.realname}</h2>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(photo, setIsPhotoInFavourite, isPhotoInFavourite);
          }}
        >
          {isPhotoInFavourite ? "Remove From Favourites" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
