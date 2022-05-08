import type { Period } from "./info";

export type YearRange = {
    'start': number;
    'end': number;
};

export type Text = {
    id: number;
    content: string;
};

export type GuessFeedback = {
    text: Text;
    guess: number;
    answer: YearRange;
    points: number;
    distance: number;
};

export interface IDatabase {
    getRandomText: (period: Period) => Promise<Text>;
    getGuessFeedback: (textId: number, guess: number) => Promise<GuessFeedback>;
    getText: (textId: number) => Promise<Text>;
}
