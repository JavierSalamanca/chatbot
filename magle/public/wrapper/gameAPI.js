
var GameAPI = {

    /**
     * Version de la API
     */
    _ver : 0.1,

    /**
     * ID del juego.
     */
    _gameID : undefined,

    /**
     * Direccion del server a llamar si la deteccion es manual.
     */
    _serverID : "127.0.0.1",

    /**
     * Puerto del webservice
     */
    _serverPort : 80,

    /**
     * Si esta opcion esta activada, el server se extraera de la web actual
     */
    _autoGuessServer: true,

    /**
     * Inicializa el juego. Debe llamarse al comienzo.
     * @param gameID ID interno del juego.
     */
    initialize : function(gameID) {
        console.log("Using MAGLE GameAPI v" + GameAPI._ver +" . GameID : " + gameID);
        GameAPI._gameID = gameID;

        //determinar la direccion del servidor si esta configurada como automatica
        if (GameAPI._autoGuessServer) {
            GameAPI._serverID = window.location.protocol + "//" + window.location.hostname;
        }

        GameAPI._serverID += ":" + GameAPI._serverPort;

    },

    /**
     * Obtiene el usuario el cual va a jugar. Depende de cookies de magle
     * @param callback Funcion a llamar con (err, data), donde err es un booleano diciendo si la operacion fallo, y data un objeto con username y longUserName
     */
    getUser : function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', GameAPI._serverID + '/getUser');
        xhr.withCredentials = true;
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("[GameAPI] Obtaining user name");
                var returnData = JSON.parse(xhr.responseText);
                callback(null, returnData);
            } else {
                console.warn("[GameAPI] Error while obtaining user name");
                callback(xhr.statusText, null);
            }
        };
        xhr.send();
    },

    /**
     * Envia
     * @param score
     * @param callback
     */
    sendScore : function(score, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', GameAPI._serverID + '/newScore');
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("[GameAPI] Score uploaded");
                var returnData = JSON.parse(xhr.responseText);
                callback(null, returnData);
            } else {
                console.warn("[GameAPI] Error while upload score");
                callback(xhr.statusText, null);
            }
        };
        xhr.send(JSON.stringify({
            score: score,
            gameID: GameAPI._serverID
        }));
    }
};

