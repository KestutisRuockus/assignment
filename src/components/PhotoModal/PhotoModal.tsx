import { Dispatch, SetStateAction, useState } from "react";
import "./photoModal.css";

type ModalWindowProps = {
  id: string;
  ownerId: string;
  realname?: string;
  username?: string;
  server: string;
  secret: string;
} | null;

type PhotoModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalWindowDetails: ModalWindowProps;
};

const PhotoModal = ({
  setIsModalOpen,
  modalWindowDetails,
}: PhotoModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="modal-container">
      <div className="modal">
        <a
          href={`https://live.staticflickr.com/${modalWindowDetails?.server}/${modalWindowDetails?.id}_${modalWindowDetails?.secret}_b.jpg`}
          target="_blank"
        >
          <img
            className={`${isLoading ? "image-loading-animation" : ""} `}
            src={`https://live.staticflickr.com/${modalWindowDetails?.server}/${modalWindowDetails?.id}_${modalWindowDetails?.secret}_b.jpg`}
            alt="r"
            onLoad={() => setIsLoading(false)}
          />
        </a>
        <div className="user-details">
          <div>
            <h1 className={`${isLoading ? "details-loading" : ""} `}>
              Author:
            </h1>
            <h2 className={`${isLoading ? "details-loading" : ""} `}>
              {modalWindowDetails?.realname
                ? modalWindowDetails.realname
                : "Author unknown"}
            </h2>
          </div>
          <div>
            <h1 className={`${isLoading ? "details-loading" : ""} `}>
              username:
            </h1>
            <h2 className={`${isLoading ? "details-loading" : ""} `}>
              {modalWindowDetails?.username
                ? modalWindowDetails.username
                : "Username unknown"}
            </h2>
          </div>
        </div>
      </div>
      <div onClick={() => setIsModalOpen(false)} className="close-btn">
        X
      </div>
    </div>
  );
};

export default PhotoModal;
