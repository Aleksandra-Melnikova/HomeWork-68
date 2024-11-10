import "./App.css";
import Form from "./containers/Form/Form.tsx";
import Tasks from "./containers/Tasks/Tasks.tsx";
import ToolBar from './components/ToolBar/ToolBar.tsx';

const App = () => (
  <>
    <header>
      <ToolBar/>
    </header>
    <main>
      <Form />

      <Tasks />
    </main>

  </>
);

export default App;
