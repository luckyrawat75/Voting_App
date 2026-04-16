import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { role: "admin" }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Voting App</h1>

      <div className="flex gap-4 items-center">
        {token && (
          <>
            <Link to="/vote" className="hover:text-blue-400">
              Vote
            </Link>

            <Link to="/results" className="hover:text-blue-400">
              Results
            </Link>

            {/* Admin only */}
            {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-yellow-400">
                Admin
              </Link>
            )}
          </>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/" className="bg-blue-500 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
