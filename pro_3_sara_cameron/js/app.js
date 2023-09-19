document.addEventListener("DOMContentLoaded", function () {
    const activitySelect = document.getElementById("activitySelect");
    const locationSelect = document.getElementById("locationSelect");
    const fetchLocationsButton = document.getElementById("fetchLocationsButton");
    const resultDiv = document.getElementById("result");

    //display results as list with customized column names
    // Modify the displayResultsAsList function to exclude the ID
    function displayResultsAsList(data) {
        const columnNames = {
            //"id": "ID#", REMOVED
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

        /* VERSION 1
        let resultList = "<ul>";
        for (let key in data) {
            const columnName = columnNames[key] || key; // custom column name if available, otherwise use the original key
            resultList += `<li><strong>${columnName}:</strong> ${data[key]}</li>`;
        }
        resultList += "</ul>";
        return resultList;
        }*/

        //replaced above code with below to exclude the id column from the list

        /* VERSION 2
        let resultList = "<ul>";
        for (let key in data) {
            if (key !== "id") { // exclude the id column
                const columnName = columnNames[key] || key; // use original key unless custom name provided
                resultList += `<li><strong>${columnName}:</strong> ${data[key]}</li>`;
            }
        }
        resultList += "</ul>";
        return resultList;*/

        //replaced above code with below to change the custom names to non-bold and data from DB to bold.
        
        // VERSION 3
         let resultList = "<ul>";
            for (let key in data) {
                if (key !== "id") { // Exclude the ID column
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

        // clear results whenever a new activity is chosen
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

        // Fetch and display details for selected location
        fetchAndDisplayLocationDetails(selectedLocation);
    });

    // Set "Swim" as default activity on page load
    activitySelect.value = "swim";

    // fetch and populate locations for default activity on page load
    fetchAndPopulateLocations(activitySelect.value);

    // display results for Verdun Beach (1st for "swim") on initial page load, where "2" is the ID for Verdun Beach, which is first option for "swim"
    fetchAndDisplayLocationDetails(2); 
});



