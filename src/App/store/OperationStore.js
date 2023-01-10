import {makeAutoObservable} from "mobx";

export default class OperationStore {

    constructor() {
        this._types = [
            {id: 1, name: "credit"},
            {id: 2, name: "debit"}
        ];
        this._categories = [

        ];
        this._wallets = [

        ];
        this._operations = [
            {id: 1, type:1, name: "покупки їжу", value: 190, items: [
                {id:1, name: "Огірки", price: 45.00, count: 2, sum: 90.00},
                    {id:2, name: "Red Bull", price: 45.30, count: 1, sum: 45.30},
                    {id:2, name: "Буряк", price: 27.35, count: 2, sum: 54.70},
                ]
            },
            {id: 2, type:1, name: "шмотки", value: 2300, items: [
                    {id:1, name: "Штани", price: 1000.00, count: 1, sum: 1000.00},
                    {id:2, name: "Труси", price: 250, count: 2, sum: 500.00},
                    {id:3, name: "Сорочка", price: 800, count: 1, sum: 800.00},
                ]
            },
            {id: 3, type:2, name: "ЗП", value: 50000, items: []},
            {id: 4, type:2, name: "Мама", value: 20000, items: []}

        ];

        this._selectedType = {};
        this._selectedCategory = {};
        this._selectedWallet = {};

        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;

        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setWallets(wallets) {
        this._wallets = wallets;
    }

    setOperations(operations) {
        this._operations = operations;
    }

    setSelectedType(type) {
        // this.setPage(1)
        this._selectedType = type;
    }

    setSelectedCategory(category) {
        // this.setPage(1)
        this._selectedCategory = category;
    }

    setSelectedWallet(wallet) {
        // this.setPage(1)
        this._selectedWallet = wallet;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    get types() {
        return this._types;
    }

    get categories() {
        return this._categories;
    }

    get wallets() {
        return this._wallets;
    }

    get operations() {
        return this._operations;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedWallet() {
        return this._selectedWallet;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }

}