import http, {RefinedResponse} from "k6/http";

export default function putCall() {
    const url = 'https://httpbin.test.k6.io/put';
    const body = JSON.stringify({
        name: 'Bert'
    });
    const param = {
        'Content-Type': 'application/json'
    }
    const res = http.put(url, body, param);
    // console.log((res.body));
    console.log(JSON.parse(res.body).json.name);
    console.log(res.status);
}