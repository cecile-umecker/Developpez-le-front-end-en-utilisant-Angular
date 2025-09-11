/**
 * Represents a participation record in an event, such as the Olympics.
 *
 * @property id - Unique identifier for the participation.
 * @property year - The year the participation took place.
 * @property city - The city where the event was held.
 * @property medalsCount - Number of medals won during the participation.
 * @property athleteCount - Number of athletes who participated.
 */
export interface Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}