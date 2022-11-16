const async = require("async");
const validator = require("express-validator");
const Edition = require("../models/edition");

// show all editions list
exports.edition_list = (request, response, next) => {
  Edition.find()
    .sort([["name", "ascending"]])
    .exec((error, list_editions) => {
      if (error) return next(error);
      response.render("edition_list", {
        title: "Editon list",
        list_editions,
      });
    });
};

exports.edition_detail = (request, response, next) => {
  async.parallel(
    {
      edition: function (callback) {
        Edition.findById(request.params.id).exec(callback);
      },
      edition_books: function (callback) {
        Book.find({ edition: request.params.id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) return next(error);
      response.render("edition_detail", {
        title: "Edition detail",
        edition: results.edition,
        edition_books: results.edition_books,
      });
    }
  );
};

exports.edition_create_get = function (request, response) {
  response.render("edition_form", { title: "Create Edition" });
};

exports.edition_create_post = [
  validator.body("name", "Edition name required").trim().isLength({ min: 1 }),
  validator.sanitizeBody("name").escape(),
  (request, response, next) => {
    // Extract the validation errors from a request.
    const errors = validator.validationResult(request);

    // Create a edition object with escaped and trimmed data.
    const edition = new Edition({ name: request.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      response.render("edition_form", {
        title: "Create Edition",
        edition,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Edition with same name already exists.
      Edition.findOne({ name: request.body.name }).exec(
        (error, found_edition) => {
          if (error) return next(error);

          if (found_edition) {
            response.redirect(found_edition.url);
          } else {
            edition.save(function (error) {
              if (error) return next(error);
              // Edition saved. Redirect to edition detail page.
              response.redirect(edition.url);
            });
          }
        }
      );
    }
  },
];

// Display Edition delete form on GET.
exports.edition_delete_get = function(req, res) {
    res.send("NOT IMPLEMENTED: Edition delete GET");
};

// Handle Edition delete on POST.
exports.edition_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Edition delete POST");
};

// Display Edition update form on GET.
exports.edition_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Edition update GET");
};

// Handle Edition update on POST.
exports.edition_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Edition update POST");
};
