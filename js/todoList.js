$(document).ready (function(){
    $(".alerts").hide();

  $(".btn-primary").on("click",function(e){ 
    e.preventDefault();

    var newWord, startDate, requireDate, newRow, wordTd, deleteButton,deleteTd;
    var checkBox,addCheck,counter,emptyElement;
    var inputsArray = document.getElementsByTagName("input");
    var elementText, priorityCheck;
    var validationCheck=0;

    newWord = $("#item").val();
    startDate = $("#startDate").val();
    requireDate = $("#requireDate").val();
    deleteButton = $("<button>").addClass("btn btn-danger").append("X");
    //priorityCheck = $("#priorityCheck").is(':checked');
    counter = $("#todoListTable tbody tr").length +1; // To create a counter in dynamic table 
    
    //console.log("priority check"+priorityCheck);

    if (startDate > requireDate) { // Show erro when required date is earlier than start date
      alert("Your require date is earlier than start date. Please enter the require date correctly");
      validationCheck = 1;
    }
    newRow = $("<tr>"); //To add a new TR row

    counter = $("<td>").append(counter);
    requireDate = $("<td>").append(requireDate);
    startDate = $("<td>").append(startDate);
    wordTd = $("<td>").addClass("word-td").append(newWord);
    addCheck = $("<td>").append($(document.createElement('input')).attr({
           id:    'myCheckbox'
          ,name:  'myCheckbox'
          ,value: 'myValue'
          ,type:  'checkbox'
       }));
   
    deleteTd = $("<td>").append(deleteButton);

      for(var i = 0; i < inputsArray.length; i++) {
          if(inputsArray[i].value === "") {
            switch(i) {
              case 0:
                elementText = "To do Item";
                validationCheck = 1;
                break;
              case 1:
                elementText = "Start Date";
                validationCheck = 1;
                break;
              case 2:
                elementText = "Required Date";
                validationCheck = 1;
                break;
            }
            inputsArray[i].setAttribute("style", "border: red 1px solid;");
            alert("You left the " + elementText + " input empty!");
            break;
          }
      }
      
      //console.log("validation"+validationCheck);
      
      if (validationCheck===0){
        newRow.append(counter).append(requireDate).append(startDate).append(wordTd).append(addCheck).append(deleteTd);
        $("tbody").append(newRow); 
        
        $("#priorityCheck").on(":checked", function() {
            $("#todoListTable").$("tr:last").css("background-color", "red");
        });

        if ($('#priorityCheck').is(':checked')) {
          //debugger;
          //console.log("The priority check is checked, let me work on the font-color");
          //console.log ("newRow is :" +newRow);
          $("newRow").css("font-color","red");
        } //Changes the font color of the item to red, if the to-do item is a priority.

        $("#newWord #startDate #requireDate").val("");
      }

  }); //End of Add function 
  
  $(document).on("click","#myCheckbox",function(){
    //debugger;
    $(this).closest("tr").css({
      textDecoration: 'line-through',
      color: '#B2ABB6'
    });
    }); 

  $(document).on("click",".btn-danger", function(){
    //debugger;
    console.log("Inside delete");
    $(this).closest("tr").remove(); //Removes the row when clicked on "X"
  });
});