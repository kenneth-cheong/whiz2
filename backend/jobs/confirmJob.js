// This function confirms the selection of a freelancer and assigns him to the job
exports = async function(payload, response) {

    const jobs = context.services.get("mongodb-atlas").db("jobs").collection("jobs");
  
    // Convert the received body data from BSON to an EJSON object
    const body = EJSON.parse(payload.body.text());
    
    // Get all the details from the body object
    const _id = new BSON.ObjectId(body._id);
    const freelancer = body.freelancer
    const freelancerName = body.freelancerName;
    
    try{
          // Finds document with the id;
          const applied = await jobs.findOne({_id:_id, gig_status:"ASSIGNED"});
  
            if(applied)
            {
              throw "A freelancer has already been assigned to this job!";
            }
            else
            {
                // Update the job with the assigned freelancer and the status
              const result = await jobs.findOneAndUpdate({_id:_id},{$set:{freelancer:freelancer,gig_status:"ASSIGNED",freelancer_name:freelancerName}},{ returnNewDocument: true });
    
              response.setStatusCode(200);
              response.setBody(JSON.stringify(result));
            } 
    }
      catch (error){
          // Some exception has occured
          response.setStatusCode(500)
          response.setBody(`Error: Server has encountered an error. ` + error);
      }
    
    
  };
  