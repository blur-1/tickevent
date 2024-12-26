import { useState } from "react";
//test estado local

const useEventsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getEvents = async (params) => {
    try {
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?.length ? params : ""}`;
      const response = await fetch(url);
      const dataBase = await response.json();
      console.log('hook' + dataBase);
      setData(dataBase);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const events = data?._embedded?.events || [];
  const page = data?.page || [];

  return {
    events,
    loading,
    error,
    getEvents,
    page
  };
};

export default useEventsData;
