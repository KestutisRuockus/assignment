import { useEffect, useState, useRef } from "react";
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
  // create key in localStorage if it does not exist
  const checkLocalStorage = localStorage.getItem("flickr-favourites");
  if (checkLocalStorage === null || checkLocalStorage === "")
    localStorage.setItem("flickr-favourites", JSON.stringify([]));

  const [newItemsToLoad, setNewItemsToLoad] = useState<NewItemsToLoadProps>([]);
  const [loadedItems, setLoadedItems] = useState<LoadedItemsProps>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const bottomOfScreenRef = useRef<HTMLDivElement>(null);

  // on page mount fetch photos info. Or when user scroll to botton of screen fetch photos info from next page;
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${
        import.meta.env.VITE_API_KEY
      }&format=json&nojsoncallback=1&page=${page}&per_page=10`
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
        setLoading(false);
      });
  }, [page]);

  // fetch new photos info for image rendering;
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

  // Observ or bottom of screen was reached, when reached fetch new photos info;
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (bottomOfScreenRef.current) {
      observer.observe(bottomOfScreenRef.current);
    }

    return () => {
      if (bottomOfScreenRef.current) {
        observer.unobserve(bottomOfScreenRef.current);
      }
    };
  }, [bottomOfScreenRef, loading]);

  return (
    <div>
      <PhotosGallery photos={loadedItems} />

      {/* If new photos are loading display this message */}
      {loading && <div>Loading...</div>}

      {/* reference point to fetch new photos */}
      <div ref={bottomOfScreenRef}></div>
    </div>
  );
}

export default App;
