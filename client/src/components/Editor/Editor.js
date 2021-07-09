import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const def_code = {
  C: `#include <bits/stdc++.h>
using namespace std;
int main() {
    cout<<"Hello world"<<endl;
    return 0;
}`,
  Python: `print("Hello World")`,
  Javascript: `console.log("Hello World");`,
  Java: `class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
  }`,
};
function returncode(x) {
  if (x === 1) {
    return def_code.C;
  } else if (x === 2) {
    return def_code.Python;
  } else if (x === 3) {
    return def_code.Javascript;
  } else {
    return def_code.Java;
  }
}

function EditorFun(props) {
  const [curcode, setcurcode] = useState(returncode(props.codeidx));

  function handleChange(value) {
    // setcurcode(value);
    props.changeCode(value);
    props.socket.emit("sendCode", value);
    console.log("typing...");
  }

  props.socket.on("recivecode", (mssg) => {
    setcurcode(mssg);
  });

  return (
    <div id="main">
      <Editor
        height="100vh"
        width="100%"
        defaultLanguage="c"
        value={curcode}
        theme={props.theme}
        onChange={handleChange}
      />
    </div>
  );
}

export default EditorFun;
