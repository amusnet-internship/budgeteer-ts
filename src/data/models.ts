import { Record, RecordId } from "./Storage";


export type MonthIndex = string;

export class Expense implements Record {
    constructor(
        public id: RecordId,
        public date: Date,
        public name: string,
        public category: string,
        public amount: number
    ) { }
}

export class Budget implements Record {
    constructor(
        public id: RecordId,
        public monthIndex: MonthIndex,
        public income: number,
        public budget: number
    ) {}
}