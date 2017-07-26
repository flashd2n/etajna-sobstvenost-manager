/* globals io, $ */
'use strict';

(() => {
    $.ajax({
        url: '/api/getusername',
        success: (res) => {
            success(res);
        },
        error: (err) => {
            error(err);
        },
        type: 'GET',
    });

    const success = (user) => {
        const username = user.username;
        // const aptNum = user.number;
        // const userType = user.type;
        // const userId = user._id;

        const socket = io.connect();
    };

    const error = (err) => {
        console.log(err);
    };
})();
