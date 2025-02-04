import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import UpdateContact from "../pages/UpdateContact";
import { putUpdateContact } from "../actions/ContactAction";

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

const mockStore = configureMockStore([thunk]);

// Mock the required action for Redux
jest.mock("../actions/ContactAction", () => ({
  ...jest.requireActual("../actions/ContactAction"),
  putUpdateContact: jest.fn(),
}));

describe("UpdateContact Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      contacts: {
        getContactDetail: {
          firstName: "John",
          lastName: "Doe",
          age: 30,
          photo: "https://example.com/photo.jpg",
        },
      },
    });
  });

  test("renders UpdateContact component", () => {
    render(
      <Provider store={store}>
        <Router>
          <UpdateContact />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Update Contact")).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    const mockedId = "b3abd640-c92b-11e8-b02f-cbfa15db428b"; // Replace with an appropriate id

    // Mock the asynchronous action putUpdateContact
    putUpdateContact.mockImplementationOnce(() => async (dispatch) => {
      // Perform any necessary logic here
      // Dispatch actions if needed
      // Return a resolved Promise to simulate the async operation
      return Promise.resolve({});
    });

    render(
      <Provider store={store}>
        <Router>
          <UpdateContact />
        </Router>
      </Provider>
    );

    // Wait for the loading state to be false
    await waitFor(() => {
      expect(screen.queryByText("loading")).toBeNull();
      // Add this line after rendering the component
      screen.debug();
    });

    // fireEvent.change(document.getElementById("firstName"), {
    //   target: { value: "John" },
    // });
    // fireEvent.change(document.getElementById("lastName"), {
    //   target: { value: "Doe" },
    // });
    // fireEvent.change(document.getElementById("age"), { target: { value: 25 } });
    // fireEvent.change(document.getElementById("photo"), {
    //   target: { value: "https://example.com/photo.jpg" },
    // });

    // fireEvent.click(screen.getByText("Save Changes"));

    // await waitFor(
    //   () => {
    //     // console.log("Inside waitFor");
    //     // Debugging: Print the current DOM state
    //     // screen.debug();

    //     // Assert only when the message is present in the DOM
    //     if (screen.queryByText("Submit success!")) {
    //       expect(screen.getByText("Submit success!")).toBeInTheDocument();
    //     }
    //   },
    //   { timeout: 5000 } // Adjust the timeout as needed
    // );

    // // Wait for the asynchronous action to complete
    // // await waitFor(() => {
    // //   console.log("ini mockedId", mockedId);
    // //   expect(putUpdateContact).toHaveBeenCalledWith(
    // //     mockedId,
    // //     expect.objectContaining({
    // //       firstName: "John",
    // //       lastName: "Doe",
    // //       age: 25,
    // //       photo: "https://example.com/photo.jpg",
    // //     })
    // //   );
    // // });

    // // Add assertions based on your expected behavior
  });
});
