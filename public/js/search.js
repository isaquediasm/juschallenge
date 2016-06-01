/*
 * Author: Isaque Dias
 * License: MIT license
 */

(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define('AutoComplete', factory);
  } else if (typeof exports === 'object') {
    exports = module.exports = factory();
  } else {
    root.AutoComplete = factory();
  }

})(this, function() {
  'use strict';

  /**
   * Our constructor
   *
   * @param {object} options -
   * @param {object} options.elements - register the html elements
   * @param {string} options.elements.results - element that will receive the results
   * @param {string} options.elements.categories - element that will receive the available categories
   * @param {object} options.api
   * @param {string} options.api.url
   * @param {string} options.api.searchEndpoint
   * @param {string} options.api.searchTypesEndpoint
   */


  var AutoComplete = function(options) {

    /**
     * Auto initialize the object
     * when new operator was forgoten
     */
    if (!(this instanceof AutoComplete)) {
      return new AutoComplete(options);
    }

    this.options = options;

    // Get the available categories
    $.ajax({
      url: options.api.url + '/types',
      type: 'GET',
      success: function(data) {

        var types   = [],
          	content = "";

        if (data) {
          $.each(data, function(key, value) {
            if ($.inArray(value.type, types) == -1) {

              types.push(value.type);
              content += '<li>' + value.type + '</li>';
            }
          });

          $(options.elements.categories).html(content);

        }
      }
    });
  };

  AutoComplete.prototype.makeSearch = function(query, type) {

    var self = this;

    // Initialize the variable that will receive the results
    var content = "";

    // Set the url
    var url = this.options.api.url + this.options.api.searchEndpoint + query;
    url = (type) ? url + this.options.api.searchTypesEndpoint + type + '' : url;

    // Make the ajax call
    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {

        if (data)

        // Loop through the results and add to content var 
          $.each(data, function(key, value) {
          var item = '<li>' + value.title + '<span class="type-label">' + value.type + '</span></li>';
          content += item;
        })
        else
          content = '<li>Nenhum resultado encontrado para <strong>' + query + '</strong> ' + ((type) ? '<span class="type-label">' + type + '</span>' : '') + '</li>'

        // Insert it into view
        $(self.options.elements.results).html(content).addClass('show');
      }
    });
  }

  return AutoComplete;

});