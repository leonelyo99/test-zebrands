import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layaut from "../../common/Layaut";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import {
  fetchSearchUsers,
  fetchUsers,
  setShowSearched,
  setSearchedValue,
} from "../../features/users/usersSlice";
import UserCard from "./UserCard";

const Users = () => {
  const usersCalls = useRef(0);
  const dispatch = useDispatch();

  const usersState = useSelector((state) => state.users);
  const uiState = useSelector((state) => state.ui);

  useEffect(() => {
    if (usersCalls.current === 0) {
      !usersState.users.length && !usersState.error && dispatch(fetchUsers());
      usersCalls.current = 1;
    }
  }, [dispatch, usersState]);

  const handlePageClick = (page) => {
    dispatch(fetchUsers(page * 10));
  };

  const handleSearch = (username) => {
    dispatch(setSearchedValue(username));
    dispatch(setShowSearched(true));
    dispatch(fetchSearchUsers(username));
  };

  const handleCancelSearch = () => {
    dispatch(setSearchedValue(""));
    dispatch(setShowSearched(false));
    dispatch(fetchUsers());
  };

  const canShowCard = () => !usersState.error && !uiState.loading;

  return (
    <Layaut title={"Users"}>
      <SearchInput
        onSubmit={handleSearch}
        onCancel={handleCancelSearch}
        searchedValue={usersState.searchedValue}
      />
      <section className="container-fluid justify-content-center">
        <div className="row d-flex mt-3">
          {canShowCard() &&
            !usersState.showSearched &&
            usersState.users.map((user, index) => (
              <UserCard
                key={index}
                imageSrc={user.avatar_url}
                name={user.login}
                profileUrl={user.html_url}
              />
            ))}
          {canShowCard() &&
            usersState.showSearched &&
            usersState.searchedUsers.map((user, index) => (
              <UserCard
                key={index}
                imageSrc={user.avatar_url}
                name={user.login}
                profileUrl={user.html_url}
              />
            ))}

          {!uiState.loading &&
            usersState.showSearched &&
            usersState.searchedUsers.length === 0 && (
              <h4 className="text-center">Not user found</h4>
            )}
        </div>
        <br />
        <br />
        {uiState.loading && (
          <div className="w-100 d-flex" data-testid="users-spinner">
            <Spinner className="m-auto" animation="border" variant="primary" />
          </div>
        )}
        <br />
        {usersState.error && (
          <h4 className="text-center">
            Something happened please try again later
          </h4>
        )}
      </section>
      {!usersState.showSearched && !usersState.error && (
        <Pagination numberOfPage={10} callbackFunction={handlePageClick} />
      )}
    </Layaut>
  );
};
export default Users;
