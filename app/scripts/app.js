'use strict';

/**
 * @ngdoc overview
 * @name beerLabelCreatorApp
 * @description
 * # beerLabelCreatorApp
 *
 * Main module of the application.
 */
angular
  .module('beerLabelCreatorApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

WebFont.load({
  google: {
    families: [
      'Fjord One',
      'Open Sans', 'Open Sans Condensed',
      'Lobster', 'Lobster Two',
      'Droid Sans', 'Droid Serif',
      'PT Sans', 'PT Sans Caption', 'PT Sans Narrow',
      'Lato'
    ]
  }
});

setInterval(
  function() {
      var text, elements, i, hue, saturation, lighting, color, titleBgTransparency;
      
      // Yeah yeah, this should've all been implemented using event listeners etc. Just doing it quick and dirty for now.
      
      text = document.getElementById("text").value;
      elements = document.querySelectorAll(".beer-label-text");
      for (i = 0; i < elements.length; i++) {
          elements[i].innerHTML = text;
      }
      elements = document.querySelectorAll(".beer-label-text-wrapper");
      for (i = 0; i < elements.length; i++) {
          if (text === "") {
              elements[i].style.visibility = "hidden";
              elements[i].style.padding = "0mm";
          } else {
              elements[i].style.visibility = "visible";
              elements[i].style.padding = "5mm";
          }
      }
      elements = document.querySelectorAll(".beer-label-title-wrapper");
      for (i = 0; i < elements.length; i++) {
          if (text === "") {
              elements[i].style.width = "100%";
          } else {
              elements[i].style.width = "70%";
          }
      }
      
      hue = document.getElementById("hue").value;
      saturation = document.getElementById("saturation").value;
      lighting = document.getElementById("lighting").value;
      color = "hsl("+hue+", "+saturation+"%, "+lighting+"%)";
      titleBgTransparency = "rgba(255, 255, 255, "+document.getElementById("titlebgalpha").value+")";
      
      text = document.getElementById("title").value;
      elements = document.querySelectorAll(".beer-label-title");
      for (i = 0; i < elements.length; i++) {
          elements[i].innerHTML = text;
          elements[i].style.color = color;
          elements[i].style.backgroundColor = titleBgTransparency;
      }
      
      text = document.getElementById("subtitle").value;
      elements = document.querySelectorAll(".beer-label-subtitle");
      for (i = 0; i < elements.length; i++) {
          elements[i].innerHTML = text;
          elements[i].style.color = color;
          elements[i].style.backgroundColor = titleBgTransparency;
      }
      
      text = document.getElementById("image").value;
      elements = document.querySelectorAll(".beer-label-image");
      for (i = 0; i < elements.length; i++) {
          elements[i].src = text;
      }
      
      text = document.getElementById("font").value;
      elements = document.querySelectorAll(".beer-label-title, .beer-label-subtitle");
      for (i = 0; i < elements.length; i++) {
          elements[i].style.fontFamily = text;
      }
  },
  250
);


setTimeout(
  function(){
      document.getElementsByClassName('beer-label-image')[0].setAttribute("data-image-resolves", true);
      document.getElementsByClassName('beer-label-image')[0].onerror = function() {
          document.getElementsByClassName('beer-label-image')[0].setAttribute("data-image-resolves", false);
      };
      document.getElementsByClassName('beer-label-image')[0].onload = function() {
          document.getElementsByClassName('beer-label-image')[0].setAttribute("data-image-resolves", true);
      };
      
      Parse.initialize("F3m7tsueH3ERAeQddv2PC9CzDH38CVOfyhHSum2E", "W5wMV0gQPOv32RVY9n9ne767jx46jykpsNjRR5Hf");
      var Label = Parse.Object.extend("Label");
      var label = new Label();
      
      setInterval(
          function() {
              var formElements, fe, data;
              data = {};
              formElements = document.forms['label-form'].elements;
              for (fe = 0; fe < formElements.length; fe++) {
                  data[formElements[fe].name] = formElements[fe].value;
              }
              console.log(data);
              if (   document.getElementsByClassName('beer-label-image')[0].getAttribute("data-image-resolves") === "true"
                  && (data['image'] !== "example-label.png" || data['title'] !== "" || data['text'] !== "")
                  ) {
                  label.save(data).then(function(object) {
                      console.log("saved data.");
                  });
              } else {
                  console.log("not enough data to store; not storing");
              }
          },
          3000
      );
  },
  0
);