const express = require('express');
const router = new express.Router();
const Simulator = require('../src/Simulator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('settings', {
    nodes: nodes,
  });
});

module.exports = router;
