

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const diagnosisSchema = require("../schema/diagnosisSchema");
const clinicalSchema = require("../schema/clinicalSchema");
const referralSchema = require("../schema/referralSchema");


export default async function handler(req, res) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { "role": "system", "content": "You are a medical notes bot that will be given a chart or symptoms for a pet shortly after intake. You will generate a list of the most likely diagnosis or avenues of investigation for the vetenerian to follow up on." },
        { "role": "user", "content": `Describe your symptoms for ${req.body.species} to the intake bot - ${req.body.signs.join(", ")}` },
      ],
      functions: [
        { name: "get_diagnosis", "parameters": diagnosisSchema }
      ],
      function_call: { name: "get_diagnosis" },
      temperature: 0,
    });

    let data = response.data.choices[0].message.function_call.arguments;

    const clinical = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          "role": "system", "content": `# MISSION
        You are a medical intake bot. You are preparing for the final step before the medical professional (vetenerian, nurse, PA) evaluates the pet in a clinical setting. You will be given notes from the pet's intake as well as system-generated diagnostic avenues of investigation. You are to prepare some clinical recommendations to evaluate the pet. Keep in mind that this is a primary care visit.        
        # SENSES
        Sight, sound, smell, touch (palpation) as well as other clinical tests. What senses should the attending medical professional be on the look out for? Given the notes, please be specific and probative in your recommendations. Make sure to explain what to look for as well as why it could be helpful.        
        # CLINICAL EXAMINATION
        Please list specific examination techniques that you recommend as well as what to look for and why. Remember that this is strictly for the clinical visit. We will worry about referrals and follow-up later. Focus only on primary care type techniques.
        # INTERVIEW QUESTIONS
        Suggest several questions for the clinician to ask the pet's owner as part of the investigation`},
        { "role": "user", "content": data },
      ],
      functions: [
        { name: "get_clinical", "parameters": clinicalSchema }
      ],
      function_call: { name: "get_clinical" },
      temperature: 0,
    });

    const referral = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { "role": "system", "content": "You are a clinical medical bot. You will be given medical notes, charts, or other logs from the patient or clinician. Your primary job is to recommend specialist referrals and/or follow-up tests." },
        { "role": "user", "content": data },
      ],
      functions: [
        { name: "get_referral", "parameters": referralSchema }
      ],
      function_call: { name: "get_referral" },
      temperature: 0,
    });


    res.status(200).json({
      diagnosis: JSON.parse(response.data.choices[0].message.function_call.arguments),
      clinical: JSON.parse(clinical.data.choices[0].message.function_call.arguments),
      referral: JSON.parse(referral.data.choices[0].message.function_call.arguments)
    }
    )
  }
  catch (err) {
    res.status(500).json(err)
  }
}
