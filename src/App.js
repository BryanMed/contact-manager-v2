import "./App.css";
import "./firebase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Contacts from "./components/Contacts";

function App() {
  return (
    <div>
      <Contacts />
      <ToastContainer />
    </div>
  );
}

export default App;
