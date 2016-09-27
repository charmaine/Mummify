function getActiveTabSelectedText(cb) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, null, function (response) {
      cb(response.data);
    });
  });
}
function performCopy(){
  var copiedText = getSelectionText();
  document.getElementById("encrypt").value = copiedText;
}
function performEncrypt(){
  var encryptKey = document.getElementById("Key").value
  getActiveTabSelectedText(function(originalText) {
    if(originalText == "") {
      originalText = document.getElementById("originalText").value
    }
    console.log(originalText)
    var encrypted = encrypt(originalText, encryptKey);
    document.getElementById("processedText").value = encrypted;
    console.log(encrypted)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method: "replaceSelection", selectedText: originalText, processedText: encrypted}, null, function (response) {

      });
    });
  });
}
function performDecrypt() {
  var encryptKey = document.getElementById("Key").value
  getActiveTabSelectedText(function(originalText) {
    if(originalText == "") {
      originalText = document.getElementById("originalText").value
    }
    console.log(originalText)
    var decrypted = decrypt(originalText, encryptKey);
    document.getElementById("processedText").value = decrypted;
    console.log(decrypted)


    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method: "decryptSelection", selectedText: originalText, processedText: decrypted}, null, function (response) {

      });
    });
  });
}
// function encryptTheKey() {
//   var keyPass = 1234;
//   var coded = encryptKey(keyPass);
//   document.getElementById("processedText").value = coded;
// }


$(document).ready(function() {
  $("#performEncrypt").click(performEncrypt);
  $("#performDecrypt").click(performDecrypt);
});
