import { AxiosPromise } from 'axios';

export type CustomAxiosRequest<I, O> = (args: I) => AxiosPromise<O>;
