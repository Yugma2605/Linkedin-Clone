const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/LikesController.js');


/**
 * @swagger
 * /Likes/:PostID:
 *   get:
 *     summary: Get all details of Likes on a post 
 *     tags: [Likes]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: John Doe
 *               - id: 2
 *                 name: Jane Doe
 */

router.get('/:PostID', LikeController.getLikes);

/**
 * @swagger
 * /Likes:
 *   post:
 *     summary: Add like to a  Post
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *     responses:
 *       '201':
 *         description: liked Added successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 */
router.post('/', LikeController.PostLike);

/**
 * @swagger
 * /Likes/:LikeID:
 *   delete:
 *     summary: unlike a post 
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fieldName: "new value"
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               n: 1
 *               nModified: 1
 *               ok: 1
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.delete('/:LikeID', LikeController.DeleteLike);

module.exports = router;
