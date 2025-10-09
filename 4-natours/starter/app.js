const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello form the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res.status(404).json({
//     message: 'Hello from the server side',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(404).json({
//     message: 'You can POST on this endpoint',
//     app: 'Natours',
//   });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  const tour = tours.find((el) => el.id === id * 1);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      time: req.requestTime,
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        time: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      time: req.requestTime,
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      time: req.requestTime,
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    time: req.requestTime,
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
