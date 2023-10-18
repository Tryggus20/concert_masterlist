import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

// TODO: NEED TO INTEGRATE INTO APP AND INTO NAV/ROUTES

export default function ConcertForm() {



    return (
    <div className='inputs'>
<h1>Add A New Concert!</h1>
{/* TODO: WILL NEED TO CONDITIONALLY RENDER BUTTONS FOR BANDS AND IMAGES.
    AND KEEPING THEM LINKED TO THE SPECIFIC BAND / CONCERT
     (BUTTON ADDS COMPONENT OF BAND INPUT SAME FOR PICTURES) */}
<label>Date:<input type="date" id="date" /></label>
<br/>
<label>Venue:<input type="text" id="venue" placeholder='Venue' ></input></label>
<br/>
<label>City :<input type="text" id="city" placeholder="City" ></input></label>
<br/>
<label>State:<input type="text" id="state" placeholder="State Abbr." ></input></label>

<br/>
{/* COMPONENTIZE ME Band picture component inside band component?
can also trigger picture component in this form if clicked add more
for pictures?*/}
<input type="text" id="band" placeholder="Band"></input> <button>Add Another</button>
<br/>
{/* COMPONENTIZE ME Image */}
<input type="text" id="url" placeholder='Picture URL only' ></input><button>Add Another</button>
<br/>
<br/>
<textarea rows="3" cols="30"  placeholder='Comments'></textarea>
<br/>
<br/>
    <button>Submit</button>
    </div>
    );
}
