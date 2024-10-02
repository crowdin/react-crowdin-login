import React from "react";
import { createRoot } from "react-dom/client";
import ExamplePage from './ExamplePage';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <ExamplePage />
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
