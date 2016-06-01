$(document).ready(function() {

  var contactTable = $("#contacts");

  $.get( "/api/v1/contacts", function(data) {
    var contacts = data["contacts"];
    contacts.forEach(addContactToTable);
  });

  function addContactToTable(contact){
    contactTable.append("<tr><td>" + contact["first_name"] + contact["last_name"] + "</td><td>" + contact["email"] + "</td><td>" + contact["phone_work"] + "</td><td>" + contact["phone_personal"] + "</td></tr>")
  }

});
