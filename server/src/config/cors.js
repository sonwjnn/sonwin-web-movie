import { WHITELIST_DOMAINS } from "../utilities/constants.js";

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || WHITELIST_DOMAINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS.`));
    }
  },
};
