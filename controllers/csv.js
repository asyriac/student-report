const Interview = require("../models/Interview");
const { parse } = require("json2csv");
const fs = require("fs");

// Function to generate a JSON from the details
const generateJson = (interviews) => {
  const csv = [];

  for (let interview of interviews) {
    let students = interview.student_applied;
    for (let student of students) {
      csv.push({
        id: student.student_details.id,
        name: student.student_details.name,
        college: student.student_details.college,
        batch: student.student_details.batch,
        placement_status: student.student_details.placement_status,
        dsa_score: student.student_details.dsa_score,
        web_score: student.student_details.web_score,
        react_score: student.student_details.react_score,
        company_name: interview.company_name,
        interview_date: interview.date.toDateString(),
        status: student.result,
      });
    }
  }
  return csv;
};

// @desc    Get detailed report
// @route   GET /csv/view-all
module.exports.get_csv_all = async (req, res) => {
  const interviews = await Interview.find().populate("student_applied.student_details");
  const csv = generateJson(interviews);
  return res.render("csv", {
    title: "All Details",
    csv,
  });
};

// @desc    Download CSV
// @route   POST /csv/download
module.exports.get_download_csv = async (req, res) => {
  const interviews = await Interview.find().populate("student_applied.student_details");
  const json = generateJson(interviews);

  const csv = parse(json);
  console.log(csv);

  const file = "./static/reports/report.csv";
  fs.writeFile(file, csv, (err) => {
    if (err) {
      console.log("Error writing to csv file", err);
    } else {
      console.log(`File saved`);
      return res.download(file);
    }
  });
};
