import { MonthIndex, Budget } from "./models";
import { DataService } from "./Service";
import { Record } from "./Storage";


type BudgetData = {
    monthIndex: MonthIndex;
    income: number;
    budget: number;
}

export class BudgetService extends DataService<Budget, BudgetData> {

    protected parseRecord(record: Record): Budget {
        const data = record as any;
        const result = new Budget(
            data.id,
            data.monthIndex,
            data.income,
            data.budget
        );

        return result;
    }

    protected validate(data: any): void {
        if (typeof data.monthIndex != 'string') {
            throw new TypeError('Incompatible record. Invalid property "monthIndex"');
        }
        if (typeof data.income != 'number') {
            throw new TypeError('Incompatible record. Invalid property "income"');
        }
        if (typeof data.budget != 'number') {
            throw new TypeError('Incompatible record. Invalid property "budget"');
        }
    }

}