const express = require("express");
const router = express.Router();

const database = require("../database/firebase");

// twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/createNewAccessCode", async (req, res) => {
  const phoneNumber = req.query.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).send({ error: "Phone number is required." });
  }

  const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const userRef = database.collection("user").doc();
    await userRef.set({
      phoneNumber: phoneNumber,
      accessCode: accessCode,
      favorite_github_users: [],
    });

    await client.messages.create({
      body: `Dear Customer. Here is your 6-digit access code ${accessCode}`,
      from: "+19704648041",
      to: phoneNumber,
    });

    res.status(201).send("6-digit code is sent to your number via SMS.").end();
  } catch (error) {
    console.log(error);
    if (error.code === 21610) {
      res.status(400).send("Insufficient funds in Twilio account.").end();
    } else {
      res.status(500).send("Unable to create access code.").end();
    }
  }
});

router.post("/registerPhoneNumber", async (req, res) => {
  const phoneNumber = req.query.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).send({ error: "Phone number is required." }).end();
  }

  try {
    const userRef = database.collection("user").doc();
    await userRef.set({
      phoneNumber: phoneNumber,
      accessCode: "",
      favorite_github_users: [],
    });
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to store in the database").end();
  }
});

router.post("/ValidateAccessCode", async (req, res) => {
  const accessCode = req.query.accessCode;
  const phoneNumber = req.query.phoneNumber;

  if (!accessCode || !phoneNumber) {
    return res
      .status(400)
      .send({ error: "Access code and phone number are required." })
      .end();
  }

  try {
    const userRef = database
      .collection("user")
      .where("phoneNumber", "==", phoneNumber);
    const userSnapshot = await userRef.get();
    if (userSnapshot.empty) {
      return res
        .status(400)
        .send({ error: "Access code not found for this phone number." })
        .end();
    }

    const userDoc = userSnapshot.docs[0];
    const storedAccessCode = userDoc.data().accessCode;
    if (storedAccessCode !== accessCode) {
      return res.status(400).send("Invalid access code.").end();
    }

    await userDoc.ref.update({ accessCode: "" });
    res.status(202).send("Phone number validation succeeded").end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error }).end();
  }
});

module.exports = router;
