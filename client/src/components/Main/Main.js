import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, Navbar, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { returncode } from "../../utils/defaultcode";
import Editor from "../Editor/Editor";
import Input from "../Input/input";
import Output from "../output/output";
import io from "socket.io-client";
import "./Main.css";

const socket = io.connect("http://localhost:4000");

function Main() {
  const [language, setLanguage] = useState("C++");
  const [codeidx, setCodeidx] = useState(1);
  const [theme, setTheme] = useState("vs-light");
  const [code, setCode] = useState(returncode(codeidx));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function changeLanguage(e, x) {
    if (x === 1) {
      setCodeidx(1);
      setLanguage("C++");
    } else if (x === 2) {
      setCodeidx(2);
      setLanguage("Python");
    } else {
      setCodeidx(3);
      setLanguage("Javascript");
    }
  }
  function changeTheme(e) {
    if (theme === "vs-light") {
      setTheme("vs-dark");
    } else {
      setTheme("vs-light");
    }
  }
  const { user } = useParams();

  useEffect(() => {
    var res = user.split("-");
    const username = res[0];
    const userroomid = res[1];
    socket.emit("joinroom", { username, userroomid });

    socket.on("joinedmssg", (username) => {
      // console.log(username);
      toast.success(`${username} has joined the Room`);
    });

    socket.on("leavemssg", (username) => {
      // console.log(username);
      toast.warning(`${username} has left the Room`);
    });

    socket.on("getInput", (mssg) => {
      // console.log(mssg);
      setInput(mssg);
    });
  }, []);

  async function sendCodetoServer() {
    // console.log(code);
    // console.log(input);
    const { data } = await axios.post("http://localhost:4000/", {
      code: code,
      lang: "cpp",
      input: input,
    });
    setOutput(data);
    console.log(data);
  }

  return (
    <>
      {/* /* Navbar code*/}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Code Clan</Navbar.Brand>
        <Button
          variant="light"
          size="sm"
          onClick={changeTheme}
          className="main-button"
        >
          Change Theme
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={sendCodetoServer}
          className="main-button"
        >
          Run code
        </Button>
        <DropdownButton
          id="dropdown-item-button"
          title={language}
          variant="light"
          size="sm"
          className="main-button"
        >
          <Dropdown.Item
            as="button"
            onClick={(e) => changeLanguage(e, 1)}
            className="main-button"
          >
            C++
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={(e) => changeLanguage(e, 2)}
            className="main-button"
          >
            Python
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={(e) => changeLanguage(e, 3)}
            className="main-button"
          >
            Javascript
          </Dropdown.Item>
        </DropdownButton>
      </Navbar>
      <ToastContainer />
      {/* /*navbar code completed*/}
      <div className="screen">
        <div className="left">
          <Editor
            theme={theme}
            codeidx={codeidx}
            socket={socket}
            changeCode={setCode}
          />
        </div>
        <div className="right">
          <Input changeInput={setInput} socket={socket} input={input} />
          <Output output={output} />
        </div>
      </div>
    </>
  );
}

export default Main;
