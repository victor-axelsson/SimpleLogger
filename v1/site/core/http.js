import { CONSTANTS } from './constants';
import { getData, saveData, delData } from './persistentStorage';
import ENV  from 'env';

const LOG = ENV.LOG.NETWORK;
const warn = ENV.LOG.WARNINGS ? console.warn.bind(console) : console.log.bind(console, '[WARNING]');

var buildURI = function(url) {
    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1) {
        return url;
    } else {
        return CONSTANTS.BASE_URL + url;
    }
}

/**
* @author Victor Axelsson
* Get the http headers
*/
var getHeaders = function(_accessId) {
    var accessId = getData('accessId');
    if (_accessId) {
        accessId = _accessId;
    }
    var headers = new Headers();
    headers.append('access-id', accessId);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

/**
* @author Victor Axelsson
* Validate errors
*/
const onApiError = (method, url, status, data, callback) => {
    let err = (data instanceof Error) ? data : {
        data: data
    };
    err.method = method;
    err.url = url;
    err.status = err.status || status;

    var message = `${method} ${url} => ${status}`;
    if (data.message) {
        message += `: ${data.message}`;
    } else if (typeof (data) === 'string') {
        message += `: ${data}`;
    }
    err.message = message;
    let additionalData = data && data.data;
    err.errors = (additionalData && additionalData.errors) || (data && data.errors) || {};
    LOG && warn('[API ERROR]', err);
    callback && callback(err);
    callback = null;
};

/**
* @author Victor Axelsson
*/
const request = (url, method, body, callback) => {
    let BASE_URL = CONSTANTS.BASE_URL;
    if (LOG) {
        if (!!body) {
            console.log('[API REQUEST]', method + ':', BASE_URL + url, body);
        } else {
            console.log('[API REQUEST]', method + ':', BASE_URL + url);
        }
    }

    let options = {
        method: method,
        headers: getHeaders()
    };

    if (body && body.accessId) {
        options.headers = getHeaders(body.accessId);
    }

    if (!!body) {
        options.body = JSON.stringify(body);
    }

    let finalUrl = BASE_URL + url;

    var responseObject = null;
    return fetch(finalUrl, options)
        .then(response => {
            responseObject = response;
            return response.text();
        })
        .catch(err => {
            onApiError(method, url, 0, err, callback);
        })
        .then(responseText => {
            var returnData = null;
            var contentType = responseObject ? responseObject.headers.get('content-type') : [];
            if (responseText && contentType != null && contentType.indexOf('json') >= 0) {
                try {
                    returnData = JSON.parse(responseText);
                } catch ( e ) {
                    return onApiError(method, url, responseObject.status,
                        `JSON error: ${e} \nResponse text: ${responseText}`, callback);
                }
            } else {
                returnData = {
                    contentType: contentType,
                    data: responseText
                };
            }
            LOG && console.log('[API RESPONSE]', method + ':', BASE_URL + url, '=>', responseObject.status, returnData);
            if (!responseObject.ok) {
                return onApiError(method, url, responseObject.status, returnData, callback);
            }
            if (!!callback && typeof (callback) === 'function') {
                callback(null, returnData);
            }
        });
}

/**
* @author Victor Axelsson
* performs a HTTP Get
*/
export function get(url, callback) {
    return request(url, 'GET', null, callback);
}

/**
* @author Victor Axelsson
* performs a HTTP Put
*/
export function put(url, payload, callback) {
    fetch(buildURI(url), {
        method: 'put',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(null, json);
    }).catch(function(err) {
        callback(err, null);
    });
}

/**
* @author Victor Axelsson
* performs a HTTP Post
*/
export function post(url, payload, callback) {
    return request(url, 'POST', payload, callback);
}

/**
* @author Victor Axelsson
* performs a HTTP Delete
*/
export function del(url, payload, callback) {
    return request(url, 'DELETE', payload, callback);
}