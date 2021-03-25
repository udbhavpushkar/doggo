// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://dog.ceo/api/breeds/list/all", (req, res, ctx) => {
    return res(
      ctx.json({
	      message: { african: [], some_other_breed: [], some_breed: ['sub_breed'] },
        status: "success",
      })
    );
  }),
  rest.get(
    "https://dog.ceo/api/breed/african/images/random",
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "https://images.dog.ceo/breeds/affenpinscher/n02110627_10437.jpg",
          status: "success",
        })
      );
    }
  ),
];
