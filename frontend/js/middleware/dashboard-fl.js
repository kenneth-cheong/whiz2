const gigsInProgress = document.getElementById("gigs-in-progress");
const gigsAppliedFor = document.getElementById("gigs-applied-for");
const gigsRecommendedTo = document.getElementById("gigs-recommended")
const gigsCompletedCard = document.getElementById("gigs-completed");
const receivedReviews = document.getElementById("reviews-received");
const user = window.sessionStorage.getItem("userId");
const meta = window.sessionStorage.getItem("accountId");
const web3 = new Web3(window.ethereum);
const conAddress = "0xfb8362626ddE20BC9b8f4e323d49b52D89dD98c8";
const contract = new web3.eth.Contract(abi, conAddress);
var reviewsData = [
  {
    reviewID: 0,
    reviewer: "0x4b7d0309042Be687F432B6fB73BCbcd405CD25e5",
    reviewee: "0x4b7d0309042Be687F432B6fB73BCbcd405CD25e5",
    ratings: {
      overall: 4,
      communication: 3,
      quality: 2,
      timeliness: 1,
      grading: 2,
    },
    comments: "He was very professional!",
    job: {
      jobID: "1234",
      budget: 2300,
      title: "Code a html website",
      description: "Design html code for frontend of my webshop.",
      skills: ["html", "web design", "frontend"],
      location: "Singapore",
    },
  },
];

function loadScript(url) {
  // Adding the script tag to the head as suggested before
  var body = document.body;
  var script = document.createElement("script");
  script.defer = true;
  script.type = "text/javascript";
  script.src = url;

  // Fire the loading
  body.appendChild(script);
}

const gigInProgressDetails = async (e) => {
  console.log(e);
  
  window.location.href=`gig-info.html?gigId=${e}`;
};

