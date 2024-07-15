import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Router />

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
