import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'flux/utils';
import FluxContainer from './modules/fluxContainer';
import * as serviceWorker from './serviceWorker';

//flux管理コンテナー
const AppContainer = Container.create(FluxContainer);

ReactDOM.render(<AppContainer />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
