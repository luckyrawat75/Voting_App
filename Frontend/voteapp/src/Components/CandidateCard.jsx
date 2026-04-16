const CandidateCard = ({
  candidate,
  hasVoted,
  onVote,
  showResult = false,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition">
      
      {/* INFO */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {candidate.name}
        </h2>

        <p className="text-sm text-gray-500">
          🏛 {candidate.party}
        </p>

        <p className="text-xs text-gray-400">
          Age: {candidate.age}
        </p>
      </div>

      {/* RESULT MODE */}
      {showResult ? (
        <p className="text-green-600 font-bold">
          Votes: {candidate.votes}
        </p>
      ) : (
        <button
          disabled={hasVoted}
          onClick={() => onVote(candidate._id)}
          className={`mt-2 px-4 py-2 rounded text-white ${
            hasVoted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {hasVoted ? "Already Voted" : "Vote"}
        </button>
      )}
    </div>
  );
};

export default CandidateCard;