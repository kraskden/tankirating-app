import { Link } from "react-router-dom";
import { AboutPictures } from "./AboutPictures";

export function EnAbout() {
  return (
    <>
     <p className="fs-5">
      TankiRating is a game statistics hub for TankiOnline.
      This project has been made by the average player, and has nothing to do with the official game resources.
       <br />
       At the moment, registration on the hub is open
     </p>    
     <p className="fs-5">
      The main purpose of this hub is the ability to view game statistics "in dynamic". 
      As opposed to <a href="https://ratings.tankinline.com">the official rating site</a>, you can view the 
      user's gaming activity and effictiveness on the time intervals, as well as compare 
      activity/effictiveness over time on charts
       <br/>
     </p>
     <p className="fs-5">
      Just open <Link to="/">the main page</Link>, and enjoy!
     </p>
 
     <p className="h3 mt-4">
       Gallery
     </p>
   
     <AboutPictures />
 
     <p className="h3 mt-4">
       The Hub
     </p>
 
     <ul className="ms-4">
       <li><span className="fs-5"><Link to="/">Main page</Link> — User ratings</span></li>
       <li><span className="fs-5"><Link to="/user/Fizzika">The user profile</Link> — Player statistics</span></li>
       <li><span className="fs-5"><Link to="/trends">Trends</Link> — Summary statistics of all legend-players</span></li>
       <li><span className="fs-5"><Link to="/online">OnlineHub</Link> — The Great Online Chart</span></li>
     </ul>
 
     <p className="h3 mt-4">
       <a name="contact">Contacts</a>
     </p>
     <p className="fs-5">
      If you changed your nickname, want to delete/freeze your account on the portal, or just have something to say:     </p>
     <ul className="ms-4">
       <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://ru.tankiforum.com/messenger/compose/?to=808" className="href">Write PM</a> on russian forum to <b>Fizzika</b> (recommends)</span></li>
       <li><span className="fs-5">Email me <a href="mailto:kdby@riseup.net" className="href">kdby@riseup.net</a></span></li>
     </ul>
 
     <p className="h3 mt-4">
       <a name="source">Source code, API docs</a>
     </p>

     <p className="fs-5">TankiRating is the free and open-source project</p>

     <ul className="ms-4">
       <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://github.com/kraskden/tankirating-app" className="href">Client source</a></span></li>
       <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://github.com/kraskden/tankirating-api" className="href">API source</a></span></li>
       <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://tankirating.org/api/swagger-ui/index.html" className="href">API documentation</a></span></li>
     </ul>

    </>
   )
}