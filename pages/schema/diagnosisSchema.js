const schema = {
  type: "object",
  properties: {
    possibleDiagnosis: {
      type: "array",
      items: {
        type: "object",
        description: "Description of the condition, common alternative names, etc",
        properties: {
          diagnosis: { type: "string", description: "POTENTIAL DIAGNOSIS ALL CAPS" },
          description: { type: "string", description: "Description of the condition, common alternative names, etc" },
          differentials: { type: "string", description: "Differentials description" },
          demographic: { type: "string", description: "Typical demographic of affliction, demographic risk factors" },
          symptoms: { type: "string", description: "Formal list of symptoms" },
          indicators: { type: "string", description: "Why this pet matches this diagnosis" },
          contraindicators: { type: "string", description: "Why this pet doesn't match this diagnosis" },
          prognosis: { type: "string", description: "General outlook for condition" },
          treatment: { type: "string", description: "Available treatment options" },
          tests: { type: "string", description: "Recommended follow up tests, and what you're looking for, probative information desired></Available" },
        },
        required: ["diagnosis", "description", "symptoms", "differentials", "demographic", "indicators", "contraindicators", "prognosis", "treatment", "tests"]
      }
    }
  },
  required: ["possibleDiagnosis"]
}

module.exports = schema;