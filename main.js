(function($) {
  function format(d) {
    // `d` is the original data object for the row
    return (
      '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
      "<tr>" +
      "<td><pre><code>" +
      d.msg +
      "</code></pre></td>" +
      "</tr>" +
      "</table>"
    );
  }

  $(document).ready(function() {
    // Declare some variables.
    var $logTable = $("table.log");
    var table = {};
    // Launch modal
    $(".modal").modal("show");

    $.ajax({
      method: "GET",
      url: "./watchdog.json",
      dataType: "json"
    })
      .done(function(data) {
        done(data);
      })
      .fail(function(e) {
        console.log("AWWW!", e);
      });

    var done = function(data) {
      table = $logTable
        .on("processing.dt", function(e, settings, processing) {
          if (!processing) {
            $(".modal").modal("hide");
          }
        })
        .DataTable({
          data: data,
          columns: [
            {
              className: "details-control",
              orderable: false,
              data: null,
              defaultContent: "<i class='far fa-plus-square'></i>"
            },
            {
              title: "Datetime / Server",
              data: "datetime_host",
              visible: false,
              searchable: false
            },
            {
              title: "Timestamp",
              data: "timestamp",
              render: function(data, type, row) {
                var ts = new Date(data * 1000);
                return ts.toLocaleString();
              }
            },
            { title: "Module", data: "module" },
            { title: "Request IP", data: "reip" },
            { title: "Page", data: "page" },
            {
              title: "(blank)",
              data: "blank",
              visible: false,
              searchable: false
            },
            { title: "User ID", data: "uid" },
            {
              title: "Relevant Link",
              data: "relink",
              visible: false,
              searchable: false
            },
            {
              title: "Error message",
              data: "msg"
            }
          ]
        });

      // Add event listener for opening and closing details
      $("tbody", $logTable).on("click", "td.details-control", function() {
        var tr = $(this).closest("tr");
        var row = table.row(tr);

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass("shown");
        } else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass("shown");
        }
      });
    };
    $.get("./watchdog.json", function(data) {}).done(function() {});
  });
})(jQuery);
