import { useState } from "react";
import { STORAGE_LIKED_KEY } from "../utils/constants";

//funcion fuera para que se recree al renderear
const checkEventLiked = (eventId) => {
    const likedEventsList = JSON.parse(localStorage.getItem(STORAGE_LIKED_KEY)) || [];
    const eventLikedStatus = likedEventsList.includes(eventId);

    return eventLikedStatus;
};

const useLikedEvents = (eventId) => {
    const [isLiked, setIsLiked] = useState(checkEventLiked(eventId));

    const toggleEventLike = () => {
        const likedEventsList = JSON.parse(localStorage.getItem(STORAGE_LIKED_KEY)) || [];
        const eventIndex = likedEventsList.indexOf(eventId);

        if (eventIndex !== -1) {
            likedEventsList.splice(eventIndex, 1);
            setIsLiked(false);
        } else {
            likedEventsList.push(eventId);
            setIsLiked(true);
        }

        localStorage.setItem(STORAGE_LIKED_KEY, JSON.stringify(likedEventsList));
    }

    return {
      isLiked,
      toggleEventLike,
    };
}

export default useLikedEvents;