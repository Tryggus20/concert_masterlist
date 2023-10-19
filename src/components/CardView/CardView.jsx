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
    useSelector((store) => store.concertCard.concertCardReducer) || []; // Access concertCard properly
  console.log(concertCard, "&&&&&&&&&&&&&&&&&&&&&&&");

  useEffect(() => {
    dispatch({ type: "FETCH_CARD_VIEW", payload: user });
    console.log(concertCard, "========================");
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (CardView):</h4>
      <div>
        <section className="concertCard">
          {concertCard.map((concert) => (
            <div 
              className="concert-card card-border card-content"
              key={concert.id}
              onClick={() => history.push(`/details/${concert.id}`)}
            >
              <div >
                <p>Date: {concert.date}</p>
              </div>
              <div>
                <img style={{ maxHeight: '250px', maxWidth: '250px' }}
                  src={concert.pictureurl || "placeholder-url.jpg"}
                  alt="Concert"
                />
              </div>
              <div>
                {concert.bands.map((band, index) => (
                  <p key={index}>{band}</p>
                ))}
              </div>
              <div>
                <p>Venue: {concert.venue}</p>
                <p>City: {concert.city}</p>
                <p>State: {concert.state}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

export default CardView;
