class BaseModel {
    get id() {
        return this._id + '';
    }

    static toViewModel(data) {
        const viewModel = new this();

        Object.keys(data)
            .forEach((prop) => {
                if (prop === 'password' &&
                    this.name.toLowerCase() !== 'request') {
                    return;
                }
                viewModel[prop] = data[prop];
            });

        viewModel.type = this.name.toLowerCase();
        return viewModel;
    }

    static toViewModelWithPass(data) {
        const viewModel = new this();

        Object.keys(data)
            .forEach((prop) => {
                viewModel[prop] = data[prop];
            });

        viewModel.type = this.name.toLowerCase();
        return viewModel;
    }
}

module.exports = BaseModel;
