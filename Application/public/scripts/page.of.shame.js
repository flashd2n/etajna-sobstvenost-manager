/* globals $, toastr */
(() => {
    const removeApt = (number) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/removeapt/${number}`,
                type: 'DELETE',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

    $('.sendMutri').on('click', (evt) => {
        const $button = $(evt.target);
        const $li = $button.parent();
        const aptNum = $li.data('aptnum');

        removeApt(aptNum)
            .then(() => {
                toastr.success(`Apartment ${aptNum} bites the dust!`);
                $li.remove();
            })
            .catch((err) => {
                console.log(err);
            });
    });
})();
