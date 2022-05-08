import type { Period } from "./info";

export type YearRange = {
    'start': number;
    'end': number;
};

export type Text = {
    id: string;
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
    getGuessFeedback: (textId: string, guess: number) => Promise<GuessFeedback>;
    getText: (textId: string) => Promise<Text>;
}
