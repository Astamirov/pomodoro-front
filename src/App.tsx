import Header from "./components/Header/Header";
import Profille from "./components/Profille/Profille";
import Statistics from "./components/Statistics-glob/Statistics";
import Timer from "./components/Timer/Timer";
import Todos from "./components/Todos/Todos";
import Footer from "./components/Footer/Footer";
import Sliders from "./components/Slider/Slider";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Ideas from "./components/Ideas/Ideas";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const token = useSelector((state: RootState) => state.signInSlice.token);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Timer />
              {token && <Todos />}
              <Sliders />
              <Footer />
            </>
          }
        />
        <Route path="/prof" element={<Profille />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/stat" element={<Statistics />} />
        <Route path="/ideas" element={<Ideas />} />
      </Routes>
    </>
  );
}

export default App;
