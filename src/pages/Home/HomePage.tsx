import { Link } from "react-router-dom";
import { useAuth } from "../../composables/AuthContext";

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            <h1>Vocabulary SRS</h1>

            {!isAuthenticated ? (
                <div>
                    <p>Please log in or register to continue</p>

                    <div>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>

                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Link to="/words">
                        <button>Go to my words</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
