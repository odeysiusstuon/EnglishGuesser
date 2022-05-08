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
};

export interface IDatabase {
    getRandomText: (period: string) => Promise<Text>;
    getGuessFeedback: (text: Text, guess: number) => Promise<[Text]>;
}