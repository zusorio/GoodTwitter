document.addEventListener("keydown", function(e) {
    if (e.key == "v" && e.ctrlKey) {
        
        var pos = getSelection().getRangeAt(0).startOffset;
        
        var tempInput = document.createElement("textarea");
        document.body.appendChild(tempInput);
        tempInput.focus();
        
        tempInput.addEventListener("input", function(e) {
           
            var tweetBox = document.getElementById("tweet-box-home-timeline");
            tweetBox.focus();
            
            tempInput.value.split("").forEach(function(char, i) {
                
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
                
                var textArr = tweetBox.innerText.split("");
                textArr.splice(pos + i, 0, char);
                tweetBox.innerText = textArr.join("");
                
            });
            
            setTimeout(function() {
                scrollTo(0, 0);
            });
            
        });
        
    }
});
