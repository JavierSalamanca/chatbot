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

var PlayerWrapper = function (document, activityId) {


  console.log(document);
  console.log(activityId);
  if (!document || !activityId) {
    console.log('%cMAGLE Wrapper 0.7 - Initialized', 'background: #222; color: #bada55');
    console.log("%cResume or init activity", 'background: #222; color: #bada55');
  } else {
    console.log("%cDetect document to activity %s.", 'background: #222; color: #bada55', activityId);
    this.activityId = activityId;
    this.document = document;
  }


  this.debug = true;                // Debug flag
  this.initialized = false;         // (?)
  this.preparedMessage = {};        // Prepared message to send
  this.preparedEvent = {};          // Prepared message to send

  this.requestURL = "api/learning/request";

  //this.message("MAGLE Wrapper 0.7 - Initialized");



  window["API"] = this;
  this.output = window.console;
};

PlayerWrapper.prototype.checkIframe = function () {
  if (window.self !== window.top) {
    console.log("IFRAME WINDOW");
  } else {
    console.log("NORMAL WINDOW")
  }
};

/**
 * Initialize wrapper for current slide
 * @return {*}
 */
PlayerWrapper.prototype.init = function () {
  this.message("Initialize API");


  // Initialize a message


  // Initialize process to recognize elements
  //this.process();
};

/**
 * Recognize interactive components and process based on type
 */
PlayerWrapper.prototype.process = function () {
  this.message("Initialize recognition process");

  var self = this;

  this.preparedMessage = {};
  this.preparedMessage.components = {};

  console.log("PREVIOUS TO PROCESS");
  console.log(this.preparedMessage);

  if (self.document) {
    var interactives = self.document.contents().find('*[data-component="interactive"]');
    console.log("Detected %s", interactives.length);
    // Iterate over interactive components
    interactives.filter(function (index) {

      // Read components
      if ($(this).data('type')) {
        console.log("\t Type: " + $(this).data('type'));
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
  }
};

/**
 * Retrieve slide to show
 *
 * If is cluster show, then show cluster list.
 * If is activity show, then show slide.
 *
 */
PlayerWrapper.prototype.getActivity = function (callback) {

  // Prepare request to get navigation
  var data = {
    "event": "CHOICE",
    "id": this.activityId

  };


  this.sendEvent(this.requestURL, data, function (dataRetrieved) {
    console.log("ACTION")
    callback(dataRetrieved);
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

/**
 * Save value of component
 * @param component
 * @param object
 * @param data
 * @param type
 */
PlayerWrapper.prototype.setValue = function (component, object, data, type) {
  if (data) {
    console.log("CREATING COMPONENT!" + component + "." + object + " -> " + data)
    this.preparedMessage.components[component][object.toString()] = {type: type, value: data};
  } else {
    console.log("DELETING COMPONENT!" + component + "." + object);
    delete this.preparedMessage.components[component][object.toString()];
  }
};

// xxxx
PlayerWrapper.prototype.getAPI = function (win) {
  var theAPI = this.findAPI(this.window);
  if ((theAPI === null) && (window.opener != null) && (typeof(window.opener) !== undefined)) {
    theAPI = this.findAPI(window.opener);
  }

  if (theAPI === null) {
    this.message("Unable to find API adapter");
  }
};


PlayerWrapper.prototype.xxxsubmit = function () {
  var self = this;
  var allowCommit = true;

  // Iterate over components, and force to respond
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
    $.post("api/learning/navigation",
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


PlayerWrapper.prototype.previous = function () {
  this.message("Sending previous event");

};

/**
 * Send start request to start a specified node
 * @param targetId    Target identifier of node
 */
PlayerWrapper.prototype.sendStart = function (targetId, callback) {

  // Prepared data to send to LMS
  var preparedData = {};
  preparedData.event = "START";
  preparedData.targetId = targetId;

  this.sendEvent(this.requestURL, preparedData, function (response) {
    if (response.status === 'success') {
      callback(response.data);
    }

  });

};

PlayerWrapper.prototype.sendContinue = function (callback) {

  // Prepared data to send to LMS
  var preparedData = {};
  preparedData.event = "CONTINUE";

  this.sendEvent(this.requestURL, preparedData, function (response) {

    callback(response);

  });

};

PlayerWrapper.prototype.sendPrevious = function (callback) {

  // Prepared data to send to LMS
  var preparedData = {};
  preparedData.event = "PREVIOUS";

  this.sendEvent(this.requestURL, preparedData, function (response) {
    if (response.status === 'success') {
      callback(response.data);
    } else {
      callback(null);
    }

  });

};

PlayerWrapper.prototype.sendChoice = function (targetId, callback) {

  // Prepared data to send to LMS
  var preparedData = {};
  preparedData.event = "CHOICE";
  preparedData.targetId = targetId;

  this.sendEvent(this.requestURL, preparedData, function (response) {
    if (response.status === 'success') {
      callback(response.data);
    } else {
      callback(null);
    }

  });

};

PlayerWrapper.prototype.sendSubmit = function (callback) {

  // Prepared data to send to LMS
  var preparedData = {};
  preparedData.event = "SUBMIT";
  preparedData.activity = {};
  preparedData.activity.id = this.activityId;
  preparedData.activity.response = this.getRequest();


  this.sendEvent(this.requestURL, preparedData, function (response) {

    callback(response);

  });

};

PlayerWrapper.prototype.sendEvent = function (url, jsonData, callback) {
  this.message(JSON.stringify(jsonData));
  $.post(url, jsonData,
      function (data) {
        // Send callback
        console.debug("Response of LMS");
        console.debug(data);
        callback(data);
      }, "json");
};

PlayerWrapper.prototype.changeColor = function ($el, color) {
  var x = 500;
  $el.addClass("warning");
  setTimeout(function () {
    $el.removeClass("warning");
  }, x);
};

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

/**
 * Send debug message
 * @param message
 */
PlayerWrapper.prototype.message = function (message) {
  if (this.debug) {
    console.debug("[PlayerWrapper] " + message)
  }
};

//var API = new PlayerWrapper();
