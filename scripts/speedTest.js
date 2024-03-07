const scriptsList = [
    {
        url: "/scripts/script_slow.js",
        category: "low",
    },
    {
        url: "/scripts/script_medium.js",
        category: "mid",
    },
    {
        url: "/scripts/script_full.js",
        category: "high",
    },
];

function checkNetworkSpeed() {
    const effectiveType = navigator.connection.effectiveType;

    let speed;
    switch (effectiveType) {
        case "slow-2g":
        case "2g":
            speed = "slow";
            break;
        case "3g":
            speed = "medium";
            break;
        case "4g":
            speed = "fast";
            break;
        default:
            speed = "medium";
    }

    return speed;
}

function getDeviceCategory(deviceSpeed, deviceMemory) {
    let deviceCategory = "mid";
    if (deviceSpeed === "slow") {
        if (deviceMemory >= 1 && deviceMemory <= 4) {
            deviceCategory = "low";
        } else if (deviceMemory > 4) {
            deviceCategory = "mid";
        }
    } else if (deviceSpeed === "medium") {
        if (deviceMemory >= 1 && deviceMemory <= 2) {
            deviceCategory = "low";
        } else if (deviceMemory >= 3 && deviceMemory <= 4) {
            deviceCategory = "mid";
        } else if (deviceMemory > 4) {
            deviceCategory = "high";
        }
    } else if (deviceSpeed === "fast") {
        if (deviceMemory >= 3) {
            deviceCategory = "high";
        } else if (deviceMemory >= 1 && deviceMemory <= 2) {
            deviceCategory = "low";
        }
    }

    return deviceCategory;
}

function LoadScripts() {
    // Get device network speed
    const deviceSpeed = checkNetworkSpeed();

    // Get estimated device memory
    const deviceMemory = navigator.deviceMemory || 1024;

    const deviceCategory = getDeviceCategory(deviceSpeed, deviceMemory);

    const selectedScript = scriptsList.filter(script => script.category === deviceCategory);

    console.log( 'deviceSpeed: ', deviceSpeed);
    console.log( 'deviceMemory: ', deviceMemory);
    console.log( 'deviceCategory: ', deviceCategory);
    console.log( 'selectedScript: ', selectedScript);

    if (selectedScript.length > 0) {
        selectedScript.forEach(script =>{
        console.log(`Loading script: ${script.url}`);
        
        const origin = window.location.origin;
        const URL= origin + script.url

        fetch(script.url)
            .then((response) => response.text())
            .then((scriptText) => {
                
                eval(scriptText); // Use with caution due to security risks
                console.log("Script loaded and executed");
            })
            .catch((error) => console.error("Error fetching script:", error));
        });
    } else {
        console.log("No suitable script found for current conditions.");
    }
}

LoadScripts();
