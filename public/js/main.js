'use strict';

$(document).ready(init);

function init() {
  putRoomsInList();
  putItemsInList();
  $('#addRoom').click(modalAddRoom);
}

function modalAddRoom(){
  swal({
    title: "New Room!",
    text: "Enter name of room:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Rumpus Room"
  }, function(inputValue){
    if (inputValue === false) return false;
    if (inputValue === "") {
      swal.showInputError("You need to write something!");
      return false;
    }
    $.post('/rooms', {name: inputValue})
    .done(function(room){
      $('#roomList').append(roomListElement(room));
      swal("Nice!", "You added: " + inputValue, "success");
    })
    .fail(function(err){
      swal.showInputError("Room add failed.");
    })
  }); 
}

function putItemsInList() {
  $.get('/items')
  .done(function(items){
    var $items = items.map(function(item){
      return itemListElement(item);
    });
    $('#itemList').append($items);
  })
  .fail(function(err){
    console.error(err);
  });
}

function putRoomsInList() {
  $.get('/rooms')
  .done(function(rooms){
    var $rooms = rooms.map(function(room){
      return roomListElement(room);
    });
    $('#roomList').append($rooms);
  })
  .fail(function(err){
    console.error(err);
  });
}

function itemListElement(item){
  var $item = $('#sampleItem').clone();
  $item.removeAttr('id');
  $item.find('.itemName').text(item.name);
  $item.find('.itemValue').text(item.value);
  $item.find('.itemDescription').text(item.description);
  $item.find('.itemImage').attr('src', item.image);
  return $item;
}

function roomListElement(room){
  var $li = $('<li>').addClass('list-group-item room');
  $li.text(room.name);
  $li.data('id', room._id);
  return $li;
}