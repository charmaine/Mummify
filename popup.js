function getSelectionText(){
  var selectedText = " "
  if (window.getSelection){
      selectedText = window.getSelection().toString()
  }
  return selectedText
}
