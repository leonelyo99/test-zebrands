import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <AppContainer className="container text-center">
      <div className="row align-items-center h-100">
        <div className="col-xxl-8 col-xl-6 col-lg-8 col-md-10 col-xs-12 m-auto ">
          <div className="h-auto w-100 m-auto shadow-lg p-4 bg-body rounded d-flex flex-column">
            <h3 className="mb-4">Page not Foud</h3>
            <Link to="/" className="btn btn-primary mb-2 p-2">
              <p className="h4 m-0">Dashboard</p>
            </Link>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};
export default NotFound;

const AppContainer = styled.div`
  height: 100vh;
`;
