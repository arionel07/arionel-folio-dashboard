export const truncateText = (text, max = 30) => {
	if (!text) return ''

	return text.length > max ? text.slice(0, max) + '...' : text
}
