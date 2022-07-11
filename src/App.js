import { BrowserRouter, Route, Routes } from "react-router-dom";
import ".././node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./Components/PageComponents/HomePage/HomePage";
import SignIn from "./Components/PageComponents/SignIn/SignIn";
import SignUp from "./Components/PageComponents/SignUp/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
