import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect, useRef } from "react";
import { fetchUsers } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositories } from "../features/repositories/repositoriesSlice";

const Dashboard = () => {
  const dashboardApiCalls = useRef(0);

  const repositoriesState = useSelector((state) => state.repositories);
  const usersState = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dashboardApiCalls.current === 0) {
      !usersState.users.length && !usersState.error && dispatch(fetchUsers());
      !repositoriesState.repositories.length &&
        !repositoriesState.error &&
        dispatch(fetchRepositories());
      dashboardApiCalls.current = 1;
    }
  }, [dispatch, usersState, repositoriesState]);

  return (
    <AppContainer className="container text-center">
      <div className="row align-items-center h-100">
        <div className="col-xxl-8 col-xl-6 col-lg-8 col-md-10 col-xs-12 m-auto ">
          <div className="h-auto w-100 m-auto shadow p-4 bg-body rounded d-flex flex-column">
            <Link to={ROUTES.users} className="btn btn-primary mb-2 p-2">
              <p className="h4 m-0">Users</p>
            </Link>
            <Link to={ROUTES.repositories} className="btn btn-primary p-2">
              <p className="h4 m-0">Repositories</p>
            </Link>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};
export default Dashboard;

const AppContainer = styled.div`
  height: 100vh;
`;
