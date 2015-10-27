$(document).ready(function(){

  var dataRef = new Firebase('https://boiling-inferno-5502.firebaseio.com');

  $('#stringButton').click(function(){
      var data = $('#dataInput').val();
      dataRef.push(data);
  });

  $('#objectButton').click(function(){
      var data = $('#dataInput').val();
      var animal = $('#animalInput').val();
      dataRef.push({'data': data, 'animal': animal});
  });

  dataRef.on('child_added', function(snapshot){
      var message = snapshot.val();
      if(!message.data)
      {
        $('<div/>').text(message).prepend($('<em/>').text('message: '+ message)).appendTo($('#messageDiv'));
      }
      else {
        $('<div>').text('data: '+ message.data).prepend($('<br/>')).prepend($('<em/>').text('animal: ' + message.animal)).appendTo($('#messageDiv'));
      }
  });


});
