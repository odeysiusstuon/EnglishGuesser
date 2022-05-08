import { graceFactor, maxPoints } from "./info";
import type { YearRange } from "./types";

export function getDistance(years: YearRange, guess: number) {
  if (guess >= years.start && guess <= years.end) return 0;
  if (guess > years.end) {
    return guess - years.end;
  } else {
    return years.start - guess;
  }
}

export function calculatePoints(distance: number) {
  return Math.round((Math.exp(-distance / graceFactor) * maxPoints));
}
