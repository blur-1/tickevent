const fetchEventDetail = async (eventId) => {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${
      import.meta.env.VITE_TICKETMASTER_API_KEY
    }`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchEventDetail;