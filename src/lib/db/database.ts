import type { Period } from "$lib/info";
import type { GuessFeedback, IDatabase, Text } from "$lib/types";

export const database: IDatabase = {
  getRandomText(period: Period) {
    return new Promise((resolve, reject) => {
      resolve({
        id: 0,
        content: 'hello',
      });
    });
  },

  getGuessFeedback: function (text: Text, guess: number) {
    return new Promise((resolve, reject) => {
      resolve({
        text: {
          id: 0,
          content: 'hello',
        },
        guess: 1022,
        answer: {
          start: 1020,
          end: 1040,
        },
        points: 5,
      });
    });
  }
};
