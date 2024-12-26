import { useEffect, useState } from "react";
import { STORAGE_LIKED_KEY } from "../../../../utils/constants";
import EventItem from "../../../../components/Events/components/EventItem";
import { useNavigate } from "react-router-dom";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getEventsDetails = async () => {
      try {
        setLoading(true);
        const likedEventsStorageList =
          JSON.parse(localStorage.getItem(STORAGE_LIKED_KEY)) || [];
        const results = [];

        for (const eventId of likedEventsStorageList) {
          const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${
            import.meta.env.VITE_TICKETMASTER_API_KEY
          }`;
          const response = await fetch(url);
          const data = await response.json();
          results.push(data);
        }
        setEvents(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getEventsDetails();
  }, []);

  const handleEventItemClick = (eventId) => {
    console.log(eventId);
    navigate(`/detail/${eventId}`);
  };

  if (Object.keys(error).length > 0) {
    return <div>Ha ocurrido un error</div>;
  }

  if (loading) {
    return <div>cargando...</div>;
  }

  return (
    <div>
      {events.map((event) => (
        <EventItem
          key={`liked-event-item-${event.id}`}
          name={event.name}
          info={event.info}
          image={event.images?.[0]?.url || "default-image-url.jpg"}
          id={event.id}
          onEventClick={handleEventItemClick}
        />
      ))}
    </div>
  );
};

export default LikedEvents;
