/* globals $, toastr */
(() => {
    const callLoader = () => {
        $.loader({
            className: 'blue-with-image-2',
            content: '',
        });
    };

    $('.approve, .reject, .complete-expense').on('click', (evt) => {
        callLoader();
    });

    $('#fee').on('submit', (evt) => {
        const month = $('#month').val();
        const year = $('#year').val();
        const fee = $('#cost').val();

        if (isNaN(month) || isNaN(year) || isNaN(fee)) {
            toastr.error(`All inputs must be numbers`);
            evt.preventDefault();
        } else {
            callLoader();
        }
    });
})();
