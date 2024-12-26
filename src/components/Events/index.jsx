import { memo } from "react";
import EventItem from "./components/EventItem/index.jsx";
import { useNavigate } from "react-router-dom";

const Events = ({ searchValue, events }) => {
  const navigate = useNavigate();

  const handleEventItemClick = (id) => {
    // console.log("clicked btn event-item", id);
    navigate(`/detail/${id}`);
  };

  console.log("render");

  const renderEvents = () => {
    let eventsFiltered = events;
    if (searchValue.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchValue)
      );
    }
    return eventsFiltered.map((item) => (
      <EventItem
        key={`item-${item.id}`}
        name={item.name}
        info={item.info}
        image={item.images[0].url}
        id={item.id}
        onEventClick={handleEventItemClick}
      />
    ));
  };

  return (
    <div>
      <h2>Próximos Eventos</h2>
      {renderEvents()}
    </div>
  );
};

export default memo(Events);
