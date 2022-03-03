import express from "express";
import asyncHandler from 'express-async-handler';
import messagesHandler from "./messages-handler";

const messagesRouter = express.Router();

messagesRouter.get('/', asyncHandler(messagesHandler.getMessages));
messagesRouter.post('/', asyncHandler(messagesHandler.create));
messagesRouter.delete('/:id', asyncHandler(messagesHandler.messageDelete));

export default messagesRouter;
