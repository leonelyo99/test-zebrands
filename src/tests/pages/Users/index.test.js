import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Users from "../../../pages/Users";

const handleSearch = jest.fn();
const handleCancelSearch = jest.fn();

let initialState = {
  users: {
    users: [],
    searchedUsers: [],
    searchedValue: "",
    showSearched: false,
    error: false,
  },
  repositories: {
    repositories: [],
    searchedRepositories: [],
    searchedValue: "",
    showSearched: false,
    error: false,
  },
  ui: {
    loading: false,
  },
};

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);

describe("test Users", () => {
  test("Should renders the Users page with paginated", () => {
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );

    expect(wrapper.getAllByText("Users")).not.toBeNull();
  });

  test("Should not render the paginated component and should show 'Not User Found'", () => {
    initialState.users.showSearched = true;
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );
    const nextButton = wrapper.queryByText("Next");
    expect(wrapper.getAllByText("No user found")).not.toBeNull();
    expect(nextButton).toBeNull();
  });

  test("Should Render Spinner", () => {
    initialState.ui.loading = true;
    let store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );
    const spinner = screen.getByTestId("users-spinner");
    expect(spinner).not.toBeNull();
  });

  test("Should show error", () => {
    initialState.users.error = true;
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );
    expect(
      wrapper.getAllByText("Something happened please try again later")
    ).not.toBeNull();
  });

  test("Should show cards in user", () => {
    initialState.users.showSearched = false;
    initialState.ui.loading = false;
    initialState.users.error = false;
    initialState.users.users = [
      {
        avatar_url: "git-avatar-url-example",
        login: "git-name-example",
        html_url: "git-url-example",
      },
    ];
    let store = mockStore(initialState);

    const wrapper = render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );
    expect(
      wrapper.getAllByText("git-name-example")
    ).not.toBeNull();
  });
});
