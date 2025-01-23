const express = require('express');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const app = express();
const PORT = process.env.PORT || 3000;

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.get('/test-posts', async (req, res) => {
  const data = await fetchPosts();
  res.json(data);
});

app.get('/run-tests', async (req, res) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  try {
    // Test Case 1
    expect(response.status).to.equal(200);
     // Test Case 2
    response.data.forEach(post => {
      expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
      expect(post.userId).to.be.a('number');
      expect(post.id).to.be.a('number');
      expect(post.title).to.be.a('string');
      expect(post.body).to.be.a('string');
    });

    // Test case 3
    expect(response.headers['content-type']).to.include('application/json');

    res.json({ status: 'Tests Passed' });
  } catch (err) {
    res.json({ status: 'Tests Failed', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
