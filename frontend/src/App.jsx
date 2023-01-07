import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./pages/layout/Footer"
import Header from "./pages/layout/Header"

function App() {


  return (
    <Router>
      
      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>

      <Footer />

    </Router>
  )
}

export default App
