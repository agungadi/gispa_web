'use strict';

$(document).ready(function () {
    $(document).on('submit', '#sendEnquiryForm', function (e) {
        e.preventDefault();
        showSpinner();
        $.ajax({
            url: route('admin.send.enquiry'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    setTimeout(function () {
                        $('#sendEnquiryForm')[0].reset();
                        grecaptcha.reset();
                    }, 3000);
                }
            },
            error: function (result) {
                grecaptcha.reset();
                displayErrorMessage(result.responseJSON.message);
            },
            complete: function () {
                hideSpinner();
            },
        });
    });

    window.showSpinner = function () {
        $('.btnAction>i').removeClass('d-none');
    };

    window.hideSpinner = function () {
        $('.btnAction>i').addClass('d-none');
    };
});
