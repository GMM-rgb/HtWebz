const featuredDisplayContainer = document.querySelector(".inner-frame-container.featured");

const featuredDataJSON = {
    "hello": {
        "Description": ["hello world!"]
    },
    "Ah": {
        "Description": ["a"]
    }
};

/**
 * 
 * @param {JSON} jsonInput 
 * @returns {string}
 */
function grabJSON_Data(jsonInput) {
    let output = "";
    if (!jsonInput) return "Nothing was outputted. (no input)";
    for (let identifier in jsonInput) {
        if (jsonInput.hasOwnProperty(identifier)) { // Important to check for own properties
            output += "\n" + `${identifier}: ${jsonInput[identifier]}`;
        }
    }
    return output;
}

function generateFeaturedContent() {
    if (!featuredDataJSON) return console.error("ERROR: Missing featured data JSON package for generation.");
    console.log(grabJSON_Data(featuredDataJSON));

    /**
     * 
     * @param {Element|Object} element 
     */
    function appendFeaturedObject(element) {
        if (!element) return;

        if (featuredDisplayContainer && element) {
            featuredDisplayContainer.appendChild(element);
        }
    }

    for (const key in featuredDataJSON) {
        if (featuredDataJSON.hasOwnProperty(key)) {
            let Title = document.createElement("h2");
            Title.setAttribute("class", "featured-object-title");
            Title.innerText = `${key}`

            let Description = document.createElement("p");
            Description.setAttribute("class", "featured-object-description");
            Description.textContent = `${featuredDataJSON[key].Description}`;

            let FeaturedObject = document.createElement("div");
            FeaturedObject.setAttribute("class", "featured-object");
            
            FeaturedObject.appendChild(Title);
            FeaturedObject.appendChild(Description);

            appendFeaturedObject(FeaturedObject);
        }
    }
}

if (featuredDisplayContainer) { window.addEventListener("DOMContentLoaded", generateFeaturedContent); }
