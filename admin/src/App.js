import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/scroll-to-top/scrolltotop";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import store from "./configure-store";
import { Provider } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component'

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ReactNotifications />
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
