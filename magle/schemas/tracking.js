// ------------------------------------------------
// InteractiveComponent definition
// ------------------------------------------------
// MULTIPLE_SELECTION
var icomponent = {
  "name": "Multiple selection",
  "description": "This is a very … replies to ask.",
  "component": "MULTIPLE_SELECTION",
  "params": {
    "title": {
      "val": "string",
      "maxLength": 20,
      "minLength": 1
    }
  },
  "feedback": {
    "partialSuccess": 1
  }
};

// ------------------------------------------------
// StaticComponent definition
// ------------------------------------------------
// TEXT
var scomponent_text = {
  "name": "Simple text",
  "description": "This is a simple text",
  "component": "TEXT",
  "params": {
    "text": {
      "title": "Text",
      "description": "Text to show in component",
      "type": "string",
      "minLength": 1,
      "maxLength": 140
    }
  }
};

// IMAGE
var scomponent_image = {
  "name": "Image",
  "description": "This is a image from internal resources",
  "component": "IMAGE",
  "params": {
    "src": {
      "type": "resource_path"   // Path interno de recursos.
    },
    "copyrightText": {
      "type": "resource_path"   // Path interno de recursos.
    }
  }
};


var interactionx = {
      "interactions": {
        "_count": 5,
        "1": {
          "id": 123,
          "type": "choice",
          "description": "¿Qué ciudad no pertenece a Chile?",
          "correct_responses": {
            "0": {
              "pattern": "Moscú"
            }
          },
          "learner_response": "SantiagoDeChile",
          "result": "Incorrect"
        }
      }
    }
    ;

var lo =
    {};


// ActivityTrack
var a =
    {
      "entry": "abinitio|resume",
      "location": "",
      "suspendData": "",
      "learner": ""
    };


// LOTrack
var b =
    {
      "completionStatus": "",
      "interactions": "",
      "objectives": "",
      "scaledPassingScore": 0.0,  // Desde 0.0 hasta 1.0
      "score": {
        "raw": 0.0,
        "min": 0.0,
        "max": 0.0,
        "scaled": 0.0
      },
      "exit": "",
      "sessionTime": "",
      "totalTime": ""
    };


// ------------------------------------------------
// Cluster - mode selection
// ------------------------------------------------
// CHOICE
var cluster = {
  "choiceExit": true,   // Seleccionar fuera del cluster.
  "choice": true        // Seleccionar cualquier elemento del cluster.
};

var cluster_1 =
    [
      {
        "title": "SEQUENTIAL",
        "description": "Allow select content"

      },
      {
        "title": "RANDOM",
        "description": "Play content in order of designer."

      },
      {
        "title": "CHOICE",
        "description": ""
      }
    ];


// Permite mostrar rapidamente la respuesta del usuario.

var uu = {

  "layout": "LAYOUT_20",
  "statics": {
    "1": {
      "type": "text",
      "text": "Hola a todos!!"
    },
    "2": {
      "type": "image",
      "text": ""
    }
  },
  "interactions": {
    "1": {
      "type": "choice",
      "description": "¿Qué ciudad no pertenece a Chile?",
      "correct_responses": {
        "0": {
          "pattern": "Moscú"
        }
      },
      "learner_response": "SantiagoDeChile",
      "result": "Incorrect"
    }
  }
};
