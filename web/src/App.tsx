import React, { ReactElement } from "react";
import AppProvider from "./providers";
import { AppRoutes } from "./routes";

const App = (): ReactElement => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
