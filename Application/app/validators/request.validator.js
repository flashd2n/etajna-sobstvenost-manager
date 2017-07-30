const isValid = (model) => {
    console.log(model);
    const id = model.apartmentId;
    const number = model.number;
    const username = model.username;
    const password = model.password;
    if (typeof id === 'undefined' ||
        typeof number === 'undefined' ||
        typeof username === 'underfined' ||
        typeof password === 'undefined') {
        return false;
    }
    return true;
};

module.exports = { isValid };
