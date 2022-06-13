import React from "react";
import Layout from "../components/layout/Layout";
import { MathlerRenderer } from "../components/MathlerRenderer";
import AlertRegion from "../components/AlertRegion";
import { ActionDialogRegion } from "../components/ActionDialogRegion";

function App() {
  return (
    <div className="App">
      <Layout>
        <MathlerRenderer />
        <AlertRegion />
        <ActionDialogRegion />
      </Layout>
    </div>
  );
}

export default App;
