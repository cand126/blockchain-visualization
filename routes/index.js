var express = require('express');
var router = express.Router();
var Simulator = require('../src/Simulator');

/* GET home page. */
router.get('/', (req, res, next) => {
  let nodes = Simulator.getInstance().getNodesInfo();
  res.render('index', {
    nodes: nodes
  });
});

module.exports = router;