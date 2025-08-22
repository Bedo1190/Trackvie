import styled from "styled-components";
import { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";

function Card({ id, url, title }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".three-dot-button") &&
        !e.target.closest("#dropdown-menu")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openInNewTab = () => {
    window.open(url, "_blank");
  };

  const handleFavorite = async (e) => {
  e.stopPropagation();
  if (!user) return;

  try {
    const ref = doc(db, `Users/${user.uid}/savedShows`, id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const currentFavorited = snap.data().favorited || false;

    await updateDoc(ref, { favorited: !currentFavorited });
  } catch (err) {
    console.error("Error toggling favorite:", err);
  }
};

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!user) return;
    try {
      const ref = doc(db, `Users/${user.uid}/savedShows`, id);
      await deleteDoc(ref);
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting doc:", err);
    }
  };

  const changeIcons = (url) => {
    if (!url || typeof url !== "string") {
      return <i className="fa-solid fa-question"></i>;
    }

    try {
      const hostname = new URL(url).hostname;
      const domain = hostname.replace("www.", "").split(".")[0];

      const knownBrands = [
        "youtube",
        "github",
        "x",
        "reddit",
        "facebook",
        "linkedin",
        "instagram",
        "tiktok",
        "spotify",
      ];

      if (knownBrands.includes(domain)) {
        return <i className={`fa-brands fa-${domain}`} id="brand"></i>;
      }

      return <i className="fa-solid fa-question" id="brand"></i>;
    } catch {
      return <i className="fa-solid fa-question" id="brand"></i>;
    }
  };

  return (
    <StyledWrapper>
      <div className="wrapper" onClick={openInNewTab}>
        <div className="top">
          {changeIcons(url)}
          <button
            type="button"
            className="three-dot-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown((prev) => !prev);
            }}
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </button>
        </div>
        <div className="bottom">
          <span className="icon">
            <i className="fa-solid fa-circle-play"></i>
          </span>
          <span className="showName">{title}</span>
        </div>

        <div className="sliding-info">
          <p>{title}</p>
        </div>
      </div>

      {showDropdown && (
        <div id="dropdown-menu" className="show">
          <div className="dropdown-item" onClick={handleFavorite}>
            <span className="tooltip">fav</span>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="dropdown-item" onClick={handleDelete}>
            <span className="tooltip">delete</span>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper {
    width: 220px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: 0.3s ease;
    overflow: hidden;
    background-color: #1d1d1d;
    border: 1px solid #fe4a49;
    position:relative;
  }

  .wrapper:hover {
    background-color: #fe4a49;
    transform: scale(1.1);
  }

      #dropdown-menu {
        position: absolute;
        right: -20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        top: 0px;
        gap: 5px;
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        transform: translateY(10px);
        transition: all 0.3s ease;
      }

      #dropdown-menu.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .dropdown-item {
        background-color: transparent;
        width: 10px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
        border-radius: 50%;
        border: 1px solid #FE4A49;
        color: #FE4A49;
        opacity: 0;
        transform: translateY(20px);
        animation: dropIn 0.3s ease forwards;
      }
      .dropdown-item .tooltip {
        position: absolute;
        right: 120%; /* place it to the left of the icon */
        top: 50%;
        transform: translateY(-50%);
        background-color: #FE4A49;
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
      }

      /* Show tooltip on hover */
      .dropdown-item.show-tooltip .tooltip {
        opacity: 1;
      }

      .dropdown-item:nth-child(1) {
        animation-delay: 0.05s;
      }
      .dropdown-item:nth-child(2) {
        animation-delay: 0.1s;
      }
      .dropdown-item:nth-child(3) {
        animation-delay: 0.15s;
      }

      @keyframes dropIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .dropdown-item:hover {
        background-color: #FE4A49;
        color: white;
      }

  
    .showName {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 50%; /* or a fixed width like 200px if needed */
}

  #brand {
    font-size: 2em;
    transition: 0.3s ease;
  }

  #brand:hover {
    transform: scale(1.1);
  }

  .top,
  .bottom {
    position: relative;
    font-size: 18px;
    margin: 3px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: 5px;
    overflow: hidden;
    background-color: #1d1d1d;
  }

  .icon {
    margin-right: 8px;
    color: #fe4a49;
  }

  .three-dot-button {
    position: absolute;
    top: 10px;
    right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: 0.3s ease;
    z-index: 9999;
  }

  .three-dot-button:hover {
    transform: scale(1.2);
  }

  .dot {
    width: 6px;
    height: 6px;
    background-color: #fe4a49;
    border-radius: 50%;
  }

  .sliding-info {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease;
    background-color: #2b2b2b;
    color: white;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: center;
  }

  .wrapper:hover .sliding-info {
    max-height: 200px;
    opacity: 1;
    padding: 10px;
  }
`;

export default Card;