const gigsProgress = async () => {
  console.log("gigs in progress ran")
  let url =
    "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/jobs/incoming_webhook/jobsinProgress";
  let elm = "";
  const freelancer = {
    applicant: user,
  };

  if(user){

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(freelancer),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if(data.gigs.length > 0){

    console.log(data);
    data.gigs.forEach((gigs) => {
      var date = moment(gigs.deadline).format("DD MMM YYYY");
      var created = moment(gigs.created).format("DD MMM YYYY");
      console.log(gigs);
      var profilePic = "img/avatar/default_profile.jpg";
      var file = profilePic.toString();
      console.log(file);
      console.log(typeof file);
      console.log(gigs._id);
      console.log(typeof gigs._id);

      if(gigs.gig_status == "DELIVERED"){

         //Add to element
      elm += `<!-- USER PREVIEW -->
      <div class="user-preview">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/57.jpg" alt="cover-01">
      </figure>
      <!-- /USER PREVIEW COVER -->

      <!-- USER PREVIEW INFO -->
      <div class="user-preview-info">
        <!-- USER SHORT DESCRIPTION -->

        <div class="user-short-description">
          <!-- USER SHORT DESCRIPTION AVATAR -->
          <a class="user-short-description-avatar user-avatar medium" href="#">
            <!-- USER AVATAR BORDER -->
            <div class="user-avatar-border">
              <!-- HEXAGON -->
              <div class="hexagon-120-132"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR BORDER -->

            <!-- USER AVATAR CONTENT -->
            <div class="user-avatar-content">
              <!-- HEXAGON -->
              <div class="hexagon-image-82-90" data-src="${file}"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR CONTENT -->

            <!-- USER AVATAR PROGRESS -->
            <div class="user-avatar-progress">
              <!-- HEXAGON -->
              <div class="hexagon-progress-100-110"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR PROGRESS -->

            <!-- USER AVATAR PROGRESS BORDER -->
            <div class="user-avatar-progress-border">
              <!-- HEXAGON -->
              <div class="hexagon-border-100-110"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR PROGRESS BORDER -->

            <!-- USER AVATAR BADGE -->
            <div class="user-avatar-badge">
              <!-- USER AVATAR BADGE BORDER -->
              <div class="user-avatar-badge-border">
                <!-- HEXAGON -->
                <div class="hexagon-32-36"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BADGE BORDER -->

              <!-- USER AVATAR BADGE CONTENT -->
              <div class="user-avatar-badge-content">
                <!-- HEXAGON -->
                <div class="hexagon-dark-26-28"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BADGE CONTENT -->

              <!-- USER AVATAR BADGE TEXT -->
              <p class="user-avatar-badge-text">✓</p>
              <!-- /USER AVATAR BADGE TEXT -->
            </div>
            <!-- /USER AVATAR BADGE -->
          </a>
          <!-- /USER SHORT DESCRIPTION AVATAR -->

          <!-- USER SHORT DESCRIPTION TITLE -->
          <p class="user-short-description-title"><a href="#">${gigs.hirer_name}</a></p>
          <!-- /USER SHORT DESCRIPTION TITLE -->

          <!-- USER SHORT DESCRIPTION TEXT -->
          <p class="user-short-description-text"><a href="#">${gigs.title}</a></p>
          <!-- /USER SHORT DESCRIPTION TEXT -->
        </div>
        <!-- /USER SHORT DESCRIPTION -->

        <!-- USER PREVIEW STATS SLIDES -->
        <div id="user-preview-stats-slides-01" class="user-preview-stats-slides">
          <!-- USER PREVIEW STATS SLIDE -->
          <div class="user-preview-stats-slide">
            <!-- USER STATS -->
            <div class="user-stats">
              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">${created}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Accepted</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->

              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">USD ${gigs.budget}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Budget</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->

              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">${date}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Deadline</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->
            </div>
            <!-- /USER STATS -->
          </div>

        </div>

        <!-- USER PREVIEW ACTIONS -->
        <div class="user-preview-actions">
          <!-- BUTTON -->
          <p class="button secondary" onclick="gigInProgressDetails('${gigs._id}')">Gig Details</p>
          <!-- /BUTTON -->

        </div>
        <!-- /USER PREVIEW ACTIONS -->
      </div>
      <!-- /USER PREVIEW INFO -->
      </div>
      <!-- /USER PREVIEW -->`;

      }else{  

      //Add to element
      elm += `<!-- USER PREVIEW -->
      <div class="user-preview">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/57.jpg" alt="cover-01">
      </figure>
      <!-- /USER PREVIEW COVER -->

      <!-- USER PREVIEW INFO -->
      <div class="user-preview-info">
        <!-- USER SHORT DESCRIPTION -->

        <div class="user-short-description">
          <!-- USER SHORT DESCRIPTION AVATAR -->
          <a class="user-short-description-avatar user-avatar medium" href="#">
            <!-- USER AVATAR BORDER -->
            <div class="user-avatar-border">
              <!-- HEXAGON -->
              <div class="hexagon-120-132"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR BORDER -->

            <!-- USER AVATAR CONTENT -->
            <div class="user-avatar-content">
              <!-- HEXAGON -->
              <div class="hexagon-image-82-90" data-src="${file}"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR CONTENT -->

            <!-- USER AVATAR PROGRESS -->
            <div class="user-avatar-progress">
              <!-- HEXAGON -->
              <div class="hexagon-progress-100-110"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR PROGRESS -->

            <!-- USER AVATAR PROGRESS BORDER -->
            <div class="user-avatar-progress-border">
              <!-- HEXAGON -->
              <div class="hexagon-border-100-110"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR PROGRESS BORDER -->

            <!-- USER AVATAR BADGE -->
            <div class="user-avatar-badge">
              <!-- USER AVATAR BADGE BORDER -->
              <div class="user-avatar-badge-border">
                <!-- HEXAGON -->
                <div class="hexagon-32-36"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BADGE BORDER -->

              <!-- USER AVATAR BADGE CONTENT -->
              <div class="user-avatar-badge-content">
                <!-- HEXAGON -->
                <div class="hexagon-dark-26-28"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BADGE CONTENT -->

              <!-- USER AVATAR BADGE TEXT -->
              <p class="user-avatar-badge-text">✓</p>
              <!-- /USER AVATAR BADGE TEXT -->
            </div>
            <!-- /USER AVATAR BADGE -->
          </a>
          <!-- /USER SHORT DESCRIPTION AVATAR -->

          <!-- USER SHORT DESCRIPTION TITLE -->
          <p class="user-short-description-title"><a href="#">${gigs.hirer_name}</a></p>
          <!-- /USER SHORT DESCRIPTION TITLE -->

          <!-- USER SHORT DESCRIPTION TEXT -->
          <p class="user-short-description-text"><a href="#">${gigs.title}</a></p>
          <!-- /USER SHORT DESCRIPTION TEXT -->
        </div>
        <!-- /USER SHORT DESCRIPTION -->

        <!-- USER PREVIEW STATS SLIDES -->
        <div id="user-preview-stats-slides-01" class="user-preview-stats-slides">
          <!-- USER PREVIEW STATS SLIDE -->
          <div class="user-preview-stats-slide">
            <!-- USER STATS -->
            <div class="user-stats">
              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">${created}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Accepted</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->

              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">USD ${gigs.budget}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Budget</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->

              <!-- USER STAT -->
              <div class="user-stat">
                <!-- USER STAT TITLE -->
                <p class="user-stat-title">${date}</p>
                <!-- /USER STAT TITLE -->

                <!-- USER STAT TEXT -->
                <p class="user-stat-text">Deadline</p>
                <!-- /USER STAT TEXT -->
              </div>
              <!-- /USER STAT -->
            </div>
            <!-- /USER STATS -->
          </div>

        </div>

        <!-- USER PREVIEW ACTIONS -->
        <div class="user-preview-actions">
          <!-- BUTTON -->
          <p class="button secondary" onclick="gigInProgressDetails('${gigs._id}')">Gig Details</p>
          <!-- /BUTTON -->

          <!-- BUTTON -->
          <p class="button primary" onclick="updateStatus('${gigs._id}','${gigs.job_hirer}')">Complete</p>
          <!-- /BUTTON -->
        </div>
        <!-- /USER PREVIEW ACTIONS -->
      </div>
      <!-- /USER PREVIEW INFO -->
      </div>
      <!-- /USER PREVIEW -->`;
      }
    });

    gigsInProgress.innerHTML = elm;
  }

  
  } catch (error) {
    console.log(error.message);
  }
}

  var scripts = [
    "js/vendor/simplebar.min.js",
    "js/utils/liquidify.js",
    "js/vendor/Chart.bundle.min.js",
    "js/global/global.hexagons.js",
    "js/global/global.tooltips.js",
    "js/global/global.popups.js",
    "js/global/global.charts.js",
    "js/header/header.js",
    "js/sidebar/sidebar.js",
    "js/content/content.js",
    "js/form/form.utils.js",
    "js/utils/svg-loader.js",
    "js/utils/db.js",
    "js/utils/page-loader.js",
  ];

  scripts.forEach((element) => {
    loadScript(element);
  });
};

