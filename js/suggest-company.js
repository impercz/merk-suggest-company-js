
$.fn.merkSuggestify = function(suggest_by, proxy_url, api_to_inputs, options) {
  if (options == undefined) { options = {}; };  
  if (options.requestDelay == undefined) { options.requestDelay = 300; };  

  var companies_result = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace(suggest_by),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        rateLimitWait: options.requestDelay,
        url: proxy_url,
        prepare: function(query, settings){
          data = {};
          data[suggest_by] = query;
          settings["data"] = data;
          return settings;
        }

    }
  });

  this.typeahead(null, {
    name: 'companies_result',
    display: function(obj){
      switch(suggest_by) {
        case "email": {
          return $("input[name='"+api_to_inputs["first_email"]+"']").val();
          break;
        }
        default:
          return obj[suggest_by]
      }
    },
    source: companies_result,

    remote: {
        filter: function(parsedResponse) {
            var dataset = [];
            dataset = parsedResponse.data;
            return dataset;
        }
    },

    templates: {
      suggestion: function(obj){ console.log(obj);
        if (obj.address !== undefined) {    
          return "<div>" + obj.name + " - " + obj.regno + ", <br>" + obj.address.street + " " + obj.address.number + ", " + obj.address.municipality + "</div>"
        } else {
          return "<div>" + obj.name + " - " + obj.regno + "</div>"
        }
      }
    }
  });
  this.bind('typeahead:open', function(event, object) {
    console.log('OPened', event, object, this)
  });
  this.bind('typeahead:select', function(event, object) {
    $("input[name='"+api_to_inputs["name"]+"']").val(object.name);
    $("input[name='"+api_to_inputs["regno"]+"']").val(object.regno);
    $("input[name='"+api_to_inputs["vatno"]+"']").val(object.vatno);
    $("input[name='"+api_to_inputs["first_email"]+"']").val(function(){
      if($(this).val().replace(/\s/g, '') == '')
        return object.emails[0];
      else
        return $(this).val();
    });;
    $("input[name='"+api_to_inputs["first_phone"]+"']").val(object.phones[0]);

    if (object.address !== undefined) {    
      $("input[name='"+api_to_inputs["address"]["municipality"]+"']").val(object.address.municipality);
      $("input[name='"+api_to_inputs["address"]["street"]+"']").val(object.address.street);
      $("input[name='"+api_to_inputs["address"]["number"]+"']").val(object.address.number);
      $("input[name='"+api_to_inputs["address"]["postal_code"]+"']").val(object.address.postal_code);
      $("input[name='"+api_to_inputs["address"]["country_code"]+"']").val(object.address.country_code);
    }
  });
};