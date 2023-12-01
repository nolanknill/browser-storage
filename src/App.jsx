import "./App.scss";
import { useEffect, useState } from "react";
import catImage from "./assets/images/cat-box.png";
import dogImage from "./assets/images/sneaky-dog.jpeg";
import cookieImage from "./assets/images/cookie-monster.jpeg";
import Cookies from "js-cookie";

function App() {
  const [pageViews, setPageViews] = useState(Number(localStorage.getItem("pageViews")));
  const [sessionViews, setSessionViews] = useState(Number(sessionStorage.getItem("sessionViews")));
  const [cookieViews, setCookieViews] = useState(Number(Cookies.get("pageViews")) || 0);

  const COOKIE_REFRESH_IN_SECONDS = 15;

  useEffect(() => {
    const updatedPageViews = pageViews + 1;

    localStorage.setItem("pageViews", updatedPageViews);
    setPageViews(updatedPageViews);
  }, []);

  useEffect(() => {
    const updatedSessionViews = sessionViews + 1;

    sessionStorage.setItem("sessionViews", updatedSessionViews);
    setSessionViews(updatedSessionViews);
  }, []);

  useEffect(() => {
    const updatedCookieViews = cookieViews + 1;

    const expiryInDays = getExpiryInDays();
    Cookies.set("pageViews", updatedCookieViews, { expires: expiryInDays });

    setCookieViews(updatedCookieViews);
  }, []);
  

  /**
   * Creates a pageViewsExpiry cookie that keeps track of when the pageViews cookie is going to expire
   * 
   * @returns the number of days in the future to expire the cookie , set by COOKIE_REFRESH_IN_SECONDS constant
   */
  const getExpiryInDays = () => {
    let expiryTimestamp = Number(Cookies.get("pageViewsExpiry"));

    const currentTimestamp = (new Date()).getTime();
    
    let secondsUntilExpiry;

    /* 
      If an expiry already exists, calculate the number of seconds away from expiry 
      so that we can use that value for the expires attribute
    */
    if (expiryTimestamp) {
      secondsUntilExpiry = (expiryTimestamp - currentTimestamp) / 1000;
    } else {
      secondsUntilExpiry = COOKIE_REFRESH_IN_SECONDS;
      expiryTimestamp = currentTimestamp + (COOKIE_REFRESH_IN_SECONDS * 1000);
    }

    // Given secondsUntilExpiry, convert to number of days
    const expiryInDays = 1 / 24 / 60 / (60 / secondsUntilExpiry);
      
    Cookies.set("pageViewsExpiry", expiryTimestamp, { expires: expiryInDays})
    
    return expiryInDays;
  }

  const deleteSessionStorage = () => {
    sessionStorage.removeItem("sessionViews");
    
    setSessionViews(0);
  }

  const deleteLocalStorage = () => {
    localStorage.removeItem("pageViews");
    
    setPageViews(0);
  }

  const deleteCookies = () => {
    Cookies.remove("pageViews");
    
    setCookieViews(0);
  }
  
  return (
    <div className="App">
      <main>
        <h1>Browser Storage</h1>
        <section>
          <h2>Cookie Count 📦</h2>
          <img src={cookieImage} />
          <p>
            <strong>Page Views in Cookies: {cookieViews}</strong>
          </p>
          <button onClick={deleteCookies}>Reset cookie views to 0</button>
        </section>
        
        <section>
          <h2>Session Storage Count 📦</h2>
          <img src={dogImage} />
          <p>
            <strong>Page Views during Current Session: {sessionViews}</strong>
          </p>
          <button onClick={deleteSessionStorage}>Reset session views to 0</button>
        </section>
        <section>
          <h2>Local Storage Count 📦</h2>
          <img src={catImage} />
          <p>
            <strong>Page Views: {pageViews}</strong>
          </p>
          <button onClick={deleteLocalStorage}>Reset page views to 0</button>
        </section>
      </main>
    </div>
  );
}

export default App;
