document.addEventListener("DOMContentLoaded", function () {
    const activitySelect = document.getElementById("activitySelect");
    const locationSelect = document.getElementById("locationSelect");
    const fetchLocationsButton = document.getElementById("fetchLocationsButton");
    const resultDiv = document.getElementById("result");

    //display results as list with customized colunm name
    function displayResultsAsList(data) {
        const columnNames = {
            "location": "Location",
            "swim": "Swimming Permitted",
            "lifeguards": "Lifeguards Available",
            "beach": "Has Beach",
            "boat_ramp": "Boat Ramp Available",
            "non_moto_boats": "Non-Motorized Watercraft Permitted",
            "bathrooms": "Bathrooms Available",
            "address": "Address",
            "hours": "Operating Hours",
            "dedicated_parking": "Dedicated Parking",
            "entrance_fee": "Entrance Fee",
            "water_qual_info": "Water Quality Information"
        };

        let resultList = "<ul>";
        for (let key in data) {
            if (key !== "id") { // exclude ID column
                const columnName = columnNames[key] || key; // customized column name if available, otherwise use original key
                resultList += `<li><span style="font-weight: normal;">${columnName}:</span> <strong>${data[key]}</strong></li>`;
            }
        }
        resultList += "</ul>";
        return resultList;
    }

    //fetch and display details for a selected location
    function fetchAndDisplayLocationDetails(selectedLocation) {
        fetch(`app/get_location_details.php?location=${selectedLocation}`)
            .then(response => response.json())
            .then(data => {
                if (data.locationDetails) {
                    resultDiv.innerHTML = displayResultsAsList(data.locationDetails);
                } else if (data.message) {
                    resultDiv.innerHTML = data.message;
                } else {
                    resultDiv.innerHTML = "Unexpected response from the server.";
                }
            })
            .catch(error => console.error("Error fetching location details: " + error));
    }

    // fetch and populate locations based on selected activity
    function fetchAndPopulateLocations(selectedActivity) {
        fetch(`app/get_locations.php?activity=${selectedActivity}`)
            .then(response => response.json())
            .then(data => {
                if (data.locations) {
                    locationSelect.innerHTML = "";
                    data.locations.forEach(location => {
                        const option = document.createElement("option");
                        option.value = location.id;
                        option.textContent = location.location;
                        locationSelect.appendChild(option);
                    });
                } else if (data.message) {
                    resultDiv.innerHTML = data.message;
                } else {
                    resultDiv.innerHTML = "Unexpected response from the server.";
                }
            })
            .catch(error => console.error("Error fetching locations: " + error));
    }

    // Event listener, activity selection
    activitySelect.addEventListener("change", function () {
        let selectedActivity = activitySelect.value;

        console.log(selectedActivity);

        // clear results whenever new activity chosen
        resultDiv.innerHTML = "";

        // fetch and populate locations based on selected activity
        fetchAndPopulateLocations(selectedActivity);
    });

    // Event listener for location selection
    locationSelect.addEventListener("change", function () {
        const selectedLocation = locationSelect.value;

        // clear results whenever new location chosen
        resultDiv.innerHTML = "";

        // fetch and display details for the selected location
        fetchAndDisplayLocationDetails(selectedLocation);
    });

    // Event listener for button click to fetch location details
    fetchLocationsButton.addEventListener("click", function () {
        const selectedLocation = locationSelect.value;

        // clear results whenever button is clicked
        resultDiv.innerHTML = "";

        // Fetch + display details for selected location
        fetchAndDisplayLocationDetails(selectedLocation);
    });

    // Event listener for thumbs-up button click
    document.getElementById("thumbsUpButton").addEventListener("click", function () {
        submitOpinion("thumbs_up");
    });

    // Event listener for thumbs-down button click
    document.getElementById("thumbsDownButton").addEventListener("click", function () {
        submitOpinion("thumbs_down");
    });

    // submit opinions to the server
    function submitOpinion(opinionType) {
        const opinionLocationSelect = document.getElementById("opinionLocationSelect");
        const selectedLocation = opinionLocationSelect.value;

        // check if a location selected
        if (!selectedLocation) {
            alert("Please select a location before submitting your opinion.");
            return;
        }

        // send opinion data to server
        fetch(`app/submit_opinion.php?location_id=${selectedLocation}&opinion_type=${opinionType}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Thank you for your ${opinionType === "thumbs_up" ? "thumbs-up" : "thumbs-down"} opinion!`);
                } else {
                    alert("Error submitting your opinion. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error submitting opinion: " + error);
                alert("An error occurred. Please try again later.");
            });
    }

    // Set "Swim" as DEFAULT activity
    activitySelect.value = "swim";

    // fetch and populate locations for default activity on page load
    fetchAndPopulateLocations(activitySelect.value);

    // DEFAULT SETTINGS: display results for Verdun Beach (1st for "swim") on page load
    // where "2" is the ID for Verdun Beach, which is the first option for "swim"
    fetchAndDisplayLocationDetails(2);

    function fetchAndPopulateOpinionLocations() {
    const opinionLocationSelect = document.getElementById("opinionLocationSelect");

    // Fetch locations for opinions from server
    fetch("app/get_opinion_locations.php")
        .then(response => response.json())
        .then(data => {
            if (data.locations) {
                opinionLocationSelect.innerHTML = "";
                data.locations.forEach(location => {
                    const option = document.createElement("option");
                    option.value = location.id;
                    option.textContent = location.location;
                    opinionLocationSelect.appendChild(option);
                });
            } else if (data.message) {
                alert(data.message);
            } else {
                alert("Unexpected response from the server.");
            }
        })
        .catch(error => {
            console.error("Error fetching opinion locations: " + error);
            alert("An error occurred. Please try again later.");
        });
}

    // Call function to populate opinion locations 
        fetchAndPopulateOpinionLocations();
});




