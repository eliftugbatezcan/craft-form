import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { BuilderPage } from "./components/landing/BuilderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
