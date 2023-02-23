import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/components/App';
import UserStore from "./App/store/UserStore";
import DebitOperationStore from "./App/store/DebitOperationStore";
import CreditOperationStore from "./App/store/CreditOperationStore";
import DebitCategoryStore from "./App/store/DebitCategoryStore";
import CreditCategoryStore from "./App/store/CreditCategoryStore";
import { ContextProvider } from './App/context'

const context = {
    user: new UserStore(),
    creditCategory: new CreditCategoryStore(),
    debitCategory: new DebitCategoryStore(),
    creditOperation: new CreditOperationStore(),
    debitOperation: new DebitOperationStore()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ContextProvider value={context}>
            <App/>
        </ContextProvider>
    </React.StrictMode>
);
