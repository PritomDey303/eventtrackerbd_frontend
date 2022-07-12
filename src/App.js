import { BrowserRouter, Route, Routes } from "react-router-dom";
import ".././node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DrawerAppBar from "./Components/CommonComponents/DrawerAppBar/DrawerAppBar";
import Footer from "./Components/CommonComponents/Footer/Footer";
import HomePage from "./Components/PageComponents/HomePage/HomePage";
import SignIn from "./Components/PageComponents/SignIn/SignIn";
import SignUp from "./Components/PageComponents/SignUp/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
