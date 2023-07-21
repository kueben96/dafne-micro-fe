import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { MyHistoryProvider } from './utils/MyHistoryProvider';


ReactDOM.render(
    <MyHistoryProvider>
        <BrowserRouter><App /></BrowserRouter>
    </MyHistoryProvider>


    ,
    document.querySelector('#root')
)

