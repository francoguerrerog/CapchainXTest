import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import App from './app';
import Home from './home';
import NewTrade from './newTrade';
import NewVersion from  './newVersion';
import RenderRouter from './router';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <div class="container">
            <App>
                <Home/>            
                <NewTrade/>
                <br/>
                <br/>
                <NewVersion/>
                <br/>
            </App>
        </div>
    </Provider>,
app);