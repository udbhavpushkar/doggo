import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { rest } from "msw";

// src/setupTests.js

import { server } from "./mocks/server.js";

// Establish API mocking before all tests.

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  })
);

// Reset any request handlers that we may add during the tests,

// so they don't affect other tests.

afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.

afterAll(() => server.close());

describe("test cases for doggo app",()=>{

test('first page load should have some value in drop down and a image loaded',async ()=>{
  render(<App />);
  const select = await screen.findByRole("combobox");

  await waitFor(()=>expect(select).toHaveValue('african'))

  const initialDogImage = await screen.findByRole("img", {
    name: /african/i,
  });

  expect(initialDogImage).toHaveAttribute(
    "src",
    "https://images.dog.ceo/breeds/affenpinscher/n02110627_10437.jpg"
  );

})

test("image should change when a dog breed is selected from dropdown", async () => {
  render(<App />);
  const select = await screen.findByRole("combobox");

  await waitFor(()=>expect(select).toHaveValue('african'))  //userEvent.click(select);

  server.use(
   rest.get(
    "https://dog.ceo/api/breed/some_other_breed/images/random",
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "https://images.dog.ceo/breeds/some_other_breed/n02110627_10437.jpg",
          status: "success",
        })
      );
    }
  )

  )
  fireEvent.change(select, { target: { value: "some_other_breed" } });

  const initialDogImage = await screen.findByRole("img", {
    name: /some_other_breed/i,
  });

  await waitFor(()=>expect(initialDogImage).toHaveAttribute(
    "src",
    "https://images.dog.ceo/breeds/some_other_breed/n02110627_10437.jpg"
  )
  )
 });

 test("if a breed has sub breed . then the dropdown should mention sub breed", async()=>{
   render(<App />);
  const select = await screen.findByRole("combobox");
  await waitFor(()=>expect(select).toHaveValue('african'))

  server.use(
   rest.get(
    "https://dog.ceo/api/breed/some_breed/sub_breed/images/random",
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "https://images.dog.ceo/breeds/some_breed/sub_breed/n02110627_10437.jpg",
          status: "success",
        })
      );
    }
  )

  )
  fireEvent.change(select, { target: { value: "some_breed/sub_breed" } });

  const initialDogImage = await screen.findByRole("img", {
    name: /some_breed\/sub_breed/i,
  });

  await waitFor(()=>expect(initialDogImage).toHaveAttribute(
    "src",
    "https://images.dog.ceo/breeds/some_breed/sub_breed/n02110627_10437.jpg"
  )
  )


 });

})

