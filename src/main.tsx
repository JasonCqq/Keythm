import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/App.tsx";
import Game from "./pages/Game/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />

        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
