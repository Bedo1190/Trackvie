import styled from "styled-components";

function Card({ url, title }) {
  const openInNewTab = () => {
    window.open(url, "_blank");
  };

  const getDisplayName = (fullUrl) => {
    try {
      const hostname = new URL(fullUrl).hostname;
      return hostname.replace("www.", "").split(".")[0];
    } catch {
      return "unknown";
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
        "spotify"
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
            onClick={(e) => e.stopPropagation()}
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
          <span className="showName">{getDisplayName(url)}</span>
        </div>

        {/* Sliding Info */}
        <div className="sliding-info">
          <p>{title}</p>
        </div>
      </div>
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
  }

  .wrapper:hover {
    background-color: #fe4a49;
    transform: scale(1.1);
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
    transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
    background-color: #2b2b2b;
    color: white;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: center;
  }

  .wrapper:hover .sliding-info {
    max-height: 100px;
    opacity: 1;
    padding: 10px;
  }
`;

export default Card;
