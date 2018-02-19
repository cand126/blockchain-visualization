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

module.exports = router;
