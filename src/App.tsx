import { useEffect, useState } from "react";
import PhotosGallery from "./components/PhotosGallery/PhotosGallery";

type NewItemsToLoadProps = {
  id: string;
  owner: string;
}[];
type LoadedItemsProps = {
  id: string;
  owner: string;
  title: string;
  server: string;
  secret: string;
}[];

function App() {
  const [newItemsToLoad, setNewItemsToLoad] = useState<NewItemsToLoadProps>([]);
  const [loadedItems, setLoadedItems] = useState<LoadedItemsProps>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${
        import.meta.env.VITE_API_KEY
      }&format=json&nojsoncallback=1&page=${page}&per_page=2`
    )
      .then((response) => response.json())
      .then((data) => {
        const list = data.photos.photo.map(
          (item: {
            id: string;
            owner: string;
            title: string;
            server: string;
            secret: string;
          }) => {
            const { id, owner, title, server, secret } = item;
            return { id, owner, title, server, secret };
          }
        );

        setNewItemsToLoad(list);
      });
  }, [page]);

  useEffect(() => {
    const fetchNewItems = async () => {
      newItemsToLoad.map(async (item) => {
        const response = await fetch(
          `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${
            import.meta.env.VITE_API_KEY
          }&photo_id=${item.id}&format=json&nojsoncallback=1`
        );

        const result = await response.json();
        const newItem = {
          id: result.photo.id,
          owner: result.photo.owner.realname,
          title: result.photo.title._content,
          server: result.photo.server,
          secret: result.photo.secret,
        };

        setLoadedItems((prev) => [...prev, newItem]);
      });
    };
    fetchNewItems();
  }, [newItemsToLoad]);

  return (
    <div>
      <PhotosGallery photos={loadedItems} />
    </div>
  );
}

export default App;
