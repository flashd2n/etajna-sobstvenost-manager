/* globals $, toastr */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('#registration').on('submit', (evt) => {
        const username = $('.username').val();
        const pattern = /^\w+$/;

        const password = $('.password').val();

        if (username.length <= 2 || !pattern.test(username)) {
            toastr.error(`The username must be longer than 2 characters
            and can only contain letters, numbers and underscore`);

            evt.preventDefault();
        } else if (password.length <= 2) {
            toastr.error(`The password must be longer than 2 characters`);

            evt.preventDefault();
        } else {
            callLoader();
        }
    });
})();
