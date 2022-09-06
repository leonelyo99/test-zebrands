import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "./constants/routes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Repositories from "./pages/Repositories";
import Users from "./pages/Users";

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path={ROUTES.users} element={<Users />} />
          <Route path={ROUTES.repositories} element={<Repositories />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
`;
