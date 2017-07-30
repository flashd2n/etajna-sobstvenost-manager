/* globals $ */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('.approve, .reject, .createFee, .complete-expense').on('click', (evt) => {
        callLoader();
    });
})();
