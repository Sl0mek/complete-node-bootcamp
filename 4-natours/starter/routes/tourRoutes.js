const express = require('express');
const {
  getAll,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkID,
  checkBody,
  aliasToptours,
  getTourStats,
  getMonthlyPlan,
} = require('./../controllers/tourController');

const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router
//   .route('/:tourId/rewiews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview,
//   );

router.use('/:tourId/rewiews', reviewRouter);

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasToptours, getAll);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    getMonthlyPlan,
  );
router
  .route('/')
  .get(getAll)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    checkBody,
    createTour,
  );
router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
