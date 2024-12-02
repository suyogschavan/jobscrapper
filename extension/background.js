chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "JOB_DATA") {
    const jobDataArray = message.data;
    const promises = jobDataArray.map((jobData) => {
      fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Job data saved:", data);
          return data;
        })
        .catch((err) => {
          console.error("Error saving job data:", err);
        });
    });

    // Promise.all(promises).then(savedJobs => {})
  }
});
