/**
 * Represents an Olympic entity with a unique identifier, country name, and a list of participations.
 *
 * @property {number} id - Unique identifier for the Olympic entity.
 * @property {string} country - Name of the country participating in the Olympics.
 * @property {Participation[]} participations - Array of participation records associated with the country.
 */
import { Participation } from "./Participation";

export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}