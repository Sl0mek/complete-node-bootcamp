const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkID,
  checkBody,
  aliasToptours,
} = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasToptours, getAllTours);
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
