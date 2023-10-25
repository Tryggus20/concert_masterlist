import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CardView.css"; 


function CardView() { 
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const concertCard =
    useSelector((store) => store.concertCard.concertCardReducer) || []; 

  useEffect(() => {
    dispatch({ type: "FETCH_CARD_VIEW", payload: user });
  }, []);
  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (CardView):</h4>
      <div>
        <section className="concertCard">
               {/* map over concertCard here  */}
          {concertCard.map((concert, index) => (
            <div 
              className="concert-card card-border card-content card"
              key={index}
              onClick={() => history.push(`/details/${concert.userconcertid}`)}
            >
              <div >
                <br />
                <p>Date: {new Date(concert.date).toLocaleDateString()}</p>
              </div>
              <div>
                <img style={{ maxHeight: '250px', maxWidth: '250px' }}
                  src={concert.pictureurl || "https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg"}  // ADD image here!!!!!!
                  alt="Concert"
                />
              </div>
              <div>
                {concert.bands.map((band, index) => (
                  <p className="bold" key={index}>{band}</p>
                  ))}
              </div>
              <div>
                <p> {concert.venue} in {concert.city}, {concert.state}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default CardView;
