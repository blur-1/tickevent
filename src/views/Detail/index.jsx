import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import fetchEventDetail from "../../utils/fetchEvents";
import "./style.css";

const Detail = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEventDetail(eventId);
        setEventData(data); 
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar el evento: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="main-info-container">
        <img
          src={eventData.images?.[0].url}
          className="event-image"
          alt={eventData.name}
        />
      </div>
      <div className="seat-info-container">
        <h4 className="event-name">{eventData.name}</h4>
        <p className="info-paragraph">{eventData.info}</p>
        {eventData.dates?.start.dateTime ? (
          <p className="date-paragraph">
            {format(
              new Date(eventData.dates?.start.dateTime),
              "d LLLL yyyy H:mm",
              { locale: es }
            )}
            hrs
          </p>
        ) : null}
        <p className="please-note-legend">{eventData.pleaseNote}</p>
        <p className="price-range-legend">
          Rango de precios: {eventData.priceRanges?.[0].min}-
          {eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}
        </p>
        <a href={eventData.url}>Ir por tus boletos</a>
      </div>
    </div>
  );
};

export default Detail;
