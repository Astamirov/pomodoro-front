
import Todos from './components/Todos/Todos';
import Footer from './components/Footer/Footer';
import Sliders from './components/Slider/Slider';;
import './App.css'
// import Statistics from './components/Statistics-glob/Statistics';
import Timer from './components/Timer/Timer'


function App() {

  return (
    <>
      {/* <Statistics/> */}
      <Timer />
      <Todos/>
      <Sliders/>
      <Footer/>
    </>
  )
}

export default App
