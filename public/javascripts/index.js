let socket;

$(document).ready(() => {
  socket = io.connect();

  socket.on('connect', ()=> {
    socket.on('finish', (response)=> {
      $('#savingSpinner').hide();
    });
  });
});

/**
 * @public
 */
function publishTransaction(e) {
  console.log(document.getElementById('transactionReward').value);
}

/**
 * @public
 */
function updateNode(action, nodeId, value, neighborId=null) {
  $('#savingSpinner').show();
  socket.emit('update node', {
    id: nodeId,
    action: action,
    value: value,
    neighborId: neighborId,
  });
}

/**
 * @public
 */
function updateStrategy(action, nodeId, value) {
  $('#savingSpinner').show();
  socket.emit('update strategy', {
    id: nodeId,
    action: action,
    value: value,
  });
}
