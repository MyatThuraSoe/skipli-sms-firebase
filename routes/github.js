const axios = require("axios");
const express = require("express");
const router = express.Router();

const database = require("../database/firebase");

async function getJSONObjectCount(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

router.get("/searchGithubUsers", async (req, res) => {
  let { q, page, per_page } = req.query;
  page = page || 1;
  per_page = per_page || 10;
  try {
    await axios
      .get(
        `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`
      )
      .then((response) => {
        const users = response.data.items.map((item) => {
          return {
            login: item.login,
            id: item.id,
            avatar_url: item.avatar_url,
            html_url: item.html_url,
            repos_url: item.repos_url,
            followers_url: item.followers_url,
          };
        });
        res.status(200).json({ users });
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/findGithubUserProfile/:id", async (req, res) => {
  const githubUserId = req.params.id;

  try {
    const response = await axios.get(
      `https://api.github.com/user/${githubUserId}`
    );
    const { login, id, avatar_url, html_url, repos_url, followers_url } =
      response.data;

    const repos = await getJSONObjectCount(repos_url);
    const followers = await getJSONObjectCount(followers_url);

    const githubUserProfile = {
      login,
      id,
      avatar_url,
      html_url,
      repos,
      followers,
    };

    res.status(200).send({ githubUserProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

router.post("/likeGithubUser", async (req, res) => {
  const phoneNumber = req.query.phone_number;
  const githubUserId = req.query.github_user_id;

  if (!phoneNumber) {
    return res.status(400).send({ error: "Phone number is required." }).end();
  }

  if (!githubUserId) {
    return res.status(400).send({ error: "Github user ID is required." }).end();
  }

  // Get the document reference for the user with the specified phone number
  const userRef = database
    .collection("user")
    .where("phoneNumber", "==", phoneNumber)
    .limit(1);

  // Get the user document and update the favorite_github_users array
  const querySnapshot = await userRef.get();
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const favoriteGithubUsers = userDoc.data().favorite_github_users || [];
    favoriteGithubUsers.push(githubUserId);

    // Update the favorite_github_users array in the user document
    await userDoc.ref.update({ favorite_github_users: favoriteGithubUsers });

    res.status(200).send({ message: "User liked successfully" });
  } else {
    res.status(404).send({ error: "User not found" });
  }
});
router.post("/unlikeGithubUser", async (req, res) => {
  const phoneNumber = req.query.phone_number;
  const githubUserId = req.query.github_user_id;

  if (!phoneNumber || !githubUserId) {
    return res
      .status(400)
      .send({ error: "Phone number and github user ID are required." })
      .end();
  }

  try {
    const userRef = database
      .collection("user")
      .where("phoneNumber", "==", phoneNumber);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).send({ error: "User not found" }).end();
    }

    // For simplicity, we assume that there's only one document matching the query.
    const userDoc = snapshot.docs[0];
    const favoriteGithubUsers = userDoc.data().favorite_github_users;

    const index = favoriteGithubUsers.indexOf(githubUserId);
    if (index === -1) {
      return res
        .status(404)
        .send({ error: "Github user not found in user's favorites" })
        .end();
    }

    // Remove the Github user ID from the user's favorites.
    favoriteGithubUsers.splice(index, 1);

    // Update the user document in Firestore.
    await userDoc.ref.update({ favorite_github_users: favoriteGithubUsers });

    res.status(200).send({ message: "User unliked successfully" }).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error unliking user", error }).end();
  }
});

// (GET) getUserProfile API
router.get("/getUserProfile", async (req, res) => {
  const phoneNumber = req.query.phone_number;

  try {
    const userRef = database
      .collection("user")
      .where("phoneNumber", "==", phoneNumber);
    const snapshot = await userRef.get();
    if (snapshot.empty) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const userData = snapshot.docs[0].data();

    res.status(200).send({ user: userData });
  } catch (error) {
    res.status(500).send({ message: "Error fetching user profile", error });
  }
});

module.exports = router;
