import "./App.css";
import ControlledForm from "./components/ControlledForm";
import UncontrolledForm from "./Components/UncontrolledForm";
import DataFetcher from "./components/DataFetcher";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <ControlledForm />
          <UncontrolledForm />
          <DataFetcher />
        </div>
      </section>
    </>
  );
}

export default App;
