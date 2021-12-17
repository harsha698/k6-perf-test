import http from "k6/http";
import {check, fail} from "k6";


export function makeGetCall(url) {
    const response = http.get(url);
    return response
}

export function makePostCall(url, body, params) {
    const response = http.post(url, body, params);
    checkStatusCode(response);
    return response;
}

export function makePutCall(url, body, params) {
    const response = http.put(url, body, params);
    checkStatusCode(response);
}

export function makeDelCall(url, params) {
    const response = http.del(url, params);
    checkStatusCode(response);
    return response;
}

export function checkStatusCode(response) {
    if (!(check(response, {'api call succeeded': res => res.status >= 200 && res.status <= 399}))) {
        fail(`api call ${response.url} with response as ${response.body} is failed`)
    }
}