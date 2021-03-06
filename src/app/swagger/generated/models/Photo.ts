/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Photo = {
    id: string;
    smallImageUrl: string;
    smallImageDefaultUrl: string;
    mediumImageUrl: string;
    mediumImageDefaultUrl: string;
    largeImageUrl: string;
    largeImageDefaultUrl: string;
    isFeatured: boolean;
    title?: string | null;
    description?: string | null;
    dateTaken?: string | null;
    numberOfLikes?: number | null;
};