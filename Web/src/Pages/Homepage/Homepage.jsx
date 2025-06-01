import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "/Users/bedrishwayze/Desktop/Freevie/trackvie/Web/src/firebase.js"; // adjust path if needed
import Card from "./Card";

function Homepage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
      const unsub = onSnapshot(
        collection(db, "Users/id-2/savedShows"),
        (snapshot) => {
          const updatedShows = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setShows(updatedShows);
        }
      );

      return () => unsub(); // Cleanup on unmount
    }, []);


  return (
    <StyledWrapper>
      <div id="a">
        <div className="inside">
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" />
            <span />
            <span />
            <span />
          </label>
        </div>
        <div className="inside" id="middle">
          <form action="">
            <div className="input-wrapper">
              <input type="text" name="searchbar" id="searchbar" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </form>
          <div className="little">k</div>
          <div className="little">l</div>
          <div className="little">m</div>
        </div>
        <div className="inside">z</div>
      </div>
      <div id="b">
        {shows.map((show, index) => (
          <Card key={index} url={show.url} />
        ))}
      </div>

      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1);
  grid-gap: 20px 20px;
  background: var(--mainbg);
  background-size: var(--mainbg-size);
  min-height: 100vh;


  div {
    background-color: #1d1d1d;
    color: #fe4a49;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }

  #a, #b {
    grid-column-start: 1;
    grid-column-end: 7;
  }

  #a {
  position: sticky;
  top: 0;
  z-index: 999999;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

  #b {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 70px;
    align-content: flex-start;
    justify-content: space-between;
    background: transparent;
  }


  .inside {
    border: solid #fe4a49;
    padding: 20px 20px;
    flex: 0 0 auto;
  }

  #middle {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    gap: 20px;
  }

  .input-wrapper {
    position: relative;
    width: 200px;
    transition: width 0.3s ease;
  }

  .input-wrapper:hover {
    width: 320px;
  }

  input {
    border: solid thin #fe4a49;
    border-radius: 20px;
    background-color: #3c3c3c;
    outline: none;
    color: white;
    padding: 8px 40px 8px 12px;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
    transition: width 0.3s ease;
  }

  i.fa-solid.fa-magnifying-glass {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #fe4a49;
    pointer-events: none;
    font-size: 20px;
  }

   .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: #fe4a49;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;}

  .little {
    border: solid #fe4a49;
    padding: 20px 20px;
    flex: 0 0 auto;
  }

  .little:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }
  Card:hover{
    background-color: #fe4a49;
  }
`;

export default Homepage;
