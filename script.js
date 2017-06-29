/* global $ */

$(document).ready(function() {
  //Set defaults for count and win variables
  var count = 0;
  var win = false;
  var userSym, compSym, winSym;

  //Choose symbol
  $("input[name=symbol]").change(function() {
    if ($("input[name=symbol]:checked", "#symbols").val() == "x") {
      userSym = "X";
      compSym = "O";
    } else {
      userSym = "X";
      compSym = "O";
    }
    $(".symbols").hide("slow");
  });

  //Game object
  var game = {
    
    //Array of available spaces
    divs: [0, 1, 2, 3, 4, 5, 6, 7, 8],

    //First player
    firstPlayer: function() {
      $(".square").on("click", function() {
        //Get index of clicked div
        var indexDiv = $(this).index();
        //If square is empty
        if ($(this).text() === "" && win === false) {
          //Put 'x' in space
          $(this).text(userSym);
          count++;
          //Look at array
          game.divs.forEach(function(div) {
            //If div value matches index value
            if (div == indexDiv) {
              //Remove from array
              game.divs.splice(game.divs.indexOf(div), 1);
            }
          });
          game.checkWin();
          setTimeout(game.computer, 1000);
        }
      });
    },

    //Computer
    computer: function() {
      //Generate random num between 0 and length of divs array.
      var rand = Math.floor(Math.random() * game.divs.length);
      var randDiv = game.divs[rand];

      //Plug in num from divs array & make conputer's move
      if(win === false) {
        $("#container div:eq(" + game.divs[rand] + ")").text(compSym);
        count++;
      }
      //Remove num from divs array.
      game.divs.forEach(function(div) {
        if (div == randDiv) {
game.divs.splice(game.divs.indexOf(div), 1);
        }
      });
      game.checkWin();
    },

    //Display winner above board
    displayWinner: function() {
      //If move count is greater than 9 or win is true
      if (count >= 9 || win === true) {
        //If win is true
        if (win === true) {
          //Display winner
          $("#winner").html(winSym + " wins!").show('slow');;
        }
      }
    },

    //Check win
    checkWin: function() {
      //If the first row matches
      if (
        $("#container div:eq(0)").text() !== "" &&
        $("#container div:eq(0)").text() === $("#container div:eq(1)").text() &&
        $("#container div:eq(1)").text() === $("#container div:eq(2)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(0)").text();
        //If the second row matches
      } else if (
        $("#container div:eq(3)").text() !== "" &&
        $("#container div:eq(3)").text() === $("#container div:eq(4)").text() &&
        $("#container div:eq(4)").text() === $("#container div:eq(5)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(3)").text();
        //If the third row matches
      } else if (
        $("#container div:eq(6)").text() !== "" &&
        $("#container div:eq(6)").text() === $("#container div:eq(7)").text() &&
        $("#container div:eq(7)").text() === $("#container div:eq(8)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(7)").text();
        //If the first column matches
      } else if (
        $("#container div:eq(0)").text() !== "" &&
        $("#container div:eq(0)").text() === $("#container div:eq(3)").text() &&
        $("#container div:eq(3)").text() === $("#container div:eq(6)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(3)").text();
        //If the second column matches
      } else if (
        $("#container div:eq(1)").text() !== "" &&
        $("#container div:eq(1)").text() === $("#container div:eq(4)").text() &&
        $("#container div:eq(4)").text() === $("#container div:eq(7)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(1)").text();
        //If the third column matches
      } else if (
        $("#container div:eq(2)").text() !== "" &&
        $("#container div:eq(2)").text() === $("#container div:eq(5)").text() &&
        $("#container div:eq(5)").text() === $("#container div:eq(8)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(2)").text();
      } else if (
        $("#container div:eq(0)").text() !== "" &&
        $("#container div:eq(0)").text() === $("#container div:eq(4)").text() &&
        $("#container div:eq(4)").text() === $("#container div:eq(8)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(0)").text();
      } else if (
        $("#container div:eq(2)").text() !== "" &&
        $("#container div:eq(2)").text() === $("#container div:eq(4)").text() &&
        $("#container div:eq(4)").text() === $("#container div:eq(6)").text()
      ) {
        win = true;
        winSym = $("#container div:eq(2)").text();
      }
      game.displayWinner();
    },
    reset: function() {
      win = false;
      //Reset count and divs array
      count = 0;
      game.divs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      //Empty out spaces
      $("#container").children().empty();
      $("#winner").hide('slow').html("");
      //Start first player over
      $('input[type="radio"]').prop("checked", false);
      $(".symbols").show("slow");
      game.firstPlayer();
    }
  };

  //Start first player
  game.firstPlayer();

  //Reset button click function
  $("#reset").on("click", game.reset);
});
