import { calculatePoints, getDistance } from '$lib/feedback';
import type { Period } from '$lib/info';
import type { IDatabase, Text, YearRange } from '$lib/types';

type DatabaseText = {
	text: Text;
	years: YearRange;
};

const texts: DatabaseText[] = [
	{
		text: {
			id: '0',
			content: 'hello'
		},
		years: {
			start: 1020,
			end: 1040
		}
	}
];

async function getRandomTextInPeriod(period: Period) {
	const filteredTexts = texts.filter(
		(t) => t.years.start >= period.years.start && t.years.end <= period.years.end
	);
	return filteredTexts[Math.floor(Math.random() * filteredTexts.length)].text;
}

export const test_database: IDatabase = {
	getRandomText(period: Period) {
		return new Promise(async (resolve, reject) => {
			resolve(await getRandomTextInPeriod(period));
		});
	},

	getGuessFeedback: function (textId: string, guess: number) {
		return new Promise((resolve, reject) => {
			if (!(textId in texts)) {
				reject(`Could not find text: ${textId}`);
			}
			const foundDatabaseText = texts.find((t) => t.text.id === textId);
			if (foundDatabaseText) {
				const yearsRange = foundDatabaseText.years;
				const distance = getDistance(yearsRange, guess);
				const points = calculatePoints(distance);
				resolve({
					text: foundDatabaseText.text,
					guess,
					answer: yearsRange,
					points,
					distance
				});
			} else {
				reject(`Could not find text: ${textId}`);
			}
		});
	},

	getText: function (textId: string) {
		return new Promise((resolve, reject) => {
			const foundDatabaseText = texts.find((t) => t.text.id === textId);
			if (foundDatabaseText) {
				resolve(foundDatabaseText.text);
			} else {
				reject(`Could not find text: ${textId}`);
			}
		});
	}
};
