$(document).ready(function() {
    // Referentie naar het datalist-element
    var dataList = $('#title-list');
  
    // Luister naar keyup-event op het zoekveld
    $('#search-term').keyup(function() {
      var searchTerm = $(this).val();
  
      // Doe een API-aanroep om de autocomplete-resultaten op te halen
      $.get('/autocomplete', { searchTerm: searchTerm }, function(data) {
        console.log(data);
        // Wis de vorige resultaten
        dataList.empty();
  
        // Verwerk de ontvangen resultaten
        data.forEach(function(result) {
          // Voeg een option-element toe aan het datalist-element voor elk resultaat
          var optionElement = $('<option></option>');
  
          // Stel de waarde in op de titel van het resultaat
          optionElement.val(result.title);
  
          // Voeg het option-element toe aan het datalist-element
          dataList.append(optionElement);
        });
  
        // Console log: de ontvangen resultaten
        console.log('Ontvangen resultaten:', data);
      })
      .done(function() {
        // Console log: API-aanroep succesvol afgerond
        console.log('API-aanroep succesvol afgerond');
      })
      .fail(function() {
        // Console log: API-aanroep mislukt
        console.log('API-aanroep mislukt');
      });
    });
  });
  