import styled from 'styled-components';

function CardSkeleton(){
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__skeleton card__title" />
        <div className="card__skeleton card__description"/> 
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: inherit;
    padding: 1rem;
    text-align: center;
    border-radius: .8rem;
    background-color: #1d1d1d;
  }

  .card__skeleton {
    background-image: linear-gradient(
  		90deg,
  		#3c3c3c 0px,
  		rgb(254 74 73 / 90%) 40px,
  		#3c3c3c 80px
  	);
    background-size: 300%;
    background-position: 100% 0;
    border-radius: inherit;
    animation: shimmer 2.5s infinite;
  }

  .card__title {
    height: 15px;
    margin-bottom: 15px;
  }

  .card__description {
    height: 100px;
  }

  @keyframes shimmer {
    to {
      background-position: -100% 0;
    }
  }`;

export default CardSkeleton;
