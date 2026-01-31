import { getCategoriesStats } from './analyticsSummary.controller.js'
import { getAnalyticsSummary } from './categoriesStats.controller.js'
import { getMonthlyStats } from './monthlyStats.controller.js'

export const getAnalyticsStat = getAnalyticsSummary
export const getMonthStats = getMonthlyStats
export const getCategoryStat = getCategoriesStats
