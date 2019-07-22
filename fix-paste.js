document.addEventListener("keydown", function(e) {
    
    // When pressing CTRL+V
    if (e.key == "v" && e.ctrlKey) {
        
        var tweetBox = document.getElementById("tweet-box-home-timeline");
        
        // Get caret position
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(tweetBox);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        var pos = preCaretRange.toString().length;
        
        // Create temporary input field
        var tempInput = document.createElement("textarea");
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
                var textArr = tweetBox.textContent.split("");
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
