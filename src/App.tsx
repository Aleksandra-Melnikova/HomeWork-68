import "./App.css";
import Form from "./components/Form/Form.tsx";
import Tasks from "./components/Tasks/Tasks.tsx";
import Layout from "./components/Layout/Layout.tsx";

const App = () => (
  <>
    <Layout>
      <Form />
      <Tasks />
    </Layout>
  </>
);

export default App;
