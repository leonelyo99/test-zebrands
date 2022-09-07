import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import styled from "styled-components";
import { ROUTES } from "./constants/routes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Repositories from "./pages/Repositories";
import Users from "./pages/Users";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
`;
