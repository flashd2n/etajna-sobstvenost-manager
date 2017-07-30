/* globals $ */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('.createExpense').on('click', (evt) => {
        callLoader();
    });
})();
