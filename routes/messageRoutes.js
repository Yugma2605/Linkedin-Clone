const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all messages.
 *     tags: [Messages]
 *     responses:
 *       '200':
 *         description: Successful response with an array of messages
 *         content:
 *           application/json:
 *             example:
 *               - messageID: 123456789012345678901234
 *                 senderID: 567890123456789012345678
 *                 receiverID: 901234567890123456789012
 *                 content: "Hello, World!"
 *                 timestamp: "2023-01-01T12:34:56.789Z"
 *                 isRead: false
 *               - messageID: 345678901234567890123456
 *                 senderID: 678901234567890123456789
 *                 receiverID: 890123456789012345678901
 *                 content: "Another message"
 *                 timestamp: "2023-01-02T10:45:30.123Z"
 *                 isRead: true
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/', messageController.getMessages);

/**
 * @swagger
 * /messages/{messageID}:
 *   get:
 *     summary: Get a message by ID
 *     description: Retrieve a message based on its unique ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageID
 *         required: true
 *         description: ID of the message to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Successful response with the retrieved message
 *         content:
 *           application/json:
 *             example:
 *               messageID: 123456789012345678901234
 *               senderID: 567890123456789012345678
 *               receiverID: 901234567890123456789012
 *               content: "Hello, World!"
 *               timestamp: "2023-01-01T12:34:56.789Z"
 *               isRead: false
 *       '404':
 *         description: Message not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Message not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/:messageID', messageController.getMessagesById);

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     description: Create and save a new message with the provided data.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderID:
 *                 type: string
 *                 description: ID of the sender
 *               receiverID:
 *                 type: string
 *                 description: ID of the receiver
 *               content:
 *                 type: string
 *                 description: Content of the message
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp of the message (optional, defaults to current time)
 *               isRead:
 *                 type: boolean
 *                 description: Read status of the message (optional, defaults to false)
 *             required:
 *               - senderID
 *               - receiverID
 *               - content
 *     responses:
 *       '201':
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             example:
 *               messageID: 123456789012345678901234
 *               senderID: 567890123456789012345678
 *               receiverID: 901234567890123456789012
 *               content: "Hello, World!"
 *               timestamp: "2023-01-01T12:34:56.789Z"
 *               isRead: false
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.post('/', messageController.postMessage);

/**
 * @swagger
 * /messages/{messageID}:
 *   patch:
 *     summary: Update a message by ID
 *     description: Update and retrieve the updated message based on its unique ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageID
 *         required: true
 *         description: ID of the message to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New content for the message
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: New timestamp for the message (optional)
 *               isRead:
 *                 type: boolean
 *                 description: New read status for the message (optional)
 *     responses:
 *       '200':
 *         description: Successful response with the updated message
 *         content:
 *           application/json:
 *             example:
 *               messageID: 123456789012345678901234
 *               senderID: 567890123456789012345678
 *               receiverID: 901234567890123456789012
 *               content: "Updated content"
 *               timestamp: "2023-01-01T15:30:00.000Z"
 *               isRead: true
 *       '404':
 *         description: Message not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Message not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.patch('/:messageID',messageController.patchMessage);

/**
 * @swagger
 * /messages/{messageID}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Delete and retrieve the deleted message based on its unique ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageID
 *         required: true
 *         description: ID of the message to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Successful response with the deleted message
 *         content:
 *           application/json:
 *             example:
 *               messageID: 123456789012345678901234
 *               senderID: 567890123456789012345678
 *               receiverID: 901234567890123456789012
 *               content: "Deleted message"
 *               timestamp: "2023-01-01T15:30:00.000Z"
 *               isRead: true
 *       '404':
 *         description: Message not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Message not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.delete('/:messageID',messageController.deleteMessage);

module.exports = router;
