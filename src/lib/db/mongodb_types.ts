import type { Text, YearRange } from "$lib/types";
import type { WithId } from "mongodb";

export type TextDocument = {
    text: string;
	years: YearRange;
};

export type TextMongoDocument = WithId<Document> & TextDocument;
