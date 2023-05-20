module.exports = async () => {
	// Mock a timezone so it's consistent across all dev machines and CI
	process.env.TZ = "US/Eastern";
};
