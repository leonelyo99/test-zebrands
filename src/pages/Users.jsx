import { useEffect, useState } from "react";
import Layaut from "../common/Layaut";
import Pagination from "../common/Pagination";
import SearchInput from "../common/SearchInput";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageClick = (page) => {
    console.log(page);
    fetchUsers(page * 10);
  };

  const fetchUsers = async (since = 0) => {
    const response = await fetch(
      `https://api.github.com/users?per_page=10&since=${since}`
    );
    const users = await response.json();
    setUsers(users);
  };

  const fetchSearchUsers = async (username) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}&per_page=10`
    );
    const data = await response.json();
    setUsers(data.items);
  };

  return (
    <Layaut title={"Users"}>
      <SearchInput onSubmit={fetchSearchUsers} onCancel={fetchUsers} />
      <section className="container-fluid justify-content-center">
        <div className="row d-flex mt-3">
          {users.map((user, index) => (
            <div
              className="col-xxl-3 col-xl-4 col-md-6 col-sm-6 col-xs-12 p-3"
              key={index}
            >
              <div className="card">
                <img src={user.avatar_url} className="card-img-top" alt="..." />
                <div className="card-body d-flex flex-column justify-content-center align-self-center">
                  <h5 className="card-title text-center">{user.login}</h5>
                  <a
                    href={user.html_url}
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
export default Users;
