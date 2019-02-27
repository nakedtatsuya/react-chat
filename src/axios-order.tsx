import axios from 'axios';
let instance : any = null;
/**
 * axiosの設定
 * APIのURLとアイムアウトだけ設定してる
 */
if(process.env.NODE_ENV == 'development') {
    instance = axios.create({
        baseURL: 'http://localhost:3001/',
        timeout: 10000
    });
}else {
    instance = axios.create({
        baseURL: 'https://mysterious-beyond-80867.herokuapp.com/',
        timeout: 10000
    });
}




export default instance;