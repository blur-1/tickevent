import './style.css'
import HeartFilled from "../../../../assets/hearth-filled.png";
import HeartUnfilled from "../../../../assets/hearth-unfilled.png";
import useLikedEvents from '../../../../hooks/useLikedEvents';

const EventItem = ({ name, info, image, id, onEventClick }) => {
  const{isLiked, toggleEventLike} = useLikedEvents(id);
  
  const handleSeeMoreClick = (e) => {
    e.stopPropagation();
    onEventClick(id);
  }
  const handleHearthClick = () => {
    toggleEventLike();
  };

  return (
    <div className="event-item-container">
      <div className="event-item-image-container">
        <img
          src={isLiked ? HeartFilled : HeartUnfilled}
          className="event-item-image-hearth"
          alt="liked button"
          onClick={handleHearthClick}
        />
        <img src={image} className="event-item-image-flyer" alt={name} />
      </div>
      <div className="event-item-content">
        <h4 className="event-item-name">{name}</h4>
        <p className="event-item-info">{info}</p>
        <button onClick={handleSeeMoreClick} className="event-item-button">
          {/* <Link to={`/detail/${id}`}>
            Ver mas
          </Link> */}
          Ver mas
        </button>
      </div>
    </div>
  );
};

export default EventItem;