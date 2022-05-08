import type { YearRange } from "./types";

export type SliderColors = {[key: number]: [number, number, number, number]};

export type Period = {
    'name': string;
    'years': YearRange;
    'sliderColorIndex': number;
};

export const sliderColors: SliderColors = {
    0: [84, 76, 0, 1],
    0.39: [241, 255, 0, 1],
    0.62: [255, 96, 10, 1],
    0.78: [243, 65, 255, 1],
};

export function getPeriodPercentage(periodId: string) {
    if (periodId in periods) {
        const yearRange = periods[periodId].years;
        const numYears = yearRange.end - yearRange.start + 1;
        const totalYears = maxYear - minYear + 1;
        return numYears / totalYears;
    }
    return 0;
}

export const periods: {[key: string]: Period} = {
    oe: {
        name: 'Old English',
        years: {
            start: 450,
            end: 1065,
        },
        sliderColorIndex: 0,
    },
    me: {
        name: 'Middle English',
        years: {
            start: 1066,
            end: 1438,
        },
        sliderColorIndex: 1,
    },
    eme: {
        name: 'Early Modern English',
        years: {
            start: 1439,
            end: 1699,
        },
        sliderColorIndex: 2,
    },
    ce: {
        name: 'Contemporary English',
        years: {
            start: 1700,
            end: 2022,
        },
        sliderColorIndex: 3,
    },
};
export const minYear = periods.oe.years.start;
export const maxYear = periods.ce.years.end;
export const numPeriods = Object.keys(periods).length;

export const graceFactor = 20;
export const maxPoints = 100;
