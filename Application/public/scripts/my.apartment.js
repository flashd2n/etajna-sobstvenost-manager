/* globals $, toastr */
import apiService from 'apiService';
(() => {
    const aptId = window.location.href.split('/')[4];

    const getNotPaidFees = apiService.get(`/api/notpaidfees/${aptId}`);
    const getNotPaidExpenses = apiService.get(`/api/notpaidexpenses/${aptId}`);

    const payFee = (feeId) => {
        return apiService.put(`/api/payfee/${aptId}`, { feeId });
    };
    const payExpense = (expenseId) => {
        return apiService.put(`/api/payexpense/${aptId}`, { expenseId });
    };

    let feeId;
    let expenseId;

    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    Promise.all([getNotPaidFees, getNotPaidExpenses])
        .then((data) => {
            const fees = data[0];
            const expenses = data[1];
            populateFeesTable(fees);
            populateExpensesTable(expenses);
            return;
        })
        .then(() => {
            $('.payFee').on('click', (evt) => {
                callLoader();
                const $clickedBtn = $(evt.target);
                const $feeItem = $clickedBtn.parent();
                feeId = $feeItem.data().id;
                payFee(feeId)
                    .then((res) => {
                        if (res === 'Success') {
                            $.loader('close');
                            $feeItem.remove();
                            toastr.success('Fee Paid!');
                        }
                    })
                    .catch((er) => {
                        $.loader('close');
                        toastr.error('ooops, something went wrong');
                        console.log(er);
                    });
            });

            $('.payExpense').on('click', (evt) => {
                callLoader();
                const $clickedBtn = $(evt.target);
                const $expenseItem = $clickedBtn.parent();
                expenseId = $expenseItem.data().id;
                payExpense(expenseId)
                    .then((res) => {
                        if (res === 'Success') {
                            $.loader('close');
                            $expenseItem.remove();
                            toastr.success('Expense Paid!');
                        }
                    })
                    .catch((er) => {
                        $.loader('close');
                        toastr.error('ooops, something went wrong');
                        console.log(er);
                    });
            });
        })
        .catch((err) => {
            console.log(err);
        });

    const populateFeesTable = (fees) => {
        const table = $('#fees');
        fees.forEach((fee) => {
            const row = $('<tr>').data('id', fee._id);
            const month = $('<td>').text(fee.month);
            const cost = $('<td>').text(fee.cost);
            const button = $('<button>').text('Pay Now').addClass('payFee');
            row.append(month);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };

    const populateExpensesTable = (expenses) => {
        const table = $('#expenses');
        expenses.forEach((expense) => {
            const row = $('<tr>').data('id', expense._id);
            const name = $('<td>').text(expense.name);
            const cost = $('<td>').text(expense.cost);
            const button = $('<button>').text('Pay Now').addClass('payExpense');
            row.append(name);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };
})();
