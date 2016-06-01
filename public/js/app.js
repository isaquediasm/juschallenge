	$(document).ready(function() {

    // Get the instance of the service
	  var Search = new AutoComplete({
	    elements: {
	      results: '.suggestions',
        categories:  '.drop'
	    },
	    api: {
	      url: 'http://localhost:8080/api',
	      searchEndpoint: '/articles?q=',
	      searchTypesEndpoint: '&entity_type'
	    }
	  });

	  // Listen to input interactions
	  $('#inputSearch').on('input', function(e) {

	    var query = $(this).val() // Get the value of input
	    selectedType = $('.single span').text() || false,
	    type = (selectedType !== 'Categoria') ? selectedType : false;

	    // Hide category dropdown
	    $('.drop').removeClass('show');
	    

	    // Make the search
	    Search.makeSearch(query, type);
	  });

	  // Cancel button
	  $('.cancel').click(function() {
	    $('#inputSearch').val('');
	    $('.suggestions').removeClass('show');
	    $('.single span').text('Categoria');
	  });

	  // When the category is selected, fire this event
	  $('body').on('click', 'ul.drop li', function() {
	    var type = $(this).text();

	    // Change the selected category
	    $('.single span').text(type);

	    // Hide the dropdown
	    $('.drop').removeClass('show');

	    // Hide results
	    $('.suggestions').removeClass('show');
	  });

	  // When the category is clicked, open the dropdown
	  $('.single').click(function() {
	    $('.drop').addClass('show');
	  });

	});