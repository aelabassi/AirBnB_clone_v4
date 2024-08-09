$(document).ready(() => {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            success: function (data) {
                if (data.status === "OK") {
                    console.log(data.status);
                    $('#api_status').addClass('available');
                }
                else{
                    $('#api_status').removeClass('available');
                }

            }
    });

    const amenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        if (Object.values(amenities).length > 0) {
            $('.amenities h4').text(Object.values(amenities).join(', '));
        } else {
            $('.amenities h4').html('&nbsp;');
        }
    });

})