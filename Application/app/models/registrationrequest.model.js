class RegistrationRequest {
    static isValid(model) {
        if (typeof model === 'undefined') {
            return false;
        }

        if (typeof model.appartmentNameOrNumber !== 'string' ||
            typeof model.appartmentNameOrNumber) {
                return false;
        }

        if (typeof model.username !== 'string' ||
            typeof model.username.length <= 3) {
                return false;
        }

        if (typeof model.passwordHash !== 'string' ||
            typeof model.passwordHash.length < 64 ||
            typeof model.passwordHash.length > 64) {
                return false;
        }

        if (typeof model.appartmentId === 'undefined') {
                return false;
        }

        return true;
    }

    static toViewModel(model) {
        const viewModel = new RegistrationRequest();

        Object.keys(model)
            .forEach((prop) => {
                if (prop === 'passowrdHash') {
                    // The view must not see the password
                    return;
                }
                viewModel[prop] = model[prop];
            });

        viewModel.type = 'appartment';
        return viewModel;
    }
}

module.exports = RegistrationRequest;
