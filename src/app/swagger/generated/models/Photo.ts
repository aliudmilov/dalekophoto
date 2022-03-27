/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Photo = {
    id: string;
    smallImageUrl: string;
    mediumImageUrl: string;
    largeImageUrl: string;
    title?: string | null;
    description?: string | null;
    dateTaken?: string | null;
    numberOfLikes?: number | null;
};