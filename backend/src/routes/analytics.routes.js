import express from 'express'
import * as analytic from '../controllers/analytics/analytics.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const route = express.Router()

route.get('/summary', protectRoute, analytic.getAnalyticsStat)
route.get('/monthly', protectRoute, analytic.getMonthStats)
route.get('/categories', protectRoute, analytic.getCategoryStat)
route.get('/goals', protectRoute, analytic.monthProgress)
route.post('/goal', protectRoute, analytic.monthGoal)

export default route
