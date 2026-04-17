import { useEffect, useState } from "react";
import CandidateCard from "../Components/CandidateCard";
import Loader from "../Components/Loader";
import API from "../Services/api";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Results = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get("/candidate/vote/count"); //
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <Loader />;

  // 📊 Chart data
const chartData = {
  labels: data.map((c) => c.name),
  datasets: [
    {
      label: "Votes",
      data: data.map((c) => c.voteCount),
    },
  ],
};

// 🏆 Winner
const winner = data[0];

  return (
   <div className="p-6">
    <h1 className="text-xl font-bold mb-4">Election Results 🏆</h1>

    {/* 🏆 Winner */}
    <h2 className="text-green-600 font-bold mb-2">
      🏆 Winner: {winner?.name}
    </h2>

    {/* 📊 Chart */}
    <div className="mb-6">
      <Bar data={chartData} />
    </div>

    {/* 📋 Candidate List */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((c, index) => (
        <CandidateCard
          key={index}
          candidate={{ ...c, votes: c.voteCount }}
          showResult
        />
      ))}
    </div>
  </div>
  )
};

export default Results;