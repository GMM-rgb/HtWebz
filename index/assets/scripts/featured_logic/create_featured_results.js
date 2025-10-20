const featuredDisplayContainer = document.querySelector(".inner-frame-container.featured");

const ImageSourceDirectory = `./index/assets/images/featured_image_centre/`;
const featuredDataJSON = {
    "Settings": {
        "Description": ["Customization."],
        "Image": ["Gear_Icon.svg"]
    },
    "Wiki": {
        "Description": ["Information?"],
        "Image": [""]
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
        if (jsonInput.hasOwnProperty(identifier)) {
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
            let Data = featuredDataJSON[key];

            let Title = document.createElement("h2");
            Title.setAttribute("class", "featured-object-title");
            Title.innerText = `${key}`

            let ImagePreview;
            if (Data.Image) {
                ImagePreview = document.createElement("img");
                ImagePreview.setAttribute("class", "featured-object-image");
                ImagePreview.height = "150";

                const imageName = String(Data.Image).toLowerCase().trim();
                const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg"];
                const isValidImage = validExtensions.some(ext => imageName.endsWith(ext));

                if (isValidImage) {
                    ImagePreview.setAttribute("src", `${ImageSourceDirectory}${Data.Image}`);
                } else {
                    console.warn("WARNING: Incorrect File Format →", imageName);
                    ImagePreview = null;
                }
            } else ImagePreview = null;

            let Description;
            if (featuredDataJSON[key].Description) {
                Description = document.createElement("p");
                Description.setAttribute("class", "featured-object-description");
                Description.textContent = `${featuredDataJSON[key].Description}`;
            } else Description = null;

            let FeaturedObject = document.createElement("div");
            FeaturedObject.setAttribute("class", "featured-object");

            FeaturedObject.appendChild(Title);
            if (ImagePreview) FeaturedObject.appendChild(ImagePreview);
            if (Description) FeaturedObject.appendChild(Description);

            appendFeaturedObject(FeaturedObject);
        }
    }
}

if (featuredDisplayContainer) { window.addEventListener("DOMContentLoaded", generateFeaturedContent); }
