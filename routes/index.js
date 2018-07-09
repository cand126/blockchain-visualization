const express = require('express');
const router = new express.Router();
const Simulator = require('../src/Simulator');

router.get('/', (req, res, next) => {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('index', {
    nodes: nodes,
  });
});

router.get('/settings', function(req, res, next) {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('settings', {
    nodes: nodes,
  });
});

module.exports = router;
