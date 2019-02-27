import {Dispatcher} from 'flux';
const assign = require('object-assign');

/**
 * Dispatchクラス
 * 具体的なアクションはそれぞれのクラスで定義している
 */
const AuthDispatcher = assign(new Dispatcher(), {

});

export default AuthDispatcher;