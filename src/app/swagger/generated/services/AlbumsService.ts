/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from '../models/Album';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AlbumsService {

    /**
     * @returns Album Success
     * @throws ApiError
     */
    public static getAlbums(): CancelablePromise<Array<Album>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/albums',
        });
    }

    /**
     * @param id 
     * @returns Album Success
     * @throws ApiError
     */
    public static getAlbum(
id: string,
): CancelablePromise<Album> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/albums/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @returns Album Success
     * @throws ApiError
     */
    public static getPortfolio(): CancelablePromise<Album> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/albums/portfolio',
        });
    }

}