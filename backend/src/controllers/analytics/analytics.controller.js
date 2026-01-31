import { getCategoriesStats } from './analyticsSummary.controller.js'
import { getAnalyticsSummary } from './categoriesStats.controller.js'
import { setMonthGoal } from './monthGoal.controller.js'
import { getMonthlyStats } from './monthlyStats.controller.js'
import { getMonthProgress } from './monthProgress.controller.js'

export const getAnalyticsStat = getAnalyticsSummary
export const getMonthStats = getMonthlyStats
export const getCategoryStat = getCategoriesStats
export const monthGoal = setMonthGoal
export const monthProgress = getMonthProgress
