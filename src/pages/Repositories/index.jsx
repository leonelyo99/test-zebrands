import { useEffect } from "react";
import Layaut from "../../common/Layaut";
import SearchInput from "../../common/SearchInput";
import Pagination from "../../common/Pagination";
import RepositoryCard from "./RepositoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRepositories,
  fetchSearchRepositories,
  setSearchedValue,
  setShowSearched,
} from "../../features/repositories/repositoriesSlice";
import { Spinner } from "react-bootstrap";

const Repositories = () => {
  const dispatch = useDispatch();

  const repositoriesState = useSelector((state) => state.repositories);
  const uiState = useSelector((state) => state.ui);

  useEffect(() => {
    !repositoriesState.repositories.length &&
      !repositoriesState.error &&
      dispatch(fetchRepositories());
  }, [dispatch, repositoriesState]);

  const handlePageClick = (page) => {
    dispatch(fetchRepositories(page * 10));
  };

  const handleSearch = (repository) => {
    dispatch(setSearchedValue(repository));
    dispatch(setShowSearched(true));
    dispatch(fetchSearchRepositories(repository));
  };

  const handleCancelSearch = () => {
    dispatch(setSearchedValue(""));
    dispatch(setShowSearched(false));
    dispatch(fetchRepositories());
  };

  const canShowCard = () => !repositoriesState.error && !uiState.loading;

  return (
    <Layaut title={"Repositories"}>
      <SearchInput
        onSubmit={handleSearch}
        onCancel={handleCancelSearch}
        searchedValue={repositoriesState.searchedValue}
      />
      <section className="container-fluid justify-content-center">
        <div className="row d-flex mt-3">
          {canShowCard() &&
            !repositoriesState.showSearched &&
            repositoriesState.repositories.map((repository, index) => (
              <RepositoryCard
                key={index}
                name={repository.name}
                description={repository.description}
                url={repository.html_url}
              />
            ))}

          {canShowCard() &&
            repositoriesState.showSearched &&
            repositoriesState.searchedRepositories.map((repository, index) => (
              <RepositoryCard
                key={index}
                name={repository.name}
                description={repository.description}
                url={repository.html_url}
              />
            ))}
          {repositoriesState.showSearched &&
            !repositoriesState.loading &&
            repositoriesState.searchedRepositories.length === 0 && (
              <h4 className="text-center">No repository found</h4>
            )}
        </div>
        <br />
        <br />
        {uiState.loading && (
          <div className="w-100 d-flex" data-testid="repositories-spinner">
            <Spinner className="m-auto" animation="border" variant="primary" />
          </div>
        )}
        <br />
        {repositoriesState.error && (
          <h4 className="text-center">
            Something happened please try again later
          </h4>
        )}
      </section>
      {!repositoriesState.showSearched && (
        <Pagination numberOfPage={10} callbackFunction={handlePageClick} />
      )}
    </Layaut>
  );
};
export default Repositories;
