import {makeAutoObservable} from "mobx";

export default class WalletStore {
    constructor() {
        this._wallets = [];
        this._debit_operations = [];
        this._credit_operations = [];


        // this._selectedOperationType = {};
        // this._selectedBrand = {};
        // this._page = 1;
        // this._totalCount = 0;
        // this._limit = 3;
        makeAutoObservable(this);
    }



    get wallets() {
        return this._wallets;
    }

    setWallets(wallets) {
        this._wallets = wallets;
    }

    get debit_operations() {
        return this._debit_operations;
    }

    setDebit_operations(debit_operations) {
        this._debit_operations = debit_operations;
    }

    get credit_operations() {
        return this._credit_operations;
    }

    setCredit_operations(credit_operations) {
        this._credit_operations = credit_operations;
    }



}