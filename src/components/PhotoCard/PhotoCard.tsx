import { useEffect, useState } from "react";
import "./photoCard.css";
import {
  toggleFavourite,
  checkOrPhotoIsInFavouriteList,
} from "../../utils/HandlePhotoFavouriteStatus";

type PhotoProps = {
  photo: {
    id: string;
    owner: string;
    title: string;
    server: string;
    secret: string;
  };
};

// single photo component
// @param photo - single photo object
// @returns Single photo component
const PhotoCard = ({ photo }: PhotoProps) => {
  // boolean property to determine if photo is saved in local storage
  const [isPhotoInFavourite, setIsPhotoInFavourite] = useState<boolean | null>(
    null
  );

  // check if photo exist in favourite list on component mount
  useEffect(() => {
    setIsPhotoInFavourite(checkOrPhotoIsInFavouriteList(photo.id));
  }, []);

  return (
    <div className="photo-card">
      <img
        alt={photo.title}
        loading="lazy"
        // sizes="100vw"
        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        srcSet={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg 320w, 
                https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg 768w,
                https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg 1024w,
                https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg 1280w,
                https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg 1440w,
                `}
      />
      <div className="info">
        <div className="details">
          <h1>{photo.title}</h1>
          <div className="dash"></div>
          <h2>{photo.owner}</h2>
        </div>
        <button
          type="button"
          onClick={() =>
            toggleFavourite(photo, setIsPhotoInFavourite, isPhotoInFavourite)
          }
        >
          {isPhotoInFavourite ? "Remove From Favourites" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
