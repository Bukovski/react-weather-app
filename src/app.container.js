import React from "react";

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";



function AppContainer() {
  
  return (
    <div className="main" data-theme="default">
      <Geo />
  
      <Temperature />
  
      <Detail />
  
      <Diagram />
    </div>
  );
}

export default AppContainer;
