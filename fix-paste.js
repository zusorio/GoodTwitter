"use strict";

document.addEventListener("keydown", function(e) {

    // When pressing CTRL+V
    if (e.key == "v" && e.ctrlKey || e.key == "v" && e.metaKey) {
        // Get the active element
        let tweetBox = document.activeElement;
        // If it's not a tweet return
        if(!tweetBox.id.includes("tweet-box")) {
            return
        }

        // Get caret position
        const range = window.getSelection().getRangeAt(0);
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(tweetBox);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        const pos = preCaretRange.toString().length;

        // Create temporary input field
        let tempInput = document.createElement("textarea");
        tempInput.style.position = "absolute";
        tempInput.style.top = "0";
        document.body.appendChild(tempInput);
        tempInput.focus();

        tempInput.addEventListener("input", function(e) {

            tweetBox.focus();

            // For every character in the temporary input field
            tempInput.value.split("").forEach(function(char, i) {

                // Call keydown event
                tweetBox.dispatchEvent(
                    new KeyboardEvent("keydown", {
                        type: "keydown",
                        bubbles: true,
                        cancelable: true,
                        key: char,
                        char: char,
                        keyCode: char.charCodeAt(0),
                        which: char.charCodeAt(0)
                    })
                );

                // Add character
                let textArr = tweetBox.textContent.split("");
                textArr.splice(pos + i, 0, char);
                tweetBox.textContent = textArr.join("");

            });

            // Remove all temporary input fields
            document.querySelectorAll("textarea").forEach(function(textarea) {
                if (textarea.classList.length == 0) textarea.outerHTML = "";
            });

            // Scroll to the top
            setTimeout(function() {
                scrollTo(0, 0);
            });

        });

    }

});
