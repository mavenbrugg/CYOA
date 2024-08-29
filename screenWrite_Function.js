//screenWrite Function
//Write something inside a specified HTML element in a spy movie way(one letter at a time)

var allowWrite = true;

//Function takes 4 parameters: id is the id of the element the user wants to output to; type is the type of thing they're outputting(h1, p, button, etc.); input is the HTML text they want to output; next is Boolean that says whether to automatically go to next function
function screenWrite(id, type, input, goNext) {
  
  //Variables:
  //Counter var so the printChar function can loop through each char in the input
  var charPos = 0;
  //Define current string var that holds the current string(starts with a <br> to put space between outputs)
  var curString = "<br>";
  //Set allowWrite var to false to stop the function from running again while it's already running
  allowWrite = false;
  
  
  //Create a new div element for the text to go in
  var divTemp = document.createElement("div");
  //Append the new div to the element the user specified
  document.getElementById(id).appendChild(divTemp);
  //Give the div a temp id
  divTemp.id = "divTemp";
  
  //Function that prints the characters one at a time
  function printChar() {
    
    //If the input is an html tag, skip until the end of the tag
    if (input.charAt(charPos) == "<") {
      //Loop until the end of the input string
      for (var i = 0; i <= (input.length - charPos); i++) {
        //Add the next char to the string
        curString += input.charAt(charPos);
        //Increase counter var so the function adds the next character next time
        charPos++;
        
        //End the loop when the closing > is found
        if (input.charAt(charPos) == ">") {
          break;
        }
      }
    }
    
    //If the character is a space, print it AND print the next one
    if (input.charAt(charPos) == " ") {
      //Add the next char to the string
      curString += input.charAt(charPos);
      //Increase counter var so the function adds the next character next time
      charPos++;
    }
    
    //Add the next char to the string
    curString += input.charAt(charPos);
    
    //Increase counter var so the function adds the next character next time
    charPos++;
    
    //Write the current string plus the type of HTML element specified to the id specified
    document.getElementById("divTemp").innerHTML = "<" + type + ">" + curString + "</" + type + ">";
    
    //Scroll screen to botton of page so new thing is always visible
    window.scrollBy(0, document.body.scrollHeight);
    
    //Scroll to botton of parent element so new thing is always visible
    document.getElementById(id).scrollBy(0, document.getElementById(id).scrollHeight);
    
    //Stop repeating once string is finished
    if(charPos == input.length) {
      clearInterval(repeatChar);
      //Reset id of temp divTemp
      divTemp.id = "";
      //Reset allowWrite var so function can run again
      allowWrite = true;
      //Run next thing
      if (goNext) {
        next();
      }
    }
  }
  
  //Repeat printChar function until told to stop(in the function)
  printChar();
  var repeatChar = setInterval(printChar, 30);
  
  
  
  
  
}


// screenWrite("div1", "h1", "Hello My Good Friend!");


// screenWrite("div1", "p", "Today is Monday!");







