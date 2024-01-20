export const capitalizeWords = (string) => {
	return string.replace(/\b\w/g, function (match) {
		return match.toUpperCase();
	});
};
