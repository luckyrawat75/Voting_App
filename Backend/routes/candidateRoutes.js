const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Candidate = require("../models/Candidate");
const { jwtAuthMiddleware } = require("../jwt");

//  Check admin helper
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return false;
    return user.role === "admin";
  } catch {
    return false;
  }
};

//  GET ALL CANDIDATES
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET VOTE RESULTS (sorted by voteCount)
router.get("/vote/count", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    const result = candidates.map((c) => ({
      name: c.name,
      party: c.party,
      voteCount: c.voteCount,
    }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/vote/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateID);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //  ADMIN BLOCK
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin is not allowed to vote" });
    }

   
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    
    candidate.votes.push({ user: req.user.id });
    candidate.voteCount++;

    await candidate.save();

    
    user.isVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote cast successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  CREATE CANDIDATE (admin only)
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id))) {
      return res.status(403).json({ message: "User is not admin" });
    }
    const newCandidate = new Candidate(req.body);
    const response = await newCandidate.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  UPDATE CANDIDATE (admin only)
router.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id))) {
      return res.status(403).json({ message: "User is not admin" });
    }
    const response = await Candidate.findByIdAndUpdate(
      req.params.candidateID,
      req.body,
      { new: true, runValidators: true }
    );
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  DELETE CANDIDATE (admin only)
router.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id))) {
      return res.status(403).json({ message: "User is not admin" });
    }
    const response = await Candidate.findByIdAndDelete(req.params.candidateID);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;