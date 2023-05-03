import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leave from "./pages/Leave";
import Login from "./pages/Login";

function App() {
  return (
    // <div>
    //   <Header />
    //   <LeaveForm />
    //   <Footer />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/leave" exact element={<Leave />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
