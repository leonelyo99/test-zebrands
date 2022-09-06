import { useEffect, useState } from "react";
import Layaut from "../common/Layaut";
import SearchInput from "../common/SearchInput";
import Pagination from "../common/Pagination";

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const handlePageClick = (page) => {
    fetchRepositories(page * 100);
  };

  const fetchRepositories = async (since = 0) => {
    const response = await fetch(
      `https://api.github.com/repositories?since=${since}`
    );
    const repositories = await response.json();
    setRepositories(repositories);
  };

  const fetchSearchRepository = async (repository) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${repository}&per_page=10`
    );
    const data = await response.json();
    setRepositories(data.items);
  };

  return (
    <Layaut title={"Repositories"}>
      <SearchInput
        onSubmit={fetchSearchRepository}
        onCancel={fetchRepositories}
      />
      <section className="container-fluid justify-content-center">
        <div className="row d-flex mt-3">
          {repositories.map((repositorie, index) => (
            <div
              className="col-xxl-3 col-xl-4 col-md-6 col-sm-6 col-xs-12 p-3"
              key={index}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{repositorie.name}</h5>
                  <p className="card-text">{repositorie.description}</p>
                  <a
                    href={repositorie.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Go to repository
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </section>
      <Pagination numberOfPage={10} callbackFunction={handlePageClick} />
    </Layaut>
  );
};
export default Repositories;
