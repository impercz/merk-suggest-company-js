$(function(){
  var $form;

  var proxy_url = './server/index.php';

  // FOR MAPPING BETWEEN NAMES IN API AND YOUR FORM
  var api_to_inputs = {
      // API ATTRIBUTE: INPUT NAME
      "name": "companyName",
      "regno": "regNumber",
      "vatno": "vatNumber",
      "address": {
        "municipality": "municipality",
        "street": "street",
        "number": "number",
        "postal_code": "postal_code",
        "country_code": "country_code",
      },
      "emails": {
        0: {"email": "email"}
      },
      "phones": {
        0: {"number": "phone"}
      }
    };


  $('[name="companyName"]', $form = $('#suggestCompanyForm')).merkSuggestify({
    suggestBy: 'name',
    onlyActive: true,
    proxyUrl: proxy_url,
    mapping: api_to_inputs,
    requestDelay: 10 // suggestion refresh rate in miliseconds; default: 300
  });

  $('[name="email"]', $form).merkSuggestify({
    suggestBy: 'email',
    proxyUrl: proxy_url,
    mapping: api_to_inputs
  });

  $('[name="regNumber"]', $form).merkSuggestify({
    suggestBy: 'regno',
    proxyUrl: proxy_url,
    mapping: api_to_inputs,
    template: function(obj){ // custom template for suggested items
      return obj.name;
    }
  });

});
