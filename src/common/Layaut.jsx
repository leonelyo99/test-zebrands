import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Layaut = ({ title, children }) => {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid justify-content-start">
          <Link to={"/"} className="navbar-brand">
            <p className="h4 m-0">Dashboard</p>
          </Link>
          <Link
            to={
              location.pathname !== ROUTES.users
                ? ROUTES.users
                : ROUTES.repositories
            }
            className="navbar-brand"
          >
            <p className="h6 m-0">
              {location.pathname !== ROUTES.users ? "Users" : "Repositories"}
            </p>
          </Link>
        </div>
      </nav>
      <section>
        <h1 className="text-center mt-3 container-fluid">{title}</h1>
        {children}
      </section>
    </>
  );
};
export default Layaut;
