import { useState, useRef, useEffect, useCallback, useMemo} from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import "./style.css"
import useEventsResults from "../../state/events-results.js";

const Home = () => {
  const { data, loading, error, getEvents } = useEventsResults();
  const events = useMemo(
    () => data?._embedded?.events || [],
    [data?._embedded?.events]
  ); 
  const page = useMemo(() => data?.page || {}, [data?.page]); 
  
  const [searchWord, setSearchWord] = useState("");
  const containerRef = useRef();
  const getMyEventsRef = useRef();

  getMyEventsRef.current = getEvents;
  
  useEffect(() => {
    console.log("effect home");
    getMyEventsRef.current();
  }, []);

  //Los hijos usan esas funciones para informar al padre de eventos o cambios.
  //El valor search (estado interno del hijo) se pasa como argumento a handleNavbarSearch.
  const handleNavbarSearch = (word) => {
    setSearchWord(word);
    getEvents(`&keyword=${word}`);
    };

    const handlePageClick = useCallback(
      ({ selected }) => {
        console.log('pag' + selected);
        getEvents(`&keyword=${searchWord}&page=${selected}`);
      },[searchWord, getEvents]);
    
    const renderEvents = () => {
        if (loading) {
            return <div>Cargando resultados...</div>;
        }

        if (error) {
            return <div>Ha ocurrido un error</div>;
        }
        return (
            <div>
                <Events searchValue={searchWord} events={events} />
                <ReactPaginate
                    className="pagination"
                    nextClassName="next"
                    previousClassName="previous"
                    pageClassName="page"
                    activeClassName="activePage"
                    disabledClassName="disabledPage"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
      
  return (
    <>
      <Navbar ref={containerRef} onSearch={handleNavbarSearch} />
      {renderEvents()}

      {/* <SignupForm/> */}
    </>
  );
};

export default Home;
