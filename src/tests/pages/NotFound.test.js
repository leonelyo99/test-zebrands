import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import NotFound from "../../pages/NotFound";
const initialState = {};
let mockStore = configureMockStore();
let store = mockStore(initialState);

let wrapper = render(
  <Provider store={store}>
    <Router>
      <NotFound />
    </Router>
  </Provider>
);

describe("it works", () => {
  test("renders the NotFound page with buttons", () => {
    expect(wrapper.getByText(/Page not Foud/)).not.toBeNull();
    expect(wrapper.getByText(/Dashboard/)).not.toBeNull();
  });
});
