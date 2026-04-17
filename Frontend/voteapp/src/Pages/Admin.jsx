import { useEffect, useState } from "react";
import API from "../Services/api";
import { toast } from "react-toastify";

const Admin = () => {
  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: "",
  });

  const [candidates, setCandidates] = useState([]);

  // 📥 FETCH ALL
  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidate");
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // 🔁 HANDLE INPUT
  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };

  // ➕ ADD
  const handleAdd = async () => {
    try {
      await API.post("/candidate", candidate);
      toast.success("Candidate Added ✅");

      setCandidate({ name: "", party: "", age: "" });
      fetchCandidates();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Error ❌");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/candidate/${id}`);
      fetchCandidates();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* FORM */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          name="name"
          value={candidate.name}
          onChange={handleChange}
          placeholder="Candidate name"
          className="border p-2 rounded"
        />

        <select
          name="party"
          value={candidate.party}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Party</option>
          <option value="BJP">BJP</option>
          <option value="INC">INC</option>
          <option value="AAP">AAP</option>
          <option value="TMC">TMC</option>
        </select>

        <input
          name="age"
          type="number"
          value={candidate.age}
          onChange={handleChange}
          placeholder="Age"
          className="border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <ul>
        {candidates.map((c) => (
          <li
            key={c._id}
            className="flex justify-between bg-gray-100 p-3 mb-2 rounded"
          >
            <div>
              <p className="font-bold">{c.name}</p>
              <p>
                {c.party} | Age: {c.age}
              </p>
            </div>

            <button
              onClick={() => handleDelete(c._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
