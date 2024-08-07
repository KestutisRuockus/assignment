import { useEffect, useState } from "react";
import "./photoCard.css";

type PhotoProps = {
  photo: {
    id: string;
    owner: string;
    title: string;
    server: string;
    secret: string;
  };
};

type ItemsListProps = {
  id: string;
  owner: string;
  title: string;
  server: string;
  secret: string;
}[];

type SingleItemProps = {
  id: string;
  owner: string;
  title: string;
  server: string;
  secret: string;
};

// single photo component
// @param {Object} props - The props object.
// @param {Object} props.photo - single photo object
// @returns {JSX.Element} - The rendered component of single photo.
const PhotoCard = ({ photo }: PhotoProps) => {
  // get image source URL from Flickr API
  const imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;

  // boolean property to determine if photo is saved in local storage
  const [isPhotoInFavourite, setIsPhotoInFavourite] = useState<boolean | null>(
    null
  );

  // check if photo exist in favourite list on component mount
  useEffect(() => {
    setIsPhotoInFavourite(checkOrPhotoIsInFavouriteList(photo.id));
  }, []);

  // toggle favourite status
  // @param {Object} photo - single photo object
  // @returns {void} save the updated list to local storage.
  const toggleFavourite = (photo: SingleItemProps): void => {
    setIsPhotoInFavourite(!isPhotoInFavourite);

    const favouriteList: ItemsListProps = getFavouriteList();
    let updatedList: ItemsListProps;

    // IF photo exist in favourite list then filter(delete it from list) and save. ELSE concatenation of favourite list and new item, then save
    if (isPhotoInFavourite) {
      updatedList = favouriteList.filter((item) => item.id !== photo.id);
      console.log("IF, updatedList:");
      console.log(updatedList);
      saveToFavouritesList(updatedList);
      setIsPhotoInFavourite(false);
    } else {
      updatedList = [...favouriteList, photo];
      console.log("ELSE, updatedList:");
      console.log(updatedList);
      saveToFavouritesList(updatedList);
      setIsPhotoInFavourite(true);
    }
  };

  // check if photo is in favourite list
  // @param {string} id - id of the photo
  // @returns {boolean} true if photo is in favourite list, false otherwise.
  const checkOrPhotoIsInFavouriteList = (id: string): boolean => {
    const favouriteList: ItemsListProps = JSON.parse(
      localStorage.getItem("flickr-favourites") || ""
    );
    return favouriteList.some((item) => item.id === id);
  };

  // get favourite list from local storage
  // @returns {ItemsListProps} favourite list from local storage. Or empty array if local storage does not contain favourite list. 0 length array.
  const getFavouriteList = (): ItemsListProps => {
    return JSON.parse(localStorage.getItem("flickr-favourites") || "");
  };

  // save favouriteList to local storage
  // @param {ItemsListProps} items - favourite list to be saved.
  // @returns {void} save the updated list to local storage.
  const saveToFavouritesList = (items: ItemsListProps): void => {
    localStorage.setItem("flickr-favourites", JSON.stringify(items));
  };

  return (
    <div className="photo-card">
      <img src={imgSrc} alt={photo.title} />
      <div className="info">
        <div className="details">
          <h1>{photo.title}</h1>
          <div className="dash"></div>
          <h2>{photo.owner}</h2>
        </div>
        <button type="button" onClick={() => toggleFavourite(photo)}>
          {isPhotoInFavourite ? "Remove From Favourites" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
