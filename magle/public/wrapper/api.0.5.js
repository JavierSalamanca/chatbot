/**
 *
 * MAGLE Player Wrapper
 *
 * @constructor
 */


/**
 * Básicamente permite enviar comandos al LMS, para interactuar con el LMS.
 * Por cada elemento de componente interactivo, se enviará un mensaje al LMS.
 * Como respuesta se retornará.
 *
 */

var PlayerWrapper = function () {

  this.debug = true;                // Debug flag
  this.initialized = false;         // (?)
  /* this.apiHandle = null; */            // (?)

  this.preparedMessage = {};        // Prepared message to send
  this.preparedEvent = {};          // Prepared message to send

  this.message("MAGLE Wrapper 0.5 - Initialized");
  if (window["PLAYER_WRAPPER"]) {
    alert("Player wrapper is already initalized.");
    return;
  }

  window["PLAYER_WRAPPER"] = this;
  this.output = window.console;
};

/**
 * Initialize wrapper for slide
 * @return {*}
 */
PlayerWrapper.prototype.init = function () {
  this.message("Initialize API");

  // Initialize a message
  this.preparedMessage = {};
  this.preparedMessage.components = {};

  // Initialize process to recognize elements
  this.process();
};

/**
 *
 */
PlayerWrapper.prototype.process = function () {
  this.message("Initialize recognition process");

  var self = this;

  // Iterate over interactive components
  $('*[data-component="interactive"]')
      .filter(function () {

        // Read components
        if ($(this).data('type') && $(this).attr('id')) {

          // Create component object
          var component = {};
          component.key = $(this).attr('id');
          component.type = $(this).children().data('type');
          self.message("Component recognized " + JSON.stringify(component));

          // Check if key component exists on prepared message
          if (!self.preparedMessage.components[component.key]) {
            self.preparedMessage.components[component.key] = {};
          } else {
            self.message("Component unrecognized: Key " + component.key + " no unique");
            return;
          }

          // Retrieve button list of interactive component
          var singleComponentButtonList = $('*[data-type="component-single-choice"]', $(this));
          for (var i = 0; i < singleComponentButtonList.length; i++) {

            $(singleComponentButtonList[i])   // Set event at each button item
                .off('change')
                .on('change', {index: i, length: singleComponentButtonList.length, component: component},
                    function (event) {
                      var data = event.data;                                                // Set external data
                      for (var x = 0; x < data.length; x++) {                               // Disable all items of component
                        self.setValue(component.key, x, false, self.type.OPTION);
                      }
                      self.setValue(component.key, (data.index), true, self.type.OPTION);   // Enable single option of component
                    });
          }

          // Retrieve button list of interactive component
          var multipleComponentButtonList = $('*[data-type="component-multiple-choice"]', $(this));
          for (var i = 0; i < multipleComponentButtonList.length; i++) {
            // Set event at each button item
            $(multipleComponentButtonList[i]).off('change').on('change',
                {index: i, component: component},
                function (event) {
                  var data = event.data;  // Set external data
                  // alert("[MULTI] Hola soy la opcion " + data.index + " del componente " + data.component.key);
                  self.setValue(component.key, data.index, (this.checked), self.type.OPTION);
                });
          }
        } else {
          this.message("[CORRUPT] Problem retriving interactive component identifier!");
        }
      });

};


PlayerWrapper.prototype.type = {
  OPTION: "option",
  TEXT: "text"
};

PlayerWrapper.prototype.terminate = function () {
  if (!this.initialized)
    return true;

  // Get API Handler
  var api = this.getAPIHandle();
  if (!api) {
    this.message("Unable to locate the LMS's API Implementation.\nTerminate was not successful.");
    return false;
  }

  // Terminate API Handler
  var result = api.terminate();
  if (result) {
    this.message("Initialize failed");
  } else {
    this.initialized = true;
  }

  // Return result of initializing of API Handler
  return result.toString();
};

PlayerWrapper.prototype.getValue = function () {

};

PlayerWrapper.prototype.setValue = function (component, object, data, type) {
  if (data) {
    console.log("CREATING COMPONENT!" + component + "." + object + " -> " + data)
    this.preparedMessage.components[component][object.toString()] = {type: type, value: data};
  } else {
    console.log("DELETING COMPONENT!" + component + "." + object);
    delete this.preparedMessage.components[component][object.toString()];
  }
};


PlayerWrapper.prototype.getAPI = function (win) {
  var theAPI = this.findAPI(this.window);
  if ((theAPI === null) && (window.opener != null) && (typeof(window.opener) !== undefined)) {
    theAPI = this.findAPI(window.opener);
  }

  if (theAPI === null) {
    this.message("Unable to find API adapter");
  }
};


PlayerWrapper.prototype.commit = function () {
  var self = this;
  var allowCommit = true;
  for (var key in this.preparedMessage.components) {
    console.log("> " + JSON.stringify(this.preparedMessage.components[key]));
    if (jQuery.isEmptyObject(this.preparedMessage.components[key])) {   // Check if is empty
      allowCommit = false;
      this.message("[CORRUPT] Must be set alternative!");
      this.changeColor($("#" + key), "green");
    }
  }

  if (allowCommit === true) {
    this.message("Send to LMS " + JSON.stringify(this.getRequest()));
    $.post("http://localhost:3300/api/learning/navigation",
        function (data) {
          console.log("Retrieved data from LMS" + data);
        })
        .done(function () {
          alert("second success");
        })
        .fail(function () {
          alert("Error sending message to LMS");
        })
        .always(function () {
          //alert("finished");
        });
    ;
  } else {
    this.message("Cannot commit, must be elements no prepared to send");
  }
};


PlayerWrapper.prototype.commitEvent = function () {

  this.message("Sending event");

  $.post("http://localhost:3300/api/learning/navigation",
      function (data) {
        console.log("Retrieved data from LMS" + data);
      })
      .done(function () {
        alert("second success");
      })
      .fail(function () {
        alert("Error sending message to LMS");
      })
      .always(function () {
        //alert("finished");
      });

};

PlayerWrapper.prototype.changeColor = function ($el, color) {
  var x = 500;
  $el.addClass("warning");
  setTimeout(function () {
    $el.removeClass("warning");
  }, x);
}


PlayerWrapper.prototype.getRequest = function () {

  var message = {};
  var componentList = this.preparedMessage.components;
  var aaa = [];
  for (var componentKey in componentList) {
    var partialAnswerList = [];
    for (var answerKey in componentList[componentKey]) {
      partialAnswerList.push({type: "option", value: answerKey});
    }
    aaa.push({key: componentKey, answer: partialAnswerList});
  }

  message.components = aaa;

  return message;
};

PlayerWrapper.prototype.event = {
  CONTINUE: "CONTINUE",
  PREVIOUS: "PREVIOUS"
};

PlayerWrapper.prototype.sendEvent = function (event, target) {
  this.message("Invoking event " + event);


  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3300/api/learning/request";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log("RECEIVED JSON")
      console.log(json);
    }
  };
  var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
  xhr.send(data);

  /* $.post("http://localhost:3300/api/learning/request",
      {},
      function (data) {
        console.log("Retrieved data from LMS" + data);
      })
      .done(function () {
        alert("second success");
      })
      .fail(function () {
        alert("Error sending message to LMS");
      })
      .always(function () {
        //alert("finished");
      });
  ;
 */

};


/**
 * Send debugger message
 * @param message
 */
PlayerWrapper.prototype.message = function (message) {
  if (this.debug) {
    console.log("[PlayerWrapper] " + message)
  }
};


var API = new PlayerWrapper();
