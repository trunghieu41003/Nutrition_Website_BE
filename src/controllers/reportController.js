const reportModel = require('../models/reportModel');

const CaloriesReport = async (req, res) => {
  const { userId } = req.params;
  const { days } = req.query;
  try {
      const report = await reportModel.getReport(userId, days);
      const reportDetails = await reportModel.getReportDetails(userId,days);
      return res.status(200).json({ report, reportDetails });
  } catch (error) {
      console.error("Error fetching report:", error); // Log lỗi để kiểm tra
      return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    CaloriesReport
};