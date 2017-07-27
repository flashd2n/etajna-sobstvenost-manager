/* globals $ */
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

    Promise.all([getNotPaidFees, getNotPaidExpenses])
        .then((data) => {
            const fees = data[0];
            const expenses = data[1];
            console.log(fees);
            console.log(expenses);
        })
        .catch((err) => {
            console.log(err);
        });

    const populateFeesTable = (fees) => {

    };

    const populateExpensesTable = (fees) => {

    };
})();