const updateStatus = async (gigId,hirerId) => {
  console.log("clicked")
  window.location.href = `complete-gig-fl.html?gigId=${gigId}&hirer=${hirerId}`;
};

const gigsApplied = async () => {
  let url =
    "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/jobs/incoming_webhook/appliedJobs";
  let elm = "";
  const freelancer = {
    applicant: user,
  };

  if(user){


  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(freelancer),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.gigs.length > 0) {
    data.gigs.forEach((gigs) => {
      console.log(gigs);
     var file = gigs.background;

    
      var profilePic2 ="img/avatar/default_profile.jpg";
      var file2 = profilePic2.toString();

      console.log(file);
      console.log(typeof file);
      console.log(file2);
      console.log(typeof file2);

      //Add to element
      elm += `<!-- PRODUCT PREVIEW -->
      <div class="product-preview">
        <!-- PRODUCT PREVIEW IMAGE -->
        <a href="gig-info.html?gigId=${gigs._id}">
          <figure class="product-preview-image liquid">
            <img src="${file}" alt="item-01">
          </figure>
        </a>
        <!-- /PRODUCT PREVIEW IMAGE -->

        <!-- PRODUCT PREVIEW INFO -->
        <div class="product-preview-info">
          <!-- TEXT STICKER -->
          <p class="text-sticker"><span class="highlighted">$</span> ${gigs.budget}</p>
          <!-- /TEXT STICKER -->

          <!-- PRODUCT PREVIEW TITLE -->
          <p class="product-preview-title"><a href="gig-info.html?gigId=${gigs._id}">${gigs.title}</a></p>
          <!-- /PRODUCT PREVIEW TITLE -->

          <!-- PRODUCT PREVIEW CATEGORY -->
          <p class="product-preview-category digital"><a href="gig-info.html?gigId=${gigs._id}">${gigs.skills_required}</a></p>
          <!-- /PRODUCT PREVIEW CATEGORY -->

          <!-- PRODUCT PREVIEW TEXT -->
          <p class="product-preview-text">${gigs.description}</p>
          <!-- /PRODUCT PREVIEW TEXT -->
        </div>
        <!-- /PRODUCT PREVIEW INFO -->

        <!-- PRODUCT PREVIEW META -->
        <div class="product-preview-meta">
          <!-- PRODUCT PREVIEW AUTHOR -->
          <div class="product-preview-author">
            <!-- PRODUCT PREVIEW AUTHOR IMAGE -->
            <a class="product-preview-author-image user-avatar micro no-border" href="gig-info.html?gigId=${gigs._id}">
              <!-- USER AVATAR CONTENT -->
              <div class="user-avatar-content">
                <!-- HEXAGON -->
                <div class="hexagon-image-18-20" data-src="${file2}"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR CONTENT -->
            </a>
            <!-- /PRODUCT PREVIEW AUTHOR IMAGE -->

            <!-- PRODUCT PREVIEW AUTHOR TITLE -->
            <p class="product-preview-author-title">Posted By</p>
            <!-- /PRODUCT PREVIEW AUTHOR TITLE -->

            <!-- PRODUCT PREVIEW AUTHOR TEXT -->
            <p class="product-preview-author-text"><a href="#">${gigs.hirer_name}</a></p>
            <!-- /PRODUCT PREVIEW AUTHOR TEXT -->
          </div>
          <!-- /PRODUCT PREVIEW AUTHOR -->
          <!-- /RATING LIST -->
        </div>
        <!-- /PRODUCT PREVIEW META -->
      </div>
      <!-- /PRODUCT PREVIEW -->`;
    });
    gigsAppliedFor.innerHTML = elm;
  }
  } catch (error) {
    console.log(error.message);
  }
}
};



