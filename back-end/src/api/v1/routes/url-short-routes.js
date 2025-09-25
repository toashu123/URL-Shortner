import express from 'express';
import { getBigURL, urlShort, listMyUrls, deleteMyUrl } from '../../../controllers/short-controller.js';
export const shortRoute = express.Router();

shortRoute.post('/short-url',urlShort)
shortRoute.get('/small/:code',getBigURL)

shortRoute.get('/urls', listMyUrls);
shortRoute.delete('/urls/:id', deleteMyUrl);