import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import Header from "./Header";

import "./index.scss";

const App = () => (
  <div className="mt-10 text-xl mx-auto max-w-6xl">
    <Header/>
    <div className="my-10">
      Home Page Content
    </div>
    <Footer/>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
