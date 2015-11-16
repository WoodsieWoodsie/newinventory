'use strict';

$(document).ready(init);

function init() {
  putRoomsInList();
  putItemsInList();
  $('#addRoom').click(modalAddRoom);
  $('#addItem').click(addItem)
  $('#roomList').on('click', '.room', showItemsInRoom);
}

function showItemsInRoom(e) {
  $('#itemsInRoomList').empty();
  var $target = $(e.target);
  console.log("room selected");
  var roomId = $target.data();
  roomId = roomId.id;
  console.log("room id: ", roomId);
  $.get(`/rooms/${roomId}/items`)
  .done(function(items) {
    var $items = items.map(function(item){
      return itemsInRoomListElement(item);
    });
    $('#itemsInRoomList').append($items);
  })
  .fail(function(err){
    console.error(err);
  });
}

function addItem() {
  var itemName = $('.itemName').val();
  var itemValue = $('.itemValue').val();
  var itemDescription = $('.itemDescription').val();
  var itemImg = $('.itemImg').val();
  $.post('/items', {
      name: itemName,
      value: itemValue,
      description: itemDescription,
      image: itemImg
  })
    .done(function(item){
      $('#itemList').append(itemListElement(item));
    })
    .fail(function(err){
      console.error(err, "Item add failed.");
    });
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

function itemsInRoomListElement(item){
  var $li = $('<li>').addClass('list-group-item item');
  $li.text(item.name, item.value, item.description);
  $li.data('id', item._id);
  return $li;
}