import { BrowserRouter } from "react-router-dom";
import ".././node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./Components/PageComponents/HomePage/HomePage";
function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <HomePage />
      </BrowserRouter>
    </>
  );
}

export default App;
