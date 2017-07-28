/* globals $ */

(() => {
    const getAllDebtors = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/alldebtors`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    const getCurrentExpenses = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/currentexpenses`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    Promise.all([getAllDebtors, getCurrentExpenses])
        .then((data) => {
            const allDebtors = data[0];
            const allExpenses = data[1];

            const totalUnpaid = calculateTotalUnpaid(allDebtors);
            const totalDebtors = getDebtorsCount(allDebtors);
            const totalExpenses = getExpensesCount(allExpenses);

            updatePageWithValues(totalUnpaid, totalDebtors, totalExpenses);
        });

    const calculateTotalUnpaid = (allDebtors) => {
        let totalUnpaid = 0;

        allDebtors.forEach((apt) => {
            totalUnpaid += calculateAptDept(apt);
        });

        return totalUnpaid;
    };

    const calculateAptDept = (apt) => {
        let aptDebt = 0;

        apt.notPaidExpenses.forEach((expense) => {
            aptDebt += expense.cost;
        });

        apt.notPaidFees.forEach((fee) => {
            aptDebt += fee.cost;
        });

        return aptDebt;
    };

    const getDebtorsCount = (allDebtors) => {
        return allDebtors.length;
    };

    const getExpensesCount = (allExpenses) => {
        return allExpenses.length;
    };

    const updatePageWithValues = (totalUnpaid, totalDebtors, totalExpenses) => {
        $('#totalDebt').text(totalUnpaid);
        $('#totalDebtors').text(totalDebtors);
        $('#expensesCount').text(totalExpenses);
    };
})();
