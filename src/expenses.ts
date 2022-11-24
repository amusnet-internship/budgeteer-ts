import { Collection } from "./data/Collection";
import { ExpenseService } from "./data/ExpenseService";
import { Expense } from "./data/models";
import { LocalStorage } from "./data/Storage";
import { button, span, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";


const storage = new LocalStorage();
const collection = new Collection(storage, 'expenses');
const expenseService = new ExpenseService(collection);

start();

async function start() {
    const table = document.querySelector('table');
    const tableManager = new Table(table, createExpenseRow, identifyExpense);

    const form = document.getElementById('new-expense') as HTMLFormElement;
    const editor = new Editor(form, onSubmit.bind(null, tableManager), ['date', 'name', 'category', 'amount']);

    hidrate(tableManager);
}

async function hidrate(tableManager: Table) {
    const expenses = await expenseService.getAll();
    for (let item of expenses) {
        tableManager.add(item);
    }
}

function identifyExpense(expenses: Expense[], id: string) {
    return expenses.find(e => e.id == id);
}

function createExpenseRow(expense: Expense) {
    console.log(expense);
    const row = tr({ dataId: expense.id },
        td({}, `${expense.date.getDate()}.${expense.date.getMonth() + 1}`),
        td({}, expense.name),
        td({}, expense.category),
        td({}, span({ className: 'currency' }, expense.amount.toString())),
        td({}, button({}, 'Edit'), button({}, 'Delete'))
    );

    return row;
}

async function onSubmit(tableManager: Table, { date, name, category, amount }) {
    const result = tableManager.get('7893-f6b4');
    console.log(result);

    const row = tableManager.getRow('7893-f6b4');
    console.log(row);
    /*
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getDate())) {
        throw TypeError('Invalid date');
    }
    if (Number.isNaN(Number(amount))) {
        throw TypeError('Amount must be a number');
    }

    const result = await expenseService.create({
        date: new Date(date),
        name,
        category,
        amount: Number(amount)
    });

    tableManager.add(result);
    */
}