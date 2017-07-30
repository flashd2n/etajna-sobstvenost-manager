/* globals $, toastr */
(() => {
    const aptId = window.location.href.split('/')[4];

    const getNotPaidFees = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/notpaidfees/${aptId}`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    const getNotPaidExpenses = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/notpaidexpenses/${aptId}`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    const payFee = (feeId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/payfee/${aptId}`,
                data: {
                    feeId: feeId,
                },
                type: 'PUT',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

    const payExpense = (expenseId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/payexpense/${aptId}`,
                data: {
                    expenseId: expenseId,
                },
                type: 'PUT',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
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
            const button = $('<button>').text('Pay Now')
                .addClass('payFee')
                .addClass('btn')
                .addClass('btn-success');
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
            const button = $('<button>').text('Pay Now')
                .addClass('payExpense')
                .addClass('btn')
                .addClass('btn-success');
            row.append(name);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };
})();
