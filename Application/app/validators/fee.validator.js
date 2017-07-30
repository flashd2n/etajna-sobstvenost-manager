const isValid = (model) => {
    const month = model.month;
    const year = model.year;
    const cost = model.cost;
    const paid = model.paid;
    const notPaid = model.notPaid;

    if (typeof month === 'undefined' ||
        typeof year === 'undefined' ||
        typeof cost === 'undefined' ||
        typeof paid === 'undefined' ||
        typeof notPaid === 'undefined') {
        return false;
    }

    if (isNaN(month) ||
        isNaN(year) ||
        isNaN(cost) ||
        !Array.isArray(paid) ||
        !Array.isArray(notPaid)) {
        return false;
    }
    console.log('PASSED');
    return true;
};

module.exports = { isValid };
