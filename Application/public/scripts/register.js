/* globals $ */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('.register').on('click', (evt) => {
        callLoader();
    });
})();
