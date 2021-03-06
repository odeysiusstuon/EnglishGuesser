import { db } from '$lib/db';
import type { Text } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

type Params = { textId: string };

type OutputType = { text: Text };

/** @type {import('./feedback/textId').RequestHandler} */
export const get: RequestHandler<Params, OutputType> = async ({ params, url }) => {
	const guessParam = url.searchParams.get('guess');
	if (!guessParam) {
		return {
			status: 404
		};
	}

	const guess = parseInt(guessParam);
	if (isNaN(guess)) {
		return {
			status: 404
		};
	}

	try {
		const feedback = await db.getGuessFeedback(params.textId, guess);
		return {
			body: {
				feedback
			}
		};
	} catch (e) {
		return {
			status: 404
		};
	}
};
