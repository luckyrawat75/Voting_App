import { useEffect, useState } from "react";
import CandidateCard from "../Components/CandidateCard";
import Loader from "../Components/Loader";
import API from "../services/api";
import { toast } from "react-toastify";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  // 📥 FETCH CANDIDATES
  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidate"); 
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

 
 const handleVote = async (id) => {
  try {
    const res = await API.post(`/candidate/vote/${id}`);

   
    toast.success("Vote submitted successfully ✅");

    setHasVoted(true);

    
    const user = JSON.parse(localStorage.getItem("user"));
    user.isVoted = true;
    localStorage.setItem("user", JSON.stringify(user));

    fetchCandidates();
  } catch (err) {
    console.log(err);

    
    toast.error(err.response?.data?.message || "You have already voted ❌");
  }
};

  if (loading) return <Loader />;

  
return (
  <div className="p-4 sm:p-6">
    
    <h1 className="text-xl font-bold mb-4 text-center sm:text-left">
      Vote Here
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {candidates.map((c) => (
        <CandidateCard
          key={c._id}
          candidate={c}
          hasVoted={hasVoted}
          onVote={() => handleVote(c._id)}
        />
      ))}
    </div>

  </div>
);
};

export default Vote;