/* globals $ */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('.login').on('click', (evt) => {
        callLoader();
    });
})();
