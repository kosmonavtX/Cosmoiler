let WebSocket = window.WebSocket || window.MozWebSocket

exports.connect = function (server) {

  if (!WebSocket) {
    console.log('Please use a newer browser to access collaboration features.')
  } else {
    // open connection
    let connection = new WebSocket(server)

  

/*    connection.onerror = function (error) {
      console.log('Sorry, but there\'s a problem with your connection or the server is down.')
      console.log(error)
    }*/

/*    setInterval(function () {
      if (connection.readyState !== 1) {
        console.log('Unable to communicate with the WebSocket server.');          
      }
    }, 3000)*/
    return connection
  }
}

exports.send = function (connection, message) {
    waitForSocketConnection(connection, function(){
        //console.log("message sent!!!");
        connection.send(message);
    });
  
}

exports.disconnect = function (connection) {
  connection.close()
}

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if(callback != null){
                    callback();
                }
                return;

            } else {
                //console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 500); // wait 5 milisecond for the connection...
}