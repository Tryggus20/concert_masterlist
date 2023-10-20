import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container about">
      <div>
        <p>This app is designed to keep track of the concerts you have been to as well as their memories.</p>
          <p>Sign up and get started today! You can add the minimal information like the venue, date, and bands.</p>
           <p>Or you can go above and beyond and add pictures and comments about the show. Each concert displays in an easy to view mode.</p>
      </div>
    </div>
  );
}

export default AboutPage;
