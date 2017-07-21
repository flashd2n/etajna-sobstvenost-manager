/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    const attach = (modulePath) => {
        require(modulePath)(app, data);
    };

    const traverse = (dir) => {
        const directory = fs.readdirSync(dir);
        const jsFiles = [];
        const subDirs = [];

        directory.forEach((entry) => {
            if (entry.includes('router.js')) {
                jsFiles.push(entry);
            } else if (entry.indexOf('.js') === -1) {
                subDirs.push(entry);
            }
        });

        jsFiles.forEach((file) => {
            const absPath = path.join(dir, file);
            attach(absPath);
        });

        if (subDirs.length === 0) {
            return;
        }

        subDirs.forEach((subDir) => {
            const newDir = path.join(dir, subDir);
            traverse(newDir);
        });
    };

    traverse(__dirname);
};

module.exports = { attachTo };
