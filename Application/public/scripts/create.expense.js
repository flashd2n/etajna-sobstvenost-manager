/* globals $, toastr */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('#create').on('submit', (evt) => {
        const name = $('#name').val();

        const description = $('#description').val();
        const cost = $('#cost').val();

        if (name.length === 0) {
            toastr.error(`The name cannot be empty`);

            evt.preventDefault();
        } else if (description.length === 0) {
            toastr.error(`The description cannot be empty`);

            evt.preventDefault();
        } else if (isNaN(cost)) {
            toastr.error(`The cost must be a number`);

            evt.preventDefault();
        } else {
            callLoader();
        }
    });
})();
