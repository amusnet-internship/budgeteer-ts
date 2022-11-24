import { Expense } from "./models";
import { DataService } from "./Service";
import { Record } from "./Storage";


type ExpenseData = {
    date: Date,
    name: string,
    category: string,
    amount: number
}

export class ExpenseService extends DataService<Expense, ExpenseData> {

    protected parseRecord(record: Record): Expense {
        const data = record as any;
        const result = new Expense(
            data.id,
            new Date(data.date),
            data.name,
            data.category,
            data.amount
        );

        return result;
    }

    protected validate(data: any): void {
        if (data.date instanceof Date == false) {
            throw new TypeError('Incompatible record. Invalid property "date"');
        }
        if (typeof data.name != 'string') {
            throw new TypeError('Incompatible record. Invalid property "name"');
        }
        if (typeof data.category != 'string') {
            throw new TypeError('Incompatible record. Invalid property "category"');
        }
        if (typeof data.amount != 'number') {
            throw new TypeError('Incompatible record. Invalid property "amount"');
        }
    }
}