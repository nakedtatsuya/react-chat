import {Dispatcher} from 'flux';
const assign = require('object-assign');

const AuthDispatcher = assign(new Dispatcher(), {

    handleViewAction(action: any) {
        console.log('dispatcher now');
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action,
        })
    },
});

export default AuthDispatcher;