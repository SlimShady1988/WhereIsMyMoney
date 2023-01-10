import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/components/App';
import UserStore from "./App/store/UserStore";
import OperationStore from "./App/store/OperationStore";
import { ContextProvider } from './App/context'

const context = {user: new UserStore(), operation: new OperationStore()}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ContextProvider value={context}>
            <App/>
        </ContextProvider>
    </React.StrictMode>
);
