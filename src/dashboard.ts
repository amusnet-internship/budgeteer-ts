import { Collection } from "./data/Collection";
import { ExpenseService } from "./data/ExpenseService";
import { LocalStorage } from "./data/Storage";

console.log('dashboard');



async function start() {
    const storage = new LocalStorage();
    const collection = new Collection(storage, 'expenses');
    const expenseService = new ExpenseService(collection);

    console.log(await expenseService.getAll());

    const expenseData = {
        date: new Date(),
        name: 'Weekly shopping',
        category: 'groceries',
        amount: 65
    };

    const expense = await expenseService.create(expenseData);

    console.log(expense);

    console.log(await expenseService.getAll());
}

start();