import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/publicLayout";
import PrivateLayout from "../layout/privateLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";

import "../../src/theme/assets/App.scss";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route exact path="/" element={<Login />} />
      </Route>
      <Route path="/" element={<PrivateLayout />}>
        <Route exact path="/dashboard" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
