const express = require('express');
const router = new express.Router();
const Simulator = require('../src/Simulator');

/* GET home page. */
router.get('/', (req, res, next) => {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('index', {
    nodes: nodes,
  });
});

/* GET settings page. */
router.get('/settings', function(req, res, next) {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('settings', {
    nodes: nodes,
  });
});

module.exports = router;
