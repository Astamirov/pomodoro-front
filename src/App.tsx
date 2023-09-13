import Todos from './components/Todos/Todos';
import Footer from './components/Footer/Footer';
import Sliders from './components/Slider/Slider';;
import './App.css'
import Statistics from './components/Statistics-glob/Statistics';

function App() {

  return (
    <>
    <Statistics/>
      <Todos/>
      <Sliders/>
      <Footer/>
    </>
  )
}

export default App
