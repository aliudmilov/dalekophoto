/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Photo } from './Photo';

export type Album = {
  id: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  dateCreated?: string | null;
  dateUpdated?: string | null;
  photos?: Array<Photo> | null;
};
