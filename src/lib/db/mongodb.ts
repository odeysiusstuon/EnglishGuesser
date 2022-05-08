import { calculatePoints, getDistance } from '$lib/feedback';
import type { Period } from '$lib/info';
import type { GuessFeedback, IDatabase, Text } from '$lib/types';
import type { MongoClient, WithId } from 'mongodb';
import type { TextMongoDocument } from './mongodb_types';

const TEXTS_COLLECTION_NAME = 'texts';

export class MongoDB implements IDatabase {
	client: Promise<MongoClient>;
    
	constructor(client: Promise<MongoClient>) {
		this.client = client;
	}

    getRandomText(period: Period) {
        return new Promise<Text>(async (resolve, reject) => {
            const connection = await this.client;
            const db = connection.db();
            const collection = db.collection(TEXTS_COLLECTION_NAME);
    
            const query = collection.aggregate([
                {
                    $match: {
                        years: {
                            start: { $gte: period.years.start },
                            end: { $lte: period.years.end }
                        }
                    },
                },
                {
                    $sample: { size: 1 },
                },
            ]).next();
    
            const document = await query;
            if (document) {
                const textDocument = document as TextMongoDocument;
                resolve({
                    id: textDocument.text.id,
                    content: textDocument.text.content,
                });
            } else {
                reject(`Could not find a text from the period: ${period.name}`);
            }
        });
    }

    getGuessFeedback(textId: number, guess: number) {
        return new Promise<GuessFeedback>(async (resolve, reject) => {
            const textDocument = await this.getTextDocument(textId);
            const yearsRange = textDocument.years;
            const distance = getDistance(yearsRange, guess);
            const points = calculatePoints(distance);
            resolve({
                text: textDocument.text,
                guess,
                answer: yearsRange,
                points,
                distance
            });
        });
    }

    getTextDocument(textId: number) {
        return new Promise<TextMongoDocument>(async (resolve, reject) => {
            const connection = await this.client;
            const db = connection.db();
            const collection = db.collection(TEXTS_COLLECTION_NAME);

            const query = collection.findOne({
                _id: { $eq: textId },
            });

            const result = await query;
            if (result) {
                resolve(result as TextMongoDocument);
            } else {
                reject(`Could not find text: ${textId}`);
            }
        });
    }
    
    getText(textId: number) {
        return new Promise<Text>(async (resolve, reject) => {
            const textDocument = await this.getTextDocument(textId);
            resolve({
                id: textDocument.text.id,
                content: textDocument.text.content,
            });
        });
    }
}
