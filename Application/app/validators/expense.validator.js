const isValid = (model) => {
    const name = model.name;
    const descr = model.description;
    const cost = model.cost;
    const state = model.state;
    const paid = model.paid;
    const notPaid = model.notPaid;

    if (typeof name === 'undefined' ||
        typeof descr === 'undefined' ||
        typeof cost === 'undefined' ||
        typeof state === 'undefined' ||
        typeof paid === 'undefined' ||
        typeof notPaid === 'undefined') {
        return false;
    }

    if (name.length === 0 ||
        descr.length === 0 ||
        isNaN(cost) ||
        state !== 'pending' ||
        !Array.isArray(paid) ||
        !Array.isArray(notPaid)) {
        return false;
    }
    console.log('PASSED');
    return true;
};

module.exports = { isValid };
