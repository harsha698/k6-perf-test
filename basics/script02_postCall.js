import http from "k6/http";

export default function postCall () {
    const url = 'https://httpbin.test.k6.io/post';
    const payload = JSON.stringify({
        name: 'Bert'
    })
    const params = {
        headers : {'Content-Type': 'application/json'}
    }
    const res = http.post(url, payload, params);
    console.log(res.body)
}