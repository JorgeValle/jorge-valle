'use strict';

const express = require('express'),
      router = express.Router(),
      apiCtrl = require('./api.controller');

// Get all posts
router.get('/get/posts', apiCtrl.retrieveAllPosts);
// Get all quotes
router.get('/get/quotes', apiCtrl.retrieveAllQuotes);
// Get all events
router.get('/get/events', apiCtrl.retrieveAllEvents);
// Get a specific post
router.get('/get/post/:slug', apiCtrl.retrievePostBySlug);
// Create a new post
router.post('/create/post', apiCtrl.createPost);
// Create a new quote
router.post('/create/quote', apiCtrl.createQuote);
// Create a new event
router.post('/create/event', apiCtrl.createEvent);
// Update a specific post
router.put('/update/post', apiCtrl.updatePost);
// Update a specific quote
router.put('/update/quote', apiCtrl.updateQuote);
// Update a specific event
router.put('/update/event', apiCtrl.updateEvent);

module.exports = router;