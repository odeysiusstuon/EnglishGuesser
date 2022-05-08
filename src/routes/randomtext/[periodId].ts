import { db } from '$lib/db';
import { periods } from '$lib/info';
import type { Text } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

type Params = { periodId: string };

type OutputType = { text: Text };

/** @type {import('./randomtext/periodId').RequestHandler} */
export const get: RequestHandler<Params, OutputType> = async({ params }) => {
  if (!(params.periodId in periods)) {
    return {
      status: 404,
    };
  }

  const period = periods[params.periodId];
  const text = await db.getRandomText(period);
  return {
    body: {
      text,
    },
  };
}
