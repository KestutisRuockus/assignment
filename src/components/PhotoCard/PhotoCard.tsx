import "./photoCard.css";

type PhotoProps = {
  photo: {
    title: string;
    author: string;
    imageUrl: string;
    // handleFavourite: () => void;
  };
};

const PhotoCard = ({ photo }: PhotoProps) => {
  return (
    <div className="photo-card">
      <img src={photo.imageUrl} alt="random img" />
      <div className="info">
        <div className="details">
          <h1>{photo.title}</h1>
          <div className="dash"></div>
          <h2>{photo.author}</h2>
        </div>
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default PhotoCard;
