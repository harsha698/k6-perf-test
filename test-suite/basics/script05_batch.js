import http from "k6/http";
import {check} from "k6";
/*
    * batch except an array of requests
    * each request element in this array is again an array of parameters
    * array of params include below elements
    * --- type of http call
    * --- url
    * --- body
    * --- params
    * responses is again an array of the response of the api calls
    * */
export default function batch() {

    const responses = http.batch([
        ['GET', 'https://test.k6.io', null, {tags: {ctype: 'html'}}],
        ['GET', 'https://test.k6.io/style.css', null, {tags: {ctype: 'css'}}],
        ['GET', 'https://test.k6.io/images/logo.png', null, {tags: {ctype: 'images'}}]
    ]);
    // Assertion in k6 - using check
    check(responses[0], {
        'status of an api call': (res) => res.status === 200,
    })
}