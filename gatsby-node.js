const axios = require('axios');
const crypto = require('crypto');
const path = require(`path`);

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/product/)) {
    page.matchPath = `/product/*`

    // Update the page.
    createPage(page)
  }
}