import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
function FriendsTab() {

  const user = useSelector((store) => store?.user);
  console.log("friendsTab id: ", user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch({ type: "FETCH_FRIENDS", payload: user.id });
    }
  }, [user.id, dispatch]);
  const friends = useSelector((store) => store?.friendsReducer.friendsReducer);
  console.log("Full Store of Friends", friends);
  return (
    <div>
      <p>Hello Friends</p>
      <ul>
        {friends &&
          friends.map((friend) => <li key={friend.id}>{friend.username}</li>)}
      </ul>
    </div>
  );
}

export default FriendsTab;
