import { Collection } from "./data/Collection";
import { ExpenseService } from "./data/ExpenseService";
import { Expense } from "./data/models";
import { RemoteStorage } from "./data/Remote";
import { button, span, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";


const storage = new RemoteStorage();
const collection = new Collection(storage, 'expenses');
const expenseService = new ExpenseService(collection);

const formContainer = document.getElementById('forms');


const table = document.querySelector('table');
const tableManager = new Table(table, createExpenseRow, identifyExpense);

const newForm = document.getElementById('new-expense') as HTMLFormElement;
const editForm = document.getElementById('edit-expense') as HTMLFormElement;
const newExpenseEditor = new Editor(newForm, onSubmit.bind(null, tableManager), ['date', 'name', 'category', 'amount']);
const editExpenseEditor = new Editor(editForm, onEdit.bind(null, tableManager), ['id', 'date', 'name', 'category', 'amount']);
editExpenseEditor.remove();

tableManager.element.addEventListener('click', onTableClick);

hidrate(tableManager);

function onTableClick(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
        if (event.target.className == 'edit') {
            newExpenseEditor.remove();
            editExpenseEditor.attachTo(formContainer);

            const id = event.target.parentElement.parentElement.dataset.id;
            const record = tableManager.get(id);
            editExpenseEditor.setValues(record);
        }
    }
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
    const row = tr({ dataId: expense.id },
        td({}, `${expense.date.getDate()}.${expense.date.getMonth() + 1}`),
        td({}, expense.name),
        td({}, expense.category),
        td({}, span({ className: 'currency' }, expense.amount.toString())),
        td({}, button({ className: 'edit' }, 'Edit'), button({ className: 'delete' }, 'Delete'))
    );

    return row;
}

async function onSubmit(tableManager: Table, { date, name, category, amount }) {
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
}

async function onEdit(tableManager: Table, { id, date, name, category, amount }) {
    date = new Date(date);
    amount = Number(amount);

    const result = await expenseService.update(id, { date, name, category, amount });
    tableManager.replace(id, result);

    editExpenseEditor.remove();
    newExpenseEditor.attachTo(formContainer);
}