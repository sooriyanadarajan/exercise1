const express = require('express')
// const auth = require('../middleware/auth')
// const adminAuth = require('../middleware/auth-admin')
const asyncHandler = require('../middleware/async')

const CollectionController = require('../controller/collection')
const collectionController = new CollectionController();

const router = express.Router()

router.post('/collection/list', asyncHandler(collectionController.listCollection))
module.exports = router