runProgram(1);

async function runProgram(id) {
  try{
    const customer = await getCustomer(1);
    const topMovies = await getTopMovies();
    sendEmail(customer.email, topMovies);
  }catch(err){
    console.log(err.message);
  }
}

function getCustomer(id) {
  return new Promise(resolve => {
    resolve({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    })
  })
}

function getTopMovies() {
  return new Promise(resolve => resolve(['Super Mario', 'Spiderman 2']));
}

function sendEmail(email, movies){
    setTimeout(() => {
      console.log(`Email Adress: ${email} set the following films ${movies}`)
    }, 4000)
}