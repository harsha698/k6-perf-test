import http from "k6/http";
import {check, fail} from "k6";

export const options = {
    scenarios: {
        scenario_name1: {
            executor: 'shared-iterations',
            vus: 5,
            iterations: 20,
            maxDuration: '100s',
            exec: 'testMethod1'
        },
        scenario_name2: {
            executor: 'per-vu-iterations',
            vus: 3,
            iterations: 5,
            maxDuration: '10m',
            exec: 'testMethod2'
        },
        scenario_name3: {
            executor: 'constant-vus',
            duration: '3s',
            vus: 5,
            exec: 'testMethod3'
        },
        scenario_name4: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '1s', target: 10},
                {duration: '3s', target: 10},
                {duration: '10s', target: 0}
            ],
            gracefulRampDown: '10s',
            exec: 'testMethod4'
        }
    },
    discardResponseBodies: true
}

let res;

export function testMethod1() {
    console.log('testMethod1 started')
    res = http.get('https://reqres.in/api/unknown');
    checkStatusCode(res);
    console.log(res.body)
}

export function testMethod2() {
    console.log('testMethod2 started')
    res = http.get('https://test.k6.io/news.php')
    checkStatusCode(res);
    console.log('testMethod2 over')
}

export function testMethod3() {
    console.log('testMethod3 started')
    res = http.put('https://httpbin.test.k6.io/put', JSON.stringify({name: 'Bert'}), {headers: {'Content-Type': 'application/json'}});
    checkStatusCode(res);
    console.log('testMethod3 over')
}

export function testMethod4() {
    console.log('testMethod4 started')
    res = http.post('https://httpbin.test.k6.io/post', JSON.stringify({name: 'Bert'}), {headers: {'Content-Type': 'application/json'}});
    checkStatusCode(res);
    console.log('testMethod4 over')
}

function checkStatusCode(res) {
    /*
    * if status code is greater than 399 then fail
    * */
    if (!(check(res, {'api call succeed': (res) => res.status === 200}))) {
        fail(`api call ${res.url} with body ${res.body} is failed`)
    }
}