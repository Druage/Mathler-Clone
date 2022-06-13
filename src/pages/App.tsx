import React from "react";
import Layout from "../components/layout/Layout";
import { MathlerRenderer } from "../components/MathlerRenderer";

function App() {
  return (
    <div className="App">
      <Layout>
        <MathlerRenderer />
      </Layout>
    </div>
  );
}

export default App;
