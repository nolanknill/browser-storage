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

    const FIFTEEN_SECONDS = 1 / 24 / 60 / 4; // 0.00017361111 days = 15 seconds

    Cookies.set("pageViews", updatedCookieViews, { expires: FIFTEEN_SECONDS });

    setCookieViews(updatedCookieViews);
  }, []);

  
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