const gigsRecommeded = async () => {
  let urlFlSkills =
    "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/freelancers/incoming_webhook/viewFlSkills";
  let elm = "";
  const freelancer = {
    _id: user,
  };
  if(user){

  try {
    const res = await fetch(urlFlSkills, {
      method: "POST",
      body: JSON.stringify(freelancer),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    let skills = data.skills;
    let skills_required = {
      skills: skills,
    };
    
    console.log(skills);
    console.log(skills_required);

    

  let urlRecommendedJobs =
  "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/jobs/incoming_webhook/recommendedJobs"
  
    const res2 = await fetch(urlRecommendedJobs, {
      method: "POST",
      body: JSON.stringify(skills_required),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data2 = await res2.json();
    
    console.log(data2);

    if (data2.gigs.length > 0) {
    data2.gigs.forEach((gigs) => {
      console.log(gigs);
      var image = gigs.background;

    
      var profilePic2 ="img/avatar/default_profile.jpg";
      var file2 = profilePic2.toString();

      

      //Add to element
      elm += `<!-- PRODUCT PREVIEW -->
      <div class="product-preview">
        <!-- PRODUCT PREVIEW IMAGE -->
        <a href="gig-info.html?gigId=${gigs._id}&bidding=true">
          <figure class="product-preview-image liquid">
            <img src="${image}" alt="item-01">
          </figure>
        </a>
        <!-- /PRODUCT PREVIEW IMAGE -->

        <!-- PRODUCT PREVIEW INFO -->
        <div class="product-preview-info">
          <!-- TEXT STICKER -->
          <p class="text-sticker"><span class="highlighted">$</span> ${gigs.budget}</p>
          <!-- /TEXT STICKER -->

          <!-- PRODUCT PREVIEW TITLE -->
          <p class="product-preview-title"><a href="gig-info.html?gigId=${gigs._id}&bidding=true">${gigs.title}</a></p>
          <!-- /PRODUCT PREVIEW TITLE -->

          <!-- PRODUCT PREVIEW CATEGORY -->
          <p class="product-preview-category digital"><a >${gigs.skills_required}</a></p>
          <!-- /PRODUCT PREVIEW CATEGORY -->

          <!-- PRODUCT PREVIEW TEXT -->
          <p class="product-preview-text">${gigs.description}</p>
          <!-- /PRODUCT PREVIEW TEXT -->
        </div>
        <!-- /PRODUCT PREVIEW INFO -->

        <!-- PRODUCT PREVIEW META -->
        <div class="product-preview-meta">
          <!-- PRODUCT PREVIEW AUTHOR -->
          <div class="product-preview-author">
            <!-- PRODUCT PREVIEW AUTHOR IMAGE -->
            <a class="product-preview-author-image user-avatar micro no-border" href="#">
              <!-- USER AVATAR CONTENT -->
              <div class="user-avatar-content">
                <!-- HEXAGON -->
                <div class="hexagon-image-18-20" data-src="${file2}"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR CONTENT -->
            </a>
            <!-- /PRODUCT PREVIEW AUTHOR IMAGE -->

            <!-- PRODUCT PREVIEW AUTHOR TITLE -->
            <p class="product-preview-author-title">Posted By</p>
            <!-- /PRODUCT PREVIEW AUTHOR TITLE -->

            <!-- PRODUCT PREVIEW AUTHOR TEXT -->
            <p class="product-preview-author-text"><a href="#">${gigs.hirer_name}</a></p>
            <!-- /PRODUCT PREVIEW AUTHOR TEXT -->
          </div>
          <!-- /PRODUCT PREVIEW AUTHOR -->
          <!-- /RATING LIST -->
        </div>
        <!-- /PRODUCT PREVIEW META -->
      </div>
      <!-- /PRODUCT PREVIEW -->`;
    });
    gigsRecommendedTo.innerHTML = elm;
  }

  } catch (error) {
    console.log(error.message);
  }
}
};





const gigsCompleted = async () => {
  let url =
    "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whiz-ihwsd/service/jobs/incoming_webhook/completedJobs";
  let elm = "";
  const freelancer = {
    applicant: user,
  };
  if(user){


  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(freelancer),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.gigs.length > 0) {
    data.gigs.forEach((gigs) => {
      console.log(gigs);
      var date = moment(gigs.deadline).format("DD MMM YYYY");
      /* var image = Math.floor(Math.random() * 3) + 17;
        var profilePic = "img/marketplace/items/" + image + ".jpg";
        var file = profilePic.toString(); */

      //Add to element
      elm += `<div class="user-preview landscape">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/29.jpg" alt="cover-29">
        </figure>
        <!-- /USER PREVIEW COVER -->

        <!-- USER PREVIEW INFO -->
        <div class="user-preview-info">
          <!-- USER SHORT DESCRIPTION -->
          <div class="user-short-description landscape tiny">
            <!-- USER SHORT DESCRIPTION AVATAR -->
            <a class="user-short-description-avatar user-avatar small no-stats" href="group-timeline.html">

              <!-- /USER AVATAR CONTENT -->
            </a>
            <!-- /USER SHORT DESCRIPTION AVATAR -->

            <!-- USER SHORT DESCRIPTION TITLE -->
            <p class="user-short-description-title"><a href="group-timeline.html">${gigs.title}</a></p>
            <!-- /USER SHORT DESCRIPTION TITLE -->

            
          </div>
          <!-- /USER SHORT DESCRIPTION -->

          <!-- USER STATS -->
          <div class="user-stats">
            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${date}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Deadline</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">10 Oct 2021</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Date Completed</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${gigs.payment_status}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Payment Status</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->
          </div>
          <!-- /USER STATS -->

          <!-- USER PREVIEW ACTIONS -->
          <div class="user-preview-actions">


            <!-- BUTTON -->
            <a href="gig-info.html?gigId=${gigs._id}"><p class="button secondary">
              <!-- BUTTON ICON -->
              <svg class="button-icon icon-join-group">
                <use xlink:href="#svg-status"></use>
              </svg>
              <!-- /BUTTON ICON -->
            </p></a>
            <!-- /BUTTON -->
          </div>
          <!-- /USER PREVIEW ACTIONS -->
        </div>
        <!-- /USER PREVIEW INFO -->
      </div>`;
    });
    gigsCompletedCard.innerHTML = elm;
  }
  } catch (error) {
    console.log(error.message);
  }
};
};

const getReview = async () => {
  console.log("Current account is:" + meta);
  let elm = "";
  if(user){

  try {
    const result = await contract.methods.getAllReceivedReviews(meta).call();
    console.log(result);
    const data = await result;
    reviewsData = data;
    console.log(reviewsData);
    
    if (data.length > 0) {
    reviewsData.forEach((reviews) => {
      let jobName = reviews.job.title;
      let grading = reviews.ratings.grading;
      let text = "";
      switch (parseInt(grading)) {
        case 0:
          text = "Nil";
          console.log("switch worked case 0 activated");
          break;
        case 1:
          text = "Exceeds Expectations";
          console.log("switch worked case 0 activated");
          break;
        case 2:
          text = "Meets Expectations";
          console.log("switch worked case 0 activated");
      };
     /*  if(grading=0){
        text = "Nil";
      }else if(grading=1){
        text = "Exceeds Expectations";
      } else{
        text = "Meets Expectations";
      } */
    
      console.log("grading is:" + grading);
      console.log("text is " + text)
      let overall = reviews.ratings.overall;
      let quality = reviews.ratings.quality;
      let communication = reviews.ratings.communication;
      let timeliness = reviews.ratings.timeliness;
      let comments = reviews.comments;

      elm += `
      <!-- USER PREVIEW -->
      <div class="user-preview landscape">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/36.jpg" alt="cover-29">
        </figure>
        <!-- /USER PREVIEW COVER -->

        <!-- USER PREVIEW INFO -->
        <div class="user-preview-info">
          <!-- USER SHORT DESCRIPTION -->
          <div class="user-short-description landscape tiny">
            <!-- USER SHORT DESCRIPTION AVATAR -->
            <a class="user-short-description-avatar user-avatar small no-stats" href="group-timeline.html">

              <!-- /USER AVATAR CONTENT -->
            </a>
            <!-- /USER SHORT DESCRIPTION AVATAR -->

            <!-- USER SHORT DESCRIPTION TITLE -->
            <p class="user-short-description-title"><a href="#">
                ${jobName}
              </a></p>
            <!-- /USER SHORT DESCRIPTION TITLE -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">${text}</p>
            <!-- /USER SHORT DESCRIPTION TEXT -->
          </div>
          <!-- /USER SHORT DESCRIPTION -->

          <!-- USER STATS -->
          <div class="user-stats">
            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${overall}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Overall</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${quality}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Quality</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${communication}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Communication</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

            <!-- USER STAT -->
            <div class="user-stat">
              <!-- USER STAT TITLE -->
              <p class="user-stat-title">${timeliness}</p>
              <!-- /USER STAT TITLE -->

              <!-- USER STAT TEXT -->
              <p class="user-stat-text">Timeliness</p>
              <!-- /USER STAT TEXT -->
            </div>
            <!-- /USER STAT -->

          </div>
          <!-- /USER STATS -->

          <!-- USER PREVIEW ACTIONS -->
          <div class="user-preview-actions">
            <!-- BUTTON -->
            <p class="button secondary" onclick="alert('${comments}')">
              <!-- ICON INFO -->
              <svg class="button-icon icon-info">
                <use xlink:href="#svg-info"></use>
              </svg>
              <!-- /ICON INFO -->
            </p>
            <!-- /BUTTON -->
          </div>
          <!-- /USER PREVIEW ACTIONS -->
        </div>
        <!-- /USER PREVIEW INFO -->
        </div>
      `;
    });

    receivedReviews.innerHTML = elm;
  }
  } catch (error) {
    console.log("No reviews found:" + error);
  }
}
};

gigsProgress();
gigsApplied();
gigsRecommeded();
gigsCompleted();
getReview();
