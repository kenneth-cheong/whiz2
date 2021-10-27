const jobId = window.sessionStorage.getItem("gigId");
const gigInfo = document.getElementById("gigInfo");
const user = window.sessionStorage.getItem("userId");
const meta = window.sessionStorage.getItem("accountId");
const web3 = new Web3(window.ethereum);
const gigsAddress = "0xfb8362626ddE20BC9b8f4e323d49b52D89dD98c8";
const gigsContract = new web3.eth.Contract(gigsABI, gigsAddress);
const usdcAddress = "0x2058a9d7613eee744279e3856ef0eada5fcbaa7e";
const usdcContract = new web3.eth.Contract(usdcABI, usdcAddress);
const approveButton = document.getElementById("approve-button");
var approveStatus = false;
var budget = 0;

var Gig = {
  hirer: currentAccount,
  freelancer: "freelancermetamask",
  jobDetails: {
    jobID: "12345",
    budget: 100,
    title: "Create website",
    description: "Create a website using xxxx",
    skills: ["Coding", "Design"],
    location: "Singapore",
  },
  amountDeposited: 0,
  status: 0,
};

const gigDetails = async () => {
  //e.preventDefault();

  let url =
    "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/jobs/incoming_webhook/jobInfo";
  let elm = "";
  let idJob = jobId;
  const gigId = {
    _id: idJob,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(gigId),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jobs = await res.json();
    console.log(jobs);
    jobDetails = {
      jobID: jobs._id,
      budget: jobs.budget,
      title: jobs.title,
      description: jobs.description,
      skills: jobs.skills_required,
      location: jobs.required_location,
    };

    Gig.jobDetails = jobDetails;
    budget = jobs.budget;

    console.log(jobDetails);

    //Add to element
    elm += `
              <h3 class="section-title">${jobs.title}</h3>
              <br><br>
              <h3>Description</h3>
              <br>
              <p>${jobs.description}</p>
              <br><br>
              <h3>Deadline</h3>
              <br>
              <p>${jobs.deadline}</p>
              <br><br>
              <h3>Skills Required</h3>
              <br>
              <p>${jobs.skills_required}</p>
              <br><br>
              <h3>Location</h3>
              <br>
              <p>${jobs.required_location}</p>
              <br><br>
              <h3>Hirer</h3>
              <br>
              <p>${jobs.hirer_name}</p>
              <br>
              `;

    gigInfo.innerHTML = elm;
  } catch (error) {
    console.log(error.message);
  }
};

const approveUSDC = async () => {
  try {
    let approved = await usdcContract.methods
      .approve("0xfb8362626ddE20BC9b8f4e323d49b52D89dD98c8")
      .send({
        from: currentAccount,
      });
    console.log(approved);
    approveStatus = approved.status;
    if (approveStatus === true) {
      console.log("Success");
      approveButton.innerText = "Create Gigs Contract";
    } else {
      console.log("Failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const createGigContract = async () => {
  try {
    let confirmedGig = await gigsContract.methods
      .createGigContract(jobId, Gig, budget)
      .send({
        from: currentAccount,
      });
    console.log(confirmedGig);
    window.location.href="/dashboard-hirer";
  } catch (error) {
    alert(error);
  }
};

const processClick = async () => {
  if (approveStatus) {
  } else {
    approveUSDC();
  }
};

approveButton.addEventListener("click", processClick);

gigDetails();
