const isValid = (model) => {
    const id = model.apartmentId;
    const number = model.number;
    const username = model.username;
    const password = model.password;

    if (typeof id === 'undefined' ||
        typeof number === 'undefined' ||
        typeof username === 'undefined' ||
        typeof password === 'undefined') {
        return false;
    }
    if (id.length !== 24 ||
        isNaN(number) ||
        username.length <= 2 ||
        password.length !== 64) {
        return false;
    }
    console.log('PASSED');
    return true;
};

module.exports = { isValid };
