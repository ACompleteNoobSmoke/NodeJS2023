const p = new Promise((resolve, reject) => {
   // resolve(.0scvd);
    reject(new Error('ERROR MESSAGE!'));
});

p.then(result => console.log(result)).catch(err => console.log('Error', err));