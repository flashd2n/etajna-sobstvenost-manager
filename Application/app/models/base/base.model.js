class BaseModel {
    get id() {
        return this._id + '';
    }

    static toViewModel(data) {
        const viewModel = new this();

        Object.keys(data)
            .forEach((prop) => {
                if (prop === 'password') {
                    return;
                }
                viewModel[prop] = data[prop];
            });

        // viewModel.type = 'appartment'; -> WHY IS THIS?
        return viewModel;
    }
}

module.exports = BaseModel;
