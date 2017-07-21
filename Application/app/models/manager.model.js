class Manager {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.passwordHash === 'string';
    }

    static toViewModel(model) {
        const viewModel = new Manager();

        Object.keys(model)
            .forEach((prop) => {
                if (prop === 'passowrdHash') {
                    // The view must not see the password
                    return;
                }
                viewModel[prop] = model[prop];
            });

        viewModel.type = 'manager';
        return viewModel;
    }
}

module.exports = Manager;
