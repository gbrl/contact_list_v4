$(document).ready(function() {

  // FETCH AND LIST ALL CONTACTS
  var contactTable = $("#contacts");
  $.get( "/api/v1/contacts", function(data) {
    data["contacts"].forEach(addContactToTable);

    // SETUP DELETE ACTION
    $("table").on("click", "a.destroy", function(e){
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

    $("table").on("click", "a.edit", function(e){
        e.preventDefault();
        var row_data = new Array;
        $(this).closest("tr").children("td").each(function(){
          var attribute = $(this)[0].innerHTML;
          row_data.push(attribute);

        });
        var $form = $("#edit-contact-form");
        $form.removeClass("hidden");
        $("#add-contact-form").addClass("hidden");

        var first_and_last_name = row_data[0].split(" ");

        $("#edit_first_name").val(first_and_last_name[0]);
        $("#edit_last_name").val(first_and_last_name[1]);
        $("#edit_email").val(row_data[1]);
        $("#edit_phone_work").val(row_data[2]);
        $("#edit_phone_personal").val(row_data[3]);

        var contact_id = $(this).data("id");
        var edit_url = "/api/v1/contacts/" + contact_id + "/edit";
        $form.attr("action", edit_url);

    });

  }); // END OF FETCH AND LIST ALL CONTACTS

  // SETUP ADD CONTACT FORM
  $("#add-contact-form").submit(function(e) {
    e.preventDefault();
    $.post( "/api/v1/contacts", $(this).serialize())
      .done(function( data ) {
        if( data["message"] === "Success" ) {
          addContactToTable(data["contact"]);
          $("#add-success").fadeIn().fadeOut();
          $("#add-contact-form").trigger("reset");
        }
      });
  });

  // SETUP EDIT CONTACT FORM
  $("#edit-contact-form").submit(function(e) {
    e.preventDefault();
    var action = $(this).attr("action");
    $.post( action, $(this).serialize())
      .done(function( data ) {
        if( data["message"] === "Success" ) {
          $("#update-success").fadeIn().fadeOut();
          $("#edit-contact-form").fadeOut();
          $("#add-contact-form").fadeIn();
          $.get( "/api/v1/contacts", function(data) {
            contactTable.children("tr").remove();
            data["contacts"].forEach(addContactToTable);
            $("#edit-contact-form").trigger("reset");
          });
        }
      });
  });


  // HELPER METHOD FOR ADDING CONTACTS TO TABLE
  function addContactToTable(contact){
    contactTable.append("<tr><td>" + contact["first_name"] + " " + contact["last_name"] + "</td><td>" + contact["email"] + "</td><td>" + contact["phone_work"] + "</td><td>" + contact["phone_personal"] + "</td><td><a href='#' class='button alert destroy' data-id='" + contact["id"] + "'>Delete</a> &nbsp; <a href='#' class='button edit' data-id='" + contact["id"] + "'>Edit</a></td></tr>")
  }

});
