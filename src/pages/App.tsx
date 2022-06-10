import React from "react";
import Layout from "../components/layout/Layout";
import { Game, Solution } from "../game/Game";

function App() {
  const resultNumber = 73;
  const targetSolution: Solution = ["1", "3", "2", "-", "5", "9"];
  const game = new Game(resultNumber, targetSolution);

  return (
    <div className="App">
      <Layout>
        <h1 className={"text-4xl font-medium"}>Mathler</h1>

        <div className={"h-1/2 w-1/2 bg-blue-600"}></div>
      </Layout>
    </div>
  );
}

export default App;
