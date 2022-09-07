import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Dashboard from "../../pages/Dashboard";
const initialState = {
  users: { users: [] },
  repositories: { repositories: [] },
};

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);

let wrapper = render(
  <Provider store={store}>
    <Router>
      <Dashboard />
    </Router>
  </Provider>
);

describe("test dashboard", () => {
  test("renders the Dashboard page with buttons", () => {
    expect(wrapper.getByText(/Users/)).not.toBeNull();
    expect(wrapper.getByText(/Repositories/)).not.toBeNull();
  });
});
