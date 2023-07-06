import { Stage } from "@pixi/react";
import * as PIXI from "pixi.js";

import "./App.css";
import Clock from "./Clock";
import { useEffect, useState } from "react";

function App() {
  const [app, setApp] = useState<any>();
  const [input, setInput] = useState({ hour: 0, minute: 32, second: 48 });

  useEffect(() => {
    (window as any).__PIXI_APP__ = app;
  }, [app]);

  const handleInputChange = (inputValue: any) => {
    const timeArray = inputValue.split(":");

    if (timeArray.length === 3) {
      const [hour, minute, second] = timeArray.map(Number);

      if (
        hour >= 0 &&
        hour <= 23 &&
        minute >= 0 &&
        minute <= 59 &&
        second >= 0 &&
        second <= 59
      ) {
        setInput({ hour, minute, second });
      }
    }
  };

  return (
    <div>
      <h1>Pixijs</h1>
      <Stage
        width={800}
        height={600}
        onMount={(app) => {
          setApp(app);
        }}
      >
        <Clock input={input} />
      </Stage>

      <input
        onChange={(ev) => handleInputChange(ev.target.value)}
        defaultValue="12:32:48"
      />
    </div>
  );
}

export default App;
