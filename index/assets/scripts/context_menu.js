document.addEventListener('DOMContentLoaded', function() {
    var menu = document.getElementById('myMenu');
    var inspectOption = document.getElementById('inspect');
    var viewSourceOption = document.getElementById('viewSource');
    var openNewTabOption = document.getElementById('openNewTab');
    var openNewWindowOption = document.getElementById('openNewWindow');
    var currentLink = null;
    var activeElement = null;

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();

        // Get the viewport width and height
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Get the menu width and height
        var menuWidth = menu.offsetWidth;
        var menuHeight = menu.offsetHeight;

        // Set the position of the menu
        var x = e.clientX;
        var y = e.clientY;

        // Ensure the menu does not overflow the viewport
        if (x + menuWidth > viewportWidth) {
            x = viewportWidth - menuWidth;
        }

        if (y + menuHeight > viewportHeight) {
            y = viewportHeight - menuHeight;
        }

        menu.style.display = 'block';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        // Check if right-clicked element is a link
        if (e.target.tagName === 'A') {
            currentLink = e.target.href;
            openNewTabOption.style.display = 'block';
            openNewWindowOption.style.display = 'block';
        } else {
            currentLink = null;
            openNewTabOption.style.display = 'none';
            openNewWindowOption.style.display = 'none';
        }

        // Check if right-clicked element is editable
        if (e.target.isContentEditable || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
            activeElement = e.target;
        } else {
            activeElement = null;
        }

        // Check user permissions and enable/disable options accordingly
        var canInspect = checkUserPermission('inspect');
        var canViewSource = checkUserPermission('viewSource');

        if (!canInspect) {
            inspectOption.classList.add('disabled');
        } else {
            inspectOption.classList.remove('disabled');
        }

        if (!canViewSource) {
            viewSourceOption.classList.add('disabled');
        } else {
            viewSourceOption.classList.remove('disabled');
        }
    });

    document.addEventListener('click', function() {
        menu.style.display = 'none';
    });

    // Add event listeners for Copy, Paste, Reload, Inspect, View Page Source, Open Link in New Tab, and Open Link in New Window
    document.getElementById('copy').addEventListener('click', function() {
        var selectedText = window.getSelection().toString();
        if (selectedText) {
            navigator.clipboard.writeText(selectedText).then(() => {
                console.log('Copied to clipboard: ' + selectedText);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            alert('Please select some text to copy.');
        }
    });

    document.getElementById('paste').addEventListener('click', function() {
        if (activeElement) {
            navigator.clipboard.readText().then(text => {
                if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                    // Insert text at cursor position in input or textarea
                    var startPos = activeElement.selectionStart;
                    var endPos = activeElement.selectionEnd;
                    activeElement.value = activeElement.value.substring(0, startPos) + text + activeElement.value.substring(endPos);
                    activeElement.selectionStart = startPos + text.length;
                    activeElement.selectionEnd = startPos + text.length;
                } else if (activeElement.isContentEditable) {
                    // Insert text at cursor position in contenteditable element
                    var range = window.getSelection().getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(document.createTextNode(text));
                }
            }).catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        } else {
            alert('Please select an editable element to paste into.');
        }
    });

    document.getElementById('reload').addEventListener('click', function() {
        location.reload();
    });

    inspectOption.addEventListener('click', function() {
        if (!inspectOption.classList.contains('disabled')) {
            alert('To open Developer Tools, press F12 or right-click and select "Inspect".');
        }
    });

    viewSourceOption.addEventListener('click', function() {
        if (!viewSourceOption.classList.contains('disabled')) {
            window.open('view-source:' + window.location.href);
        }
    });

    openNewTabOption.addEventListener('click', function() {
        if (currentLink) {
            window.open(currentLink, '_blank');
        }
    });

    openNewWindowOption.addEventListener('click', function() {
        if (currentLink) {
            window.open(currentLink, '_blank', 'noopener,noreferrer');
        }
    });

    // Function to check user permissions (for demonstration purposes)
    function checkUserPermission(action) {
        // Simulate permission check (replace with real logic as needed)
        if (action === 'inspect' || action === 'viewSource') {
            return true; // Allow both actions
        }
        return false;
    }
});
