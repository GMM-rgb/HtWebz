function searchFiles() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const files = [
        { name: "index.html", displayName: "homepage" },
        { name: "search_index.html", displayName: "search" }
        // We can add other files as the site gets bigger
    ];

    const result = files.filter(file => file.displayName.toLowerCase() === searchTerm);
    
    const iframe = document.getElementById("resultFrame");
    
    // Check if the result array is empty
    if (result.length === 0) {
        iframe.src = "Error/content_not_found.html"; // Redirect to content_not_found.html
    } else {
        iframe.src = result[0].name; // Display the found file to the user
    }
}
