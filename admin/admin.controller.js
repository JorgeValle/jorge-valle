'use strict';

const request = require('request'),
      serverService = require('../services/server.service');

/**
 * Renders the form to update content
 * @since 2.0.0
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} post - The post object that we will render
 */
const renderUpdateForm = function(req, res, post) {
  res.render('update', {
    documentTitle: 'Update | Antares',
    // We parse JSON response to get properties ready for consumption in pug templates
    post: JSON.parse(post)
  });
};


/**
 * Renders the main query for all content
 * @since 2.0.0
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} posts - The posts we will render
 * @param {object} quotes - The quotes we will render
 * @param {object} events - The events we are rendering
 */
const renderQueryContent = function(req, res, posts, quotes, events) {
  res.render('query', {
    documentTitle: 'Query | Antares',
    // We parse JSON response to get properties ready for consumption in pug templates
    posts: JSON.parse(posts),
    quotes: JSON.parse(quotes),
    events: JSON.parse(events)
  });
};

/**
 * Renders the create page
 * @since 2.0.0
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.create = function(req, res) {
  res.render('create', { 
    documentTitle: 'Create | Antares'
  });
};

/**
 * Queries all content types
 * @since 2.0.0
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} posts - The blog posts we are querying
 * @param {object} events - The events we are querying
 * @param {object} quotes - The quotes we are querying
 */
module.exports.queryAll = function(req, res) {

  let path = '/api/get/posts',
      fullUrl = serverService.returnBaseUrl() + path,
      requestOptions = {
        url: fullUrl,
        method: 'get'
      };

  // Let's get the posts
  request(requestOptions, function(err, response, posts) {

    if (err) {
      console.log('Request error' + err);
    } else {

      let path = '/api/get/quotes',
          fullUrl = serverService.returnBaseUrl() + path,
          requestOptions = {
            url: fullUrl,
            method: 'get'
          };

      // Now let's get the quotes
      request(requestOptions, function(err, response, quotes) {

        if (err) {
          renderQueryContent(req, res, posts);
        } else {

          let path = '/api/get/events',
              fullUrl = serverService.returnBaseUrl() + path,
              requestOptions = {
                url: fullUrl,
                method: 'get'
              };

          request(requestOptions, function(err, response, events) {

            if (err) {
              renderQueryContent(req, res, posts, quotes)
            } else {
              renderQueryContent(req, res, posts, quotes, events);
            }

          });
        }
      });
    }
  });
};

/**
 * Queries the single blog post we want to update
 * @since 2.0.0
 * @param {object} req - The request object
 * @param {oject} res - The response object
 */
module.exports.queryOne = function(req, res) {

  let path = `/api/get/post/${req.query.post}`,
      fullUrl = serverService.returnBaseUrl() + path,
      requestOptions = {
        url: fullUrl,
        method: 'get'
      };

  request(requestOptions, function(err, response, post) {

    if (err) {
      console.error(`Request error: ${err}`);
    } else {
      renderUpdateForm(req, res, post);
    }

  });
};