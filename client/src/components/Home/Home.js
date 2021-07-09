import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Typewriter from "typewriter-effect";
// import Footer from "../Footer/footer";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [roomid, setRoomid] = useState("");

  let history = useHistory();
  const handlesubmit = () => {
    history.push(`/ide/${name + "-" + roomid}`);
  };

  return (
    <Router>
      <div className="Home-screen">
        <div className="inside-form">
          <div className="Code-clan">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Code Clan")
                  .pauseFor(5000)
                  .changeDelay(10000)
                  .start();
              }}
            />
          </div>
          <div>
            <form onSubmit={handlesubmit}>
              <div className="input">
                <input
                  className="name_input"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <input
                  className="name_input"
                  type="text"
                  placeholder="Enter Room Id"
                  value={roomid}
                  onChange={(e) => {
                    setRoomid(e.target.value);
                  }}
                />
              </div>
              <div className="submit-div">
                <input type="submit" value="Submit" className="btnx" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Home;
