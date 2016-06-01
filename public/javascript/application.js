$(document).ready(function() {

  // FETCH AND LIST ALL CONTACTS
  var contactTable = $("#contacts");
  $.get( "/api/v1/contacts", function(data) {
    data["contacts"].forEach(addContactToTable);

    // SETUP DELETE ACTION
    $("a.destroy").on("click", function(e){
      e.preventDefault();
      var $row = $(this).closest('tr');
      var contact_id = $(this).data("id");
      var destroy_url = "/api/v1/contacts/" + contact_id +"/destroy"
      $.post(destroy_url, function( data ) {
          if( data["message"] === "Success" ) {
            $row.remove();
          }
      });
    });

    $("a.edit").on("click", function(e){
        e.preventDefault();
        $("#edit-contact-form").removeClass("hidden");
    });

  }); // END OF FETCH AND LIST ALL CONTACTS

  // SETUP ADD CONTACT FORM
  $("#add-contact-form").submit(function(e) {
    e.preventDefault();
    $.post( "/api/v1/contacts", $(this).serialize())
      .done(function( data ) {
        if( data["message"] === "Success" ) {
          addContactToTable(data["contact"]);
        }
      });
  });

  // HELPER METHOD FOR ADDING CONTACTS TO TABLE
  function addContactToTable(contact){
    contactTable.append("<tr><td>" + contact["first_name"] + " " + contact["last_name"] + "</td><td>" + contact["email"] + "</td><td>" + contact["phone_work"] + "</td><td>" + contact["phone_personal"] + "</td><td><a href='#' class='button alert destroy' data-id='" + contact["id"] + "'>Delete</a> &nbsp; <a href='#' class='button edit' data-id='" + contact["id"] + "'>Edit</a></td></tr>")
  }

});
