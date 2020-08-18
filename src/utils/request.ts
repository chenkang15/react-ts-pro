/**
 * ''Inc.
 * All rights reserved.
 *
 *''
 *
 * @file The class of request
 */

import { stringify as queryStringify } from 'query-string';
import Message from '@antd/message';
import Progress from 'com/didichuxing/utils/Progress';
import { IResponseBodyKey } from 'com/didichuxing/context/IApplicationContext';

const SUCCESS_CODE: number = 0;

const defaultResponseBodyKey: IResponseBodyKey = {
    dataKey: 'data',
    errorMsgKey: 'errmsg',
    errorCodeKey: 'errno'
};

export const responseBodyKey: IResponseBodyKey = defaultResponseBodyKey;

export interface IResponseJsonObject<T> {
    [key: string]: T | string | number;
}

export interface IRequestParams {
    readonly [key: string]: any;
}

export interface IReponseError {
    readonly msg: string;
    readonly code: number;
}

export type IRequestMethod = <T>(url: string, params: IRequestParams | FormData, headers?: HeadersInit) => Promise<T>;

/**
 * 通过json url，直接获取JSON数据�?
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<T>}
 */
export function getJson<T>(url: string, options: RequestInit = {}): Promise<T> {
    Progress.start();
    return new Promise<T>(
        (resolve: (value?: T | PromiseLike<T>) => void, reject: (error: IReponseError) => void
        ): void => {
            fetch(url, { credentials: 'include', ...options }).then((res: Response): void => {
                if (res.ok) {
                    res.json().then((value: T): void => {
                        resolve(value);
                        Progress.done();
                    }, (reason?: any): void => {
                        console.error(`${reason}`, typeof reason, Object.prototype.toString.call(reason));
                        reject({
                            msg: Object.prototype.toString.call(reason) === '[object Object]'
                                ? JSON.stringify(reason) : `${reason}`,
                            code: 200
                        });
                        Progress.done();
                    });
                } else {
                    reject({
                        msg: res.statusText,
                        code: res.status
                    });
                    Progress.done();
                }
            }, (reason?: any): void => {
                reject({
                    msg: Object.prototype.toString.call(reason) === '[object Object]'
                        ? JSON.stringify(reason) : `${reason}`,
                    code: 400
                });
                Progress.done();
            });
        }
    );
}

/**
 * 请求数据方法�?
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<T>}
 */
export default function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    return new Promise<T>(
        (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason: IReponseError) => void
        ): void => {
            getJson<IResponseJsonObject<T>>(url, options).then((res: IResponseJsonObject<T>): void => {
                if (Number(res[responseBodyKey.errorCodeKey]) === SUCCESS_CODE) {
                    resolve(res[responseBodyKey.dataKey] as T);
                } else {
                    Message.error(res[responseBodyKey.errorMsgKey]);
                    reject({
                        msg: res[responseBodyKey.errorMsgKey] as string,
                        code: Number(res[responseBodyKey.errorCodeKey])
                    });
                }
            }, reject);
        }
    );
}

/**
 * 请求时，将参数放在search中，不放在request body里�?
 * @param {string} url
 * @param {IRequestParams | FormData} params
 * @param {RequestInit} options
 * @returns {Promise<T>}
 */
function requestWidthQuery<T>(url: string, params: IRequestParams | FormData = {},
                              options: RequestInit = {}): Promise<T> {
    let searchString: string = queryStringify(params);
    if (params instanceof FormData) {
        const formData: FormData = params;
        params = {};
        for (const entry of formData) {
            const item: string[] = entry.valueOf() as string[];
            params = {
                ...params,
                [item[0]]: item[1]
            };
        }
    }
    if (params && Object.keys(params).length) {
        searchString = `?${queryStringify(params)}`;
    }

    return request<T>(`${url}${searchString}`, options);
}

/**
 * 请求时，将参数放置在request body中�?
 * @param {string} url
 * @param {IRequestParams | FormData} params
 * @param {RequestInit} options
 * @returns {Promise<T>}
 */
function requestWidthBody<T>(url: string, params: IRequestParams | FormData = {},
                             options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = { accept: 'application/json' };
    let body: any = params;
    if (params instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    } else {
        headers['Content-Type'] = 'application/json; charset=utf-8';
        body = JSON.stringify(params);
    }
    return request<T>(url, {
        body: body,
        headers: {
            ...options.headers,
            ...headers
        },
        ...options
    });
}

/**
 * 显示错误信息�?
 * @param {Promise<T>} requestMethod
 * @returns {Promise<T>}
 */
function appearErrorMessage<T>(requestMethod: Promise<T>): Promise<T> {
    requestMethod.catch((error: IReponseError): void => {
        console.error(error);
        Message.error(error.msg);
    });
    return requestMethod;
}

/**
 * Get 请求
 * @param {string} url
 * @param {IRequestParams} params
 * @param {HeadersInit} headers
 * @returns {Promise<T>}
 */
export const get: IRequestMethod =
    <T>(url: string, params: IRequestParams = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthQuery<T>(url, params, { method: 'GET', headers: headers })
        );
    };

/**
 * POST 请求
 * @param {string} url
 * @param {IRequestParams | FormData} params
 * @param {HeadersInit} headers
 * @returns {Promise<T>}
 */
export const post: IRequestMethod =
    <T>(url: string, params: IRequestParams | FormData = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthBody<T>(url, params, { method: 'POST', headers: headers })
        );
    };

/**
 * PUT 请求
 * @param {string} url
 * @param {IRequestParams | FormData} params
 * @param {HeadersInit} headers
 * @returns {Promise<T>}
 */
export const put: IRequestMethod =
    <T>(url: string, params: IRequestParams | FormData = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(requestWidthBody<T>(url, params, { method: 'PUT', headers: headers }));
    };
