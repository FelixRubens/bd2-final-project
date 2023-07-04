const express = require('express')
const router = express.Router()
const controller = require('../controllers/queryController')

router.post('/sql', controller.SQL)
router.post('/create', controller.CREATE)
router.post('/select', controller.SELECT)
router.post('/', controller.INSERT)
router.put('/', controller.UPDATE)
router.delete('/', controller.DELETE)

module.exports = router