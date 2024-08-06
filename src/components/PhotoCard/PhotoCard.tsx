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

// single photo component
const PhotoCard = ({ photo }: PhotoProps) => {
  const imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;

  return (
    <div className="photo-card">
      <img src={imgSrc} alt={photo.title} />
      <div className="info">
        <div className="details">
          <h1>{photo.title}</h1>
          <div className="dash"></div>
          <h2>{photo.owner}</h2>
        </div>
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default PhotoCard;
