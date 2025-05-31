import styled from "styled-components";
function Card() {
    
    return(
        <StyledWrapper>
            <div className="top">x</div>
            <div className="bottom">y</div>

        </StyledWrapper>
    );
}
const StyledWrapper = styled.div`
  width:100%;
  height:100%;
  background: var(--secondarybg-dark);
  background-size: var(--secondarybg-dark-size);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  div{
    font-size:40px;
    margin: 3px;
    width:100%;
    border:solid thin #fe4a49;
    flex-grow:1;
  }
`;
export default Card;