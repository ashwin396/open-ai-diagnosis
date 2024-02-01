const schema = {
    type: "object",
    properties: {
        senses: {
            type: "object",
            description: "Sight, sound, smell, touch (palpation) as well as other clinical tests. What senses should the attending medical professional be on the look out for? Given the diagnosis, please be specific and probative in your recommendations. Make sure to explain what to look for as well as why it could be helpful.",
            properties: {
                sight: { type: "string", description: "What to look for when visually engaging the pet. Explain why this information could be probative.S" },
                sound: { type: "string", description: "What to listen for when engaging the pet. Explain why this information could be probative." },
                touch: { type: "string", description: "What physical sensations, if any, to look for when palpating. Explain why this information could be probative." },
                smell: { type: "string", description: "What smells to pay attention to, if any may be relevant. Explain why this information could be probative." },
            },
        },
        examination: {
            type: "array",
            description: "Please list specific examination techniques that you recommend as well as what to look for and why. Remember that this is strictly for the clinical visit. We will worry about referrals and follow-up later. Focus only on primary care type techniques.",
            items: {
                type: "object",
                properties: {
                    technique: { type: "string", description: "EXAMINATION TECHNIQUE ALL CAPS" },
                    description: { type: "string", description: "Description of what to look for and why, e.g. how this exam is probative" }
                },
            }
        },
        interview: {
            type: "array",
            items: {
                type: "object",
                description: "Suggest several questions for the clinician to ask the pet's owner as part of the investigation",
                properties: {
                    purpose: { type: "string", description: "PROBATIVE PURPOSE OF QUESTION ALL CAPS" },
                    question: { type: "string", description: "Suggested question" }
                },
            }
        }
    }
}

module.exports = schema;

