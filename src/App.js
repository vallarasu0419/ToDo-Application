import { useEffect } from "react";
import MyRoutes from "./Components/Routes";
import { dummyData } from "./Components/DummyData.js";

function App() {
  useEffect(() => {
    const itemsString = localStorage.getItem("data");
    const itemsArray = JSON.parse(itemsString);
    if (!itemsArray) {
      localStorage.setItem("data", JSON.stringify(dummyData));
    }
  }, []);
  return (
    <div>
      <MyRoutes />
    </div>
  );
}

export default App;
