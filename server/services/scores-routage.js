import express from "express";
import asyncHandler from 'express-async-handler';
import scoresHandler from "./scores-handler";

const scoresRouter = express.Router();

scoresRouter.get('/', asyncHandler(scoresHandler.getScores));
scoresRouter.post('/', asyncHandler(scoresHandler.create));
scoresRouter.delete('/:id', asyncHandler(scoresHandler.scoreDelete));
scoresRouter.put('/', asyncHandler(scoresHandler.scoreUpdate));

export default scoresRouter;
