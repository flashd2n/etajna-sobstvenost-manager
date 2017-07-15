const express = require('express');

const init = () => {
    const app = express();

    return Promise.resolve(app);
};

module.exports = { init };
