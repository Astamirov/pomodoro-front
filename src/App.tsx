import Header from "./components/Header/Header";
import Todos from "./components/Todos/Todos";
import Footer from "./components/Footer/Footer";
import Sliders from "./components/Slider/Slider";
// import Statistics from "./components/Statistics-glob/Statistics";
import Timer from "./components/Timer/Timer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      {/* <Statistics /> */}
      <Timer />
      <Todos />
      <Sliders />
      <Footer />
    </>
  );
}

export default App;
