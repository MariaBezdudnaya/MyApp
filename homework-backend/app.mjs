import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login } from './userHandlers.mjs';
import { getAllChats, addChat } from './chatHandlers.mjs';
import { isAuthenticated } from './auth.mjs';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.mjs';

export function getPort(port = 3001) {
    return port;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *      - Users
 *    summary: Register a new User
 *    description: Use to register a new user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: User
 *        description: The user to create
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '201':
 *        description: Registered successfully
 *      '400':
 *        description: User already exists
 */
app.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *           required:
 *             - username
 *             - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
app.post('/login', login);

/**
 * @swagger
 * /chats:
 *  get:
 *    security:
 *      - Bearer: []
 *    tags:
 *      - Chats
 *    summary: Get all chats
 *    description: Use to request all chats
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized
 *      '403':
 *        description: Forbidden
 */
app.get('/chats', isAuthenticated, getAllChats);

/**
 * @swagger
 * /chats:
 *  post:
 *    security:
 *      - Bearer: []
 *    tags:
 *      - Chats
 *    summary: Send a message
 *    description: Use to send a message in chat
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: message
 *        description: The message to send
 *        schema:
 *          type: object
 *          required:
 *            - body
 *          properties:
 *            body:
 *              type: string
 *    responses:
 *      '201':
 *        description: Message sent
 *      '401':
 *        description: Unauthorized
 *      '403':
 *        description: Forbidden
 */
app.post('/chats', isAuthenticated, addChat);

app.listen(getPort(), () => {
    console.log(`Server started at http://localhost:${getPort()}`);
});