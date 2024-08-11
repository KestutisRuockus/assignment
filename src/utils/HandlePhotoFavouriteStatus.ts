/**
 * This file manages the status of photos in the Favourite List.
 *
 * It provides functions to:
 * - Save a photo to `localStorage`.
 * - Delete a photo from `localStorage`.
 */

import { Dispatch, SetStateAction } from "react";

type ItemsListProps = {
  id: string;
  ownerId: string;
  realname?: string;
  username?: string;
  title: string;
  server: string;
  secret: string;
}[];

type SingleItemProps = {
  id: string;
  ownerId: string;
  realname?: string;
  username?: string;
  title: string;
  server: string;
  secret: string;
};

// toggle favourite status
// @param photo - single photo object
// @returns boolean value
export const toggleFavourite = (
  photo: SingleItemProps,
  setIsPhotoInFavourite: Dispatch<SetStateAction<boolean | null>>,
  isPhotoInFavourite: boolean | null
): void => {
  setIsPhotoInFavourite(!isPhotoInFavourite);

  const favouriteList: ItemsListProps = getFavouriteList();
  let updatedList: ItemsListProps;

  // IF photo exist in favourite list then filter(delete it from list) and save. ELSE concatenation of favourite list and new item, then save
  if (isPhotoInFavourite) {
    updatedList = favouriteList.filter((item) => item.id !== photo.id);
    saveToFavouritesList(updatedList);
    return setIsPhotoInFavourite(false);
  } else {
    updatedList = [...favouriteList, photo];
    saveToFavouritesList(updatedList);
    return setIsPhotoInFavourite(true);
  }
};

// check if photo is in favourite list
// @param id - id of the photo
// @returns TRUE if photo is in favourite list, FALSE otherwise.
export const checkOrPhotoIsInFavouriteList = (id: string): boolean => {
  const favouriteList: ItemsListProps = JSON.parse(
    localStorage.getItem("flickr-favourites") || ""
  );
  return favouriteList.some((item) => item.id === id);
};

// get favourite list from local storage
// @returns favourite list from local storage. Or empty array if local storage does not contain favourite list. 0 length array.
export const getFavouriteList = (): ItemsListProps => {
  return JSON.parse(localStorage.getItem("flickr-favourites") || "");
};

// save favouriteList to local storage
// @param items - favourite list to be saved.
// @returns VOID
const saveToFavouritesList = (items: ItemsListProps): void => {
  localStorage.setItem("flickr-favourites", JSON.stringify(items));
};
