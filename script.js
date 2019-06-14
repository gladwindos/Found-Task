function initMap() {

    const inputFrom = document.getElementById('input-from');
    const inputTo = document.getElementById('input-to');

    const distanceResult = document.getElementById('distance-result');
    const resetButton = document.getElementById('reset-button');

    // Add Autocomplete
    const fromAc = new google.maps.places.Autocomplete(inputFrom);
    const toAc = new google.maps.places.Autocomplete(inputTo);

    // Submit form
    $(document).ready(function () {
        $('#distance-form').submit(function (e) {
            e.preventDefault();

            const fromVal = inputFrom.value;
            const toVal = inputTo.value;

            // Check both fields filled
            if (!fromVal || !toVal) {
                distanceResult.innerText = 'Please fill in both fields.'
            } else {
                // Distance request
                const distanceService = new google.maps.DistanceMatrixService;
                distanceService.getDistanceMatrix({
                    origins: [fromVal],
                    destinations: [toVal],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.MERTIC
                }, function (response, status) {
                    if (status !== 'OK') {
                        alert('Error was: ' + status);
                    } else {

                        console.log(response);

                        const result = response.rows[0].elements[0]

                        const origin = response.originAddresses[0];
                        const destination = response.destinationAddresses[0];

                        if (result.status !== 'OK') {
                            distanceResult.innerText = 'The distance could not be found! Please try again...'
                            resetButton.style.display = 'inline-block';
                        } else {
                            const distanceKm = Math.round(result.distance.value / 1000);
                            const distanceMiles = parseInt(distanceKm * 0.621371)
                            const duration = result.duration.text;

                            distanceResult.innerText = `The distance between ${origin} and ${destination} is ${distanceKm} km or ${distanceMiles} miles. 
                            This will take ${duration} by car.`;
                            resetButton.style.display = 'inline-block';
                        }
                    }
                });
            }
        });
        // Reset fields and result
        $('#reset-button').click(function () {
            inputFrom.value = ""
            inputTo.value = ""
            distanceResult.innerText = ""
            resetButton.style.display = 'none';
        });
    });
}