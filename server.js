const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data); // Log the response data
    validateResponse200(response);
  } catch (error) {
    console.error(error);
  }
}

async function fetchNonExistentPost() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/999999');
    validateResponse404(response);
  } catch (error) {
    console.error(error);
  }
}

function validateResponse200(response) {
  // Test Case 1
  expect(response.status).to.equal(200);
  
  // Test Case 2 & 3: Validate response fields and data types
  response.data.forEach(post => {
    console.log(post); // Log each post to inspect the fields
    expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
    expect(post.userId).to.be.a('number');
    expect(post.id).to.be.a('number');
    expect(post.title).to.be.a('string');
    expect(post.body).to.be.a('string');
  });

  // Test Case 6
  expect(response.headers['content-type']).to.include('application/json');
}

function validateResponse404(response) {
  // Validate 404 Not Found response
  expect(response.status).to.equal(404);
  expect(response.data.error).to.equal('Not Found');
}

// Run the fetchPosts and fetchNonExistentPost functions
fetchPosts();
fetchNonExistentPost();
