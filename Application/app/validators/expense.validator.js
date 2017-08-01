const isValid = (model) => {
    const name = model.name;
    const descr = model.description;
    const cost = model.cost;
    const state = model.state;
    const paid = model.paid;
    const notPaid = model.notPaid;

    if (typeof name === 'undefined' || name === null ||
        typeof descr === 'undefined' || descr === null ||
        typeof cost === 'undefined' || cost === null ||
        typeof state === 'undefined' || state === null ||
        typeof paid === 'undefined' || paid === null ||
        typeof notPaid === 'undefined' || notPaid === null) {
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
