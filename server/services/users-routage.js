import express from 'express';
import asyncHandler from 'express-async-handler';
import usersHandler from './users-handler';

const usersRouter = express.Router();

usersRouter.get('/', asyncHandler(usersHandler.getUsers));

usersRouter.post('/', asyncHandler(usersHandler.create));

usersRouter.delete('/:id', asyncHandler(usersHandler.userDelete));

export default usersRouter;
