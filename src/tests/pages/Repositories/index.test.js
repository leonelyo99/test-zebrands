import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Repositories from "../../../pages/Repositories";

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

describe("test Repositories", () => {
  test("Should renders the Repositories page with paginated", () => {
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Repositories />
        </Router>
      </Provider>
    );

    expect(wrapper.getAllByText("Repositories")).not.toBeNull();
  });

  test("Should not render the paginated component and should show 'Not User Found'", () => {
    initialState.repositories.showSearched = true;
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Repositories />
        </Router>
      </Provider>
    );
    const nextButton = wrapper.queryByText("Next");
    expect(wrapper.getAllByText("No repository found")).not.toBeNull();
    expect(nextButton).toBeNull();
  });

  test("Should Render Spinner", () => {
    initialState.ui.loading = true;
    let store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Repositories />
        </Router>
      </Provider>
    );
    const spinner = screen.getByTestId("repositories-spinner");
    expect(spinner).not.toBeNull();
  });

  test("Should show error", () => {
    initialState.repositories.error = true;
    let store = mockStore(initialState);

    let wrapper = render(
      <Provider store={store}>
        <Router>
          <Repositories />
        </Router>
      </Provider>
    );
    expect(wrapper.getAllByText("Something happened please try again later")).not.toBeNull();
  });

  test("Should show cards in repositories", () => {
    initialState.repositories.showSearched = false;
    initialState.ui.loading = false;
    initialState.repositories.error = false;
    initialState.repositories.repositories = [
      {
        name: "git-name-example",
        description: "git-description-example",
        html_url: "git-url-example",
      },
    ];
    let store = mockStore(initialState);

    const wrapper = render(
      <Provider store={store}>
        <Router>
          <Repositories />
        </Router>
      </Provider>
    );
    expect(
      wrapper.getAllByText("git-name-example")
    ).not.toBeNull();
  });
});
