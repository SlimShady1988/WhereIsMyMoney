import {makeAutoObservable} from "mobx";
import Clothes from "../../App/static/sweater.png";
import Food from "../../App/static/pizza.png";
import Cafe from "../../App/static/tea-cup.png";
import Bill from "../../App/static/bill.png";
import Present from "../../App/static/gift-box.png";


export default class UserStore {
    constructor() {
        // this._isAuth = false;
        this._isAuth = true;
        this._user = {};
        this._selectedWallet = {};
        this._selectedDebitCategory = {};
        this._selectedCreditCategory = {};
        this._creditBudget = 0;
        this._wallets = [
            {
                id:1,
                name:"wallet1",
                img: "https://content2.rozetka.com.ua/goods/images/big/210297132.jpg"
            },
            {
                id:2,
                name:"wallet2",
                img: "https://content2.rozetka.com.ua/goods/images/big/210297132.jpg"

            },
        ];

        this._debit_categories = [
            {
                id: 1,
                name: "нерухомість",

                img: "https://content1.rozetka.com.ua/goods/images/big/6863091.jpg"
            },
            {
                id: 2,
                name: "депозит",
                img: "https://content1.rozetka.com.ua/goods/images/big/6863091.jpg"
            },
            {
                id: 3,
                name: "зарплата",
                img: "https://content1.rozetka.com.ua/goods/images/big/6863091.jpg"
            },
            {
                id: 4,
                name: "премія",
                img: "https://content1.rozetka.com.ua/goods/images/big/6863091.jpg"
            },
        ];


        this._credit_categories = [
            {
                id: 1,
                name: "одяг",
                budget: 5000,
                spend: 3000,
                img: Clothes
            },
            {
                id: 2,
                name: "їда",
                budget: 5000,
                spend: 2000,
                img: Food
            },
            {
                id: 3,
                name: "кафе та ресторани",
                budget: 1000,
                spend: 300,
                img: Cafe
            },
            {
                id: 4,
                name: "комуналка",
                budget: 2000,
                spend: 1500,
                img: Bill
            },
            {
                id: 5,
                name: "подарунки",
                budget: 5000,
                spend: 5000,
                img: Present
            },
        ];

        // this._selectedCategory = {};
        // this._selectedWallet = {};
        // this._page = 1;
        // this._totalCount = 0;
        // this._limit = 3;
        makeAutoObservable(this);
    }

    get isAuth() {
        return this._isAuth;
    }

    setIsAuth(bool) {
        // this._isAuth = !this._isAuth;
        this._isAuth = bool;
    }

    get isUser() {
        return this._user;
    }

    setUser(user) {
        this._user = user;
    }

    get wallets() {
        return this._wallets;
    }

    setWallets(wallets) {
        this._wallets = wallets;
    }

    get credit_categories() {
        return this._credit_categories;
    }

    setCreditCategories(credit_categories) {
        this._credit_categories = credit_categories;
    }

    get debit_categories() {
        return this._debit_categories;
    }

    setDebitCategories(debit_categories) {
        this._debit_categories = debit_categories;
    }

    get selectedWallet() {
        return this._selectedWallet
    }

    setSelectedWallet(selectedWallet) {
        this._selectedWallet = selectedWallet;
    }

    get selectedDebitCategory() {
        return this._selectedDebitCategory;
    }

    setSelectedDebitCategory(selectedDebitCategory) {
        this._selectedDebitCategory = selectedDebitCategory;
    }

    get selectedCreditCategory() {
        return this._selectedDebitCategory;
    }

    setSelectedCreditCategory(selectedCreditCategory) {
        this._selectedDebitCategory = selectedCreditCategory;
    }

    get creditBudget() {
        this.credit_categories.map(category => {
             return this._creditBudget += category.budget;
        })
        return this._creditBudget
    }

    // setSelectedCreditCategory(selectedCreditCategory) {
    //     this._selectedDebitCategory = selectedCreditCategory;
    // }

}