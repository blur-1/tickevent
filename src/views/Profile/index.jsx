import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./style.css";

const Profile = () => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const handleTabClick = (path) => {
     navigate(`/profile/${path}`);
   };

   return (
     <div>
       <Link to="/" className="profile-home-link">
         Inicio
       </Link>
       <div className="profile-tabs-container">
         <span
           className={`${
             pathname.includes("my-info") ? "tab-active" : ""
           } profile-tab`}
           onClick={() => handleTabClick("my-info")}
         >
           Mi informacion
         </span>
         <span
           className={`${
             pathname.includes("liked-events") ? "tab-active" : ""
           } profile-tab`}
           onClick={() => handleTabClick("liked-events")}
         >
           Eventos Favoritos
         </span>
       </div>
       <Outlet />
     </div>
   );
}

export default Profile