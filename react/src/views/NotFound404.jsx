import { useRouteError } from "react-router-dom";
import lottie  from '.././assets/img/error-404.gif'

export default function NotFound404() {


  return (
   
    <div id="container_div">
      <div id="error-div" >
        <img src={lottie} alt="" />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
   
  );
}
