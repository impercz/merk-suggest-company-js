# merk-suggest-company-js

Simple JS library with connection to [Merk API](https://api.merk.cz/docs/) providing autocomplete for Czech and Slovak company data.

Merk is a Czech and Slovak company database developed and maintained by Imper CZ, s.r.o. and you can find more information about the API [here]( https://www.merk.cz/api-strojovy-pristup/)(Czech).

Full Merk API documentation is [here](https://api.merk.cz/docs/)
Suggestion is implemented with Twitter [Typeahead.js](https://github.com/twitter/typeahead.js).

##Example
You can find working example at [demo-api.merk.cz](https://demo-api.merk.cz/).


##Setup
If you are going to use with your form follow these steps: 

###1. Obtain token to Merk
This JS Library **requires you to be a registered user of Merk**.
If you are not current Merk user proceed with free registration to Merk [here](https://www.merk.cz/accounts/register/?utm_source=api_doc&utm_medium=referral&utm_campaign=api). 

After registration, log in your account and go to tab Connection (“Napojení”). 
There you’ll find your **api_key**. There you can also reset your API access if needed. 


###3. Add JS in your html
Download suggest-company.js and add it into your html site with: 
	
	<script src="./js/suggest-company.js" type="text/javascript" charset="utf-8"></script>


###4. Map fields
Map fileds you want to fill from suuggestion in your form with 


    var api_to_inputs = {

###5. Setup server side
This is required to **hide your token from a public access**. 

You can use PHP server file we do provide. 
Just upload folder /server to your *Document root*

And set your token.
**In /server/index.php set your token within $token = "Your token goes here";**.

Otherwise you'll need to write your own server file.

###6. Call suggestion method

Call the method for fields you want to use for suggestion. 
You can use:

 - Email - exact match 
 - Name - suggesting from 3 characters
 - Registration number - exact match. 

Call example: 

    $(function(){
      $('#suggestCompanyForm .suggestName').merkSuggestify("name", "/server/index.php", api_to_inputs);
      
You can also use our example form from *client-server.html* and basic CSS styles.

##Limitations
Each Merk account is provided with **150 free API calls per month**.
If you need more feel free to contact us at [podpora@merk.cz](mailto:podpora@merk.cz).

##Browser Support

 - Chrome
 - Firefox 3.5+
 - Safari 4+
 - Internet Explorer 8+
 - Opera 11+

Suggestion is not tested on mobile devices.

##License

Copyright 2015 [Imper CZ, s.r.o.](https://imper.cz)

Licensed under the MIT License