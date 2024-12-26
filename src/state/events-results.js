import { create } from "zustand";

const useEventsResults = create((set) => ({
    data: [],
    loading: false,
    error: null,
    getEvents : async (params) => {
        try {
            await set(() => ({ loading: true }));
            const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?.length ? params : ""}`;
            
            const response = await fetch(url);
            const dataBase = await response.json();
            await set(() => ({
                data: dataBase,
                loading: false
            }));
        } catch (error) {
            await set(() => ({ error }));
        }
    },
  
}));

export default useEventsResults;


