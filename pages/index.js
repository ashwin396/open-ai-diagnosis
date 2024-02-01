import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function index() {
  const animalData = [
    { label: "feline(cat)", age: 5 },
    { label: "canine(dog)", age: 2 },
    { label: "bowine(cow)", age: 3 },
    { label: "Araneae(spider)", age: 4 },
  ];
  const [chipData, setChipData] = useState([]);
  const [outputs, setOutputs] = useState(null);
  const [species, setSpecies] = useState("");
  const handleDelete = (i) => {
    console.log("0000", i);
    let allchips = chipData;
    allchips.splice(i, 1);
    console.log(chipData);

    setChipData([...allchips]);
  };

  const handleSubmit = async () => {
    const data = {
      species: species,
      signs: chipData,
    };

    const response = await fetch("/api/post-diagnosis", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    response.json().then((data) => {
      console.log(data);
      setOutputs(data);
    });
  };
  console.log(species);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ width: 300, background: "#fff" }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              // alert("hello");
              setChipData([...chipData, e.target.value]);
              e.target.value = "";
            }
          }}
        />
        <Box sx={{ marginBlock: 4 }}>
          {chipData?.map((val, i) => (
            <Chip
              key={i}
              label={val}
              variant="outlined"
              onDelete={() => handleDelete(i)}
              sx={{ width: 100, background: "#fff" }}
            />
          ))}
        </Box>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={animalData}
          sx={{ width: 300, background: "#fff" }}
          onChange={(e, v) => setSpecies(v.label)}
          renderInput={(params) => <TextField {...params} label="Animals" />}
        />
        <Button
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#FFF", marginBlock: 4 }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </Box>
      {outputs != null && (
        <Box
          sx={{
            color: "#FFF",
            padding: 8,
            textTransform: "capitalize",
          }}
        >
          <Typography sx={{ fontSize: 20 }}>Diagnosis</Typography>
          {outputs.diagnosis.possibleDiagnosis.map((val, i) => (
            <Box key={i} sx={{ marginBlock: 5 }}>
              <Typography>diagnosis: {val.diagnosis}</Typography>
              <Typography>description: {val.description}</Typography>
              <Typography>differentials: {val.differentials}</Typography>
              <Typography>demographic: {val.demographic}</Typography>
              <Typography>symptoms: {val.symptoms}</Typography>
              <Typography>indicators: {val.indicators}</Typography>
              <Typography>contraindicators: {val.contraindicators}</Typography>
              <Typography>prognosis: {val.prognosis}</Typography>
              <Typography>treatment: {val.treatment}</Typography>
              <Typography>tests: {val.tests}</Typography>
            </Box>
          ))}
          <Typography sx={{ fontSize: 20 }}>Clinical</Typography>
          <Typography sx={{ textDecorationLine: "underline" }}>
            Senses
          </Typography>
          <Typography>sight: {outputs.clinical.senses.sight}</Typography>
          <Typography>smell: {outputs.clinical.senses.smell}</Typography>
          <Typography>sound: {outputs.clinical.senses.sound}</Typography>
          <Typography>touch: {outputs.clinical.senses.touch}</Typography>
          <Typography sx={{ textDecorationLine: "underline" }}>
            examination
          </Typography>
          {outputs.clinical.examination.map((val, i) => (
            <Box key={i}>
              <Typography>sound: {val.description}</Typography>
              <Typography>sound: {val.technique}</Typography>
            </Box>
          ))}
          <Typography sx={{ textDecorationLine: "underline" }}>
            interview
          </Typography>
          {outputs.clinical.interview.map((val, i) => (
            <Box key={i}>
              <Typography>sound: {val.purpose}</Typography>
              <Typography>sound: {val.question}</Typography>
            </Box>
          ))}
          <Typography sx={{ fontSize: 20 }}>Referrals</Typography>
          <Typography sx={{ textDecorationLine: "underline" }}>
            Referral
          </Typography>
          {outputs.referral.referrals.map((val, i) => (
            <Box key={i}>
              <Typography>specialist: {val.specialist}</Typography>
              <Typography>description: {val.description}</Typography>
            </Box>
          ))}
          <Typography sx={{ textDecorationLine: "underline" }}>
            labTests
          </Typography>
          {outputs.referral.labTests.map((val, i) => (
            <Box key={i}>
              <Typography>description: {val.description}</Typography>
              <Typography>typeOfTest: {val.typeOfTest}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default index;
