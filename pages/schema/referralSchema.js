const schema = {
    type: "object",
    properties: {
      referrals: {
        type: "array",
        items: {
          type: "object",          
          properties: {
            specialist: { type: "string", description: "TYPE OF SPECIALIST ALL CAPS" },
            description: { type: "string", description: "Description of workup, recommendations, tests, and communication to send to this specialist e.g. what are they looking for and why?" }
          },
        }
      },
      labTests: {
        type: "array",
        items: {
          type: "object",
          properties: {
            typeOfTest: { type: "string", description: "TYPE OF TEST OR LAB WORK" },
            description: { type: "string", description: "Description of work to be done e.g. imaging, phlebotomy, etc as well as probative value e.g. indications, contraindications, differentials, in other words what are you trying to rule in or out" }
          },
        }
      }
    }
  }
  
  module.exports = schema;