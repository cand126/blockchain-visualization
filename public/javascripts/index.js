var socket;

$(document).ready(() => {
  socket = io.connect();
});

function publishTransaction(e) {
  console.log(document.getElementById('transactionReward').value)
}