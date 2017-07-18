class Appartment {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.appartmentNameOrNumber === 'string' &&
            typeof model.appartmentNameOrNumber;
    }

    static toViewModel(model) {
        const viewModel = new Appartment();

        Object.keys(model)
            .forEach((prop) => {
                if (prop === 'passowrdHash') {
                    // The view must not see the password
                    return;
                }
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Appartment;
