// Utilizzare l’API: https://www.boolean.careers/api/array/basket?n=numberPlayers
// Chiedere all’utente quanti giocatori vuole generare.
// Chiedere all’API i giocatori e stampare a schermo una card per ogni
// giocatore attraverso handlebars.

$(document).ready(function(){

  //chiedo all'utente quanti giocatori vuole generare
  var num_players = parseInt(prompt('Quanti giocatori vuoi generare?', 'numero giocatori'));
  //console.log(num_players);

  //chiedo all'Api i giocatori
  $.ajax({
    url: "https://www.boolean.careers/api/array/basket",
    method: "GET",
    data: {
      'n': num_players, //<-- assegno il numero inserito dall'utente a 'n' <<?n=numberPlayers>>
    },
    success: function(data){
      //console.table(data.response);

      var array_players = data.response;
      //console.log(array_players);

      for (var i = 0; i < array_players.length; i++) {

        var player = {
        'dato1': array_players[i].playerCode,
        'dato2': array_players[i].rebounds,
        'dato3': array_players[i].fouls,
        'dato4': array_players[i].points,
        'dato5': array_players[i].twoPoints,
        'dato6': array_players[i].threePoints,
        }

        //salvo il template dentro a una variabile
        var card__template = $('#card__template').html();
        //console.log(card__template);

        //richiamo il compile
        var template__function = Handlebars.compile(card__template);
        //console.log(template__function);

        var html = template__function(player);
        console.log(html);

        $('.card__container').append(html);

      }

    }, error: function(richiesta, stato, errori) {
        alert(errori);
      }

  });

});
