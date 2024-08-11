$(document).ready(() => {

    $('button').click(() => {

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                for (const place of data) {
                    $('.places').append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">
                                    $${place.price_by_night}
                                </div>
                            </div>
                            <div class="information">
                                <div class="max_guest">
                                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                                    <br />
                                    ${place.max_guest} Guests
                                </div>
                                <div class="number_rooms">
                                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                                    <br />
                                    ${place.number_rooms} Bedrooms
                                </div>
                                <div class="number_bathrooms">
                                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                                    <br />
                                    ${place.number_bathrooms} Bathroom 
                                </div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`);
                    }
            }
        })
    });

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            success: function (data) {
                if (data.status === "OK") {
                    console.log(data.status);
                    $('#api_status').addClass('available');
                    console.log("Class added ", $('#api_status').attr('class'));
                }
                else{
                    $('div#api_status').removeClass('available');
                }

            }
    });
    /*
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            for (const place of data) {
                $('.places').append(
                    `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">
                                $${place.price_by_night}
                            </div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.max_guest} Guests
                            </div>
                            <div class="number_rooms">
                                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_rooms} Bedrooms
                            </div>
                            <div class="number_bathrooms">
                                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_bathrooms} Bathroom 
                            </div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`);
                }
        }
    })
        */


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
    // States and Cities
    $(".popover input").change(function () {
        const states = [];
        const cities = [];
        const names = [];
        $(".popover input:checked").each(function () {
            if ($(this).data("name") && $(this).data("id")) {
                names.push($(this).data("name"));
                if ($(this).data("id").startsWith("state")) {
                    states.push($(this).data("id"));
                } else if ($(this).data("id").startsWith("city")) {
                    cities.push($(this).data("id"));
                }
            }
        });
        $(".popover input::unchecked").each(function (){
            if ($(this).data("name") && $(this).data("id")) {
                names.pop($(this).data("name"));
                if ($(this).data("id").startsWith("state")) {
                    states.pop($(this).data("id"));
                } else if ($(this).data("id").startsWith("city")) {
                    cities.pop($(this).data("id"));
                }
            }
        })
        if (names.length > 0) {
            $(".locations h4").text(names.join(", "));
        } else {
            $(".locations h4").html("&nbsp;");
        }
    });
});
