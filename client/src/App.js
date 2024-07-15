import { BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <LandingPage />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
