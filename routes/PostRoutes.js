const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostsController');




/**
 * @swagger
 * /posts/:id:
 *   get:
 *     summary: Get all posts or specific post
 *     tags: [Posts]
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
router.get('/:id?', PostController.getPost);

/**
 * @swagger
 * /Posts:
 *   post:
 *     summary: Create a new Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 */
router.post('/', PostController.PostPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Update a user by ID
 *     tags: [Posts]
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
router.delete('/:id?', PostController.DeletePost);

module.exports = router;
