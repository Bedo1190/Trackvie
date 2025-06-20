import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "/Users/bedrishwayze/Desktop/Freevie/trackvie/Web/src/firebase.js";
import Card from "./Card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedCard = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

function Homepage() {
  const [shows, setShows] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const loaderRef = useRef(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!user) return console.log("not logged in");
    const unsub = onSnapshot(
      collection(db, `Users/${user.uid}/savedShows`),
      (snapshot) => {
        const updatedShows = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShows(updatedShows);
      }
    );

    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (visibleCount >= shows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 5, shows.length));
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [shows, visibleCount]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const header = document.getElementById("a");

      if (!header) return;

      if (scrollTop > lastScrollTop) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredShows = shows.filter(show =>
    show.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledWrapper>
      <div id="a">
        <div className="inside" id="middle">
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" />
            <span />
            <span />
            <span />
          </label>
          <div className="right-section">
            <form action="">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="searchbar"
                  id="searchbar"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </form>
            <div className="little">k</div>
            <div className="little">l</div>
            <div className="little">m</div>
            <div className="inside" id="logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>
      </div>

      <div id="b">
       {filteredShows.length === 0 ? (
          <p style={{ color: "#fe4a49", fontSize: "5em", textAlign: "center", width: "100%", fontFamily:"League Spartan" }}>
            No results found. <i class="fa-regular fa-face-sad-cry"></i>
          </p>
        ) : (
          filteredShows.slice(0, visibleCount).map((show, index) => (
            <AnimatedCard key={show.id || index} delay={index * 0.1}>
              <Card url={show.url} title={show.title} />
            </AnimatedCard>
          ))
        )}

        <div
          ref={loaderRef}
          style={{ height: "1px", marginTop: "20px", background: "transparent" }}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--mainbg);
  background-size: var(--mainbg-size);

  #a {
    position: sticky;
    top: 0;
    z-index: 999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 6px 6px 0px;
    background-color: #1d1d1d;
    height: 60px;
    @media screen and (max-width: 550px) {
      padding: 6px 0px 6px 0px;
    }
    transition: top 0.3s ease;
  }

  #a.hidden {
    top: -100px; 
  }

  .inside {
    border: 1px solid #fe4a49;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    font-size: 18px;
    border-radius: 8px;
    background-color: #2a2a2a;
    color: #fe4a49;
  }

  #middle {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0 16px;
    gap: 12px;
  }

  .right-section {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .input-wrapper {
    position: relative;
    width: 23vh;
    transition: width 0.3s ease;
  }

  .input-wrapper:hover {
    width: 32vh;
  }

  input {
    border: 1px solid #fe4a49;
    border-radius: 16px;
    background-color: #3c3c3c;
    color: white;
    padding: 6px 36px 6px 12px;
    width: 100%;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
  }

  i.fa-solid.fa-magnifying-glass {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #fe4a49;
    pointer-events: none;
    font-size: 16px;
  }

  .little {
    padding: 6px 10px;
    font-size: 16px;
    border: 1px solid #fe4a49;
    border-radius: 6px;
    background-color: #2a2a2a;
    color: #fe4a49;
    @media screen and (max-width: 550px) {
      display: none;
    }
  }

  .little:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }

  .burger {
    position: relative;
    width: 30px;
    height: 22px;
    cursor: pointer;
    display: block;
    margin-left: 10px;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #fe4a49;
    border-radius: 9px;
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0;
  }

  .burger span:nth-of-type(2) {
    top: 9px;
  }

  .burger span:nth-of-type(3) {
    top: 18px;
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 9px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 9px;
  }

  #b {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 70px;
    align-content: flex-start;
    justify-content: space-between;
    background: transparent;
    margin-bottom: 5em;
    @media screen and (max-width: 550px) {
      justify-content: center;
    }
  }

  Card:hover {
    background-color: #fe4a49;
  }

  #logout:hover {
    background-color: #3c3c3c;
    transform: scale(1.1);
    transition: 0.3s ease;
    cursor: pointer;
    type: button;
  }
`;

export default Homepage;
