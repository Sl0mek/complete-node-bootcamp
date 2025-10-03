const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Bread: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);

//       console.log(res.body.message);

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         console.log('Random dog image seved to file');
//       });
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Bread: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image seved to file');
//       });
//     })
//     .catch((err) => {
//       return console.log(err.message);
//     });
// });

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) reject('Error during saving data to file');
      resolve(`Saved`);
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Bread: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(`Res: ${res.body.message}`);
//     return writeFilePro('dog-image.txt', res.body.message);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     return console.log(`Err: ${err.message}`);
//   });

const getDagPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Bread: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(`Res: ${res.body.message}`);
    await writeFilePro('dog-image.txt', res.body.message);
    console.log('File data saved');
  } catch (err) {
    return console.log(`Err: ${err.message}`);
    throw err;
  }
  return 'READY 😎';
};

// getDagPic()
//   .then((data) => {
//     console.log(data);
//     console.log('Finished');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

(async () => {
  try {
    const data = await getDagPic();
    console.log(data);
    console.log('Finished');
  } catch (err) {
    console.log(err);
  }
})();
