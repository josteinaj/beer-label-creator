'use strict';

/**
 * @ngdoc function
 * @name beerLabelCreatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beerLabelCreatorApp
 */
angular.module('beerLabelCreatorApp')
  .controller('MainCtrl', function ($scope) {
    var colorRegexp = new RegExp('^#[A-Fa-f0-9]{6}$');
    var alphaRegexp = new RegExp('^[0-9]+\\.?[0-9]*$');
    var updateColorpickerColor;
    var updateColorpickerTransparency;
    $scope.form = {
        background: {
            image: 'images/example-label.png',
            color: '#FFFFFF',
            transparency: 0,
        },
        title: {
            text: '',
            color: '#000000',
            transparency: 0,
        },
        subtitle: {
            text: '',
            color: '#000000',
            transparency: 0
        },
        titleBackground: {
            text: '',
            color: '#000000',
            transparency: 0
        },
        description: {
            text: '',
            color: '#000000',
            transparency: 0
        },
        descriptionBackground: {
            text: '',
            color: '#000000',
            transparency: 0
        }
    };
    $scope.ui = {
        advancedColorSelection: false
    };
    $scope.camelCase = function(value) {
        var result, r;
        if (typeof value !== 'string') {
            return '';
        }
        result = value.split(' ');
        for (r = 0; r < result.length; r++) {
            result[r] = result[r].toLowerCase();
            if (r > 0) {
                result[r] = result[r].substring(0,1).toUpperCase() + result[r].substring(1,result[r].length);
            }
        }
        return result.join('');
    };
    $scope.initColorPicker = function(color) {
        $('#colorpicker-'+color).colorpicker().on('changeColor', function(ev) {
            if ($('#'+color+'-transparency').val()+'' !== Math.floor((1 - ev.color.toRGB().a) * 100)+'') {
                $('#'+color+'-transparency').val(Math.floor((1 - ev.color.toRGB().a) * 100));
            }
            if ($('#'+color+'-color').val().toLowerCase()+'' !== ev.color.toHex().toLowerCase()) {
                $('#'+color+'-color').val(ev.color.toHex());
            }
            
            if (color === 'background') {
                $('.beer-label').css(
                    'background-color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            } else if (color === 'title') {
                $('.beer-label-title').css(
                    'color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            } else if (color === 'subtitle') {
                $('.beer-label-subtitle').css(
                    'color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            } else if (color === 'titleBackground') {
                $('.beer-label-title, .beer-label-subtitle').css(
                    'background-color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            } else if (color === 'description') {
                $('.beer-label-text').css(
                    'color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            } else if (color === 'descriptionBackground') {
                $('.beer-label-text-wrapper').css(
                    'background-color',
                    $('#colorpicker-'+color).colorpicker('getValue')
                );
            }
        });
    };
    $scope.initToggleAdvancedColorSelection = function() {
        $('#toggle-advanced-color-selection').bootstrapToggle().change(function() {
            if ($(this).prop('checked')) {
                $('.advanced-color-selection').show();
            } else {
                $('.advanced-color-selection').hide();
            }
        });
    };
    updateColorpickerColor = function(color, newValue) {
        var colorpicker;
        if (newValue && newValue.match(colorRegexp)) {
            colorpicker = $('#colorpicker-'+color);
            if ($(colorpicker).children().length > 0) { // if initialized
                $(colorpicker).colorpicker('setValue', newValue);
            }
        }
    };
    updateColorpickerTransparency = function(color, newValue) {
        var colorpicker, oldColorpickerValue, newColorpickerValue;
        if (newValue && (newValue+'').match(alphaRegexp)) {
            colorpicker = $('#colorpicker-'+color);
            if ($(colorpicker).children().length > 0) { // if initialized
                oldColorpickerValue = $(colorpicker).colorpicker('getValue');
                newColorpickerValue = oldColorpickerValue.replace(new RegExp('[0-9.]+\\)'), ((100-newValue)/100.0)+')');
                $(colorpicker).colorpicker('setValue', newColorpickerValue);
            }
        }
    };
    
    // update colorpicker when editing hex color or transparency value inputs
    $scope.$watch('form.background.color',                   function(newValue) { updateColorpickerColor('background', newValue); });
    $scope.$watch('form.title.color',                        function(newValue) { updateColorpickerColor('title', newValue); });
    $scope.$watch('form.subtitle.color',                     function(newValue) { updateColorpickerColor('subtitle', newValue); });
    $scope.$watch('form.titleBackground.color',              function(newValue) { updateColorpickerColor('titleBackground', newValue); });
    $scope.$watch('form.description.color',                  function(newValue) { updateColorpickerColor('description', newValue); });
    $scope.$watch('form.descriptionBackground.color',        function(newValue) { updateColorpickerColor('descriptionBackground', newValue); });
    $scope.$watch('form.background.transparency',            function(newValue) { updateColorpickerTransparency('background', newValue); });
    $scope.$watch('form.title.transparency',                 function(newValue) { updateColorpickerTransparency('title', newValue); });
    $scope.$watch('form.subtitle.transparency',              function(newValue) { updateColorpickerTransparency('subtitle', newValue); });
    $scope.$watch('form.titleBackground.transparency',       function(newValue) { updateColorpickerTransparency('titleBackground', newValue); });
    $scope.$watch('form.description.transparency',           function(newValue) { updateColorpickerTransparency('description', newValue); });
    $scope.$watch('form.descriptionBackground.transparency', function(newValue) { updateColorpickerTransparency('descriptionBackground', newValue); });
  });



/*setInterval(
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
          if (text === '') {
              elements[i].style.visibility = "hidden";
              elements[i].style.padding = "0mm";
          } else {
              elements[i].style.visibility = "visible";
              elements[i].style.padding = "5mm";
          }
      }
      elements = document.querySelectorAll(".beer-label-title-wrapper");
      for (i = 0; i < elements.length; i++) {
          if (text === '') {
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
);*/


/*setTimeout(
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
                  && (data['image'] !== "example-label.png" || data['title'] !== '' || data['text'] !== '')
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
);*/