const BaseData = require('./base/base.data');
const Expense = require('../models/expense.model');

class ExpensesData extends BaseData {
constructor(database, validator) {
        super(database, Expense, validator);
    }
}

module.exports = ExpensesData;
