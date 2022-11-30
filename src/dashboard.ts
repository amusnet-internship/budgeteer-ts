import { Collection } from "./data/Collection";
import { ExpenseService } from "./data/ExpenseService";
import { RemoteStorage } from "./data/Remote";

console.log('dashboard');


async function start() {
    const storage = new RemoteStorage();
    const data = await storage.getAll('expenses');
    console.log(data);

    const record = await storage.getById('expenses', data[1].id) as any;
    console.log(record);


    /*
    record.amount = 70;

    const result = await storage.update('expenses', record.id, record);

    console.log(result);
    */

    /*
    const expenseData = {
        date: new Date(),
        name: 'Weekly shopping',
        category: 'groceries',
        amount: 65
    };

    const record = await storage.create('expenses', expenseData);

    */

    /*
    const collection = new Collection(storage, 'expenses');
    const expenseService = new ExpenseService(collection);

    console.log(await expenseService.getAll());

    

    const expense = await expenseService.create(expenseData);

    console.log(expense);

    console.log(await expenseService.getAll());
    */
}

start();