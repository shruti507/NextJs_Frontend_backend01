// src/components/Header.tsx
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

interface HeaderProps {
  setProperties: (properties: any[]) => void;
}

// Header component to manage authentication state and search functionality
const Header = ({ setProperties }: HeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const route = useRouter();

  // Check authentication status on component mount
  useEffect(() => {
    const token =
      localStorage.getItem("userId") || sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

   // Navigate to add property page
  const handleAddPropertyClick = () => {
    router.push("/property/add-property");
  };

   // Navigate to login page
  const handleLoginClick = () => {
    router.push("/auth/sign-in");
  };

  // Handle logout and redirect to home
  const handleLogoutClick = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    setIsAuthenticated(false);
    router.push("/");
  };

  // Fetch filtered properties and navigate to search page
  const fetchFilteredProperties = async (term: string) => {
    const url = `${process.env.NEXT_PUBLIC_PROPERTY_SEARCH_URL}?address=${term}`;
    try {
      const result = await axios.get(url);
      const serializedData = JSON.stringify(result.data);

      route.push({
        pathname: "/search",
        query: {
          data: serializedData,
        },
      });
    } catch (err) {
      console.error("Error searching properties:", err);
    }
  };

   // Handle search input change with debouncing
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchFilteredProperties(searchTerm);
    }, 300);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          href="/"
          aria-label="Home"
        >
          <h4 className="mb-0">
            Real<span className="text-primary">State</span>
          </h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" href="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => router.push("/navbar/about")}
                style={{ cursor: "pointer" }}
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => router.push("/property/user-property")}
                style={{ cursor: "pointer" }}
              >
                Properties
              </a>
            </li>
          </ul>
          <form className="d-flex ms-auto mb-2 mb-lg-0" role="search">
            <input
              className="form-control me-2"
              onChange={handleSearch}
              type="search"
              placeholder="Enter location.."
              aria-label="Search"
            />
            {/* <button className="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
          <div className="d-flex ms-2">
            {isAuthenticated ? (
              <>
                <button
                  className="btn btn-danger me-2"
                  onClick={handleLogoutClick}
                  aria-label="Logout"
                >
                  Logout
                </button>
                <button
                  className="btn btn-info"
                  onClick={handleAddPropertyClick}
                  aria-label="Add Property"
                >
                  Add Properties
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary me-2"
                style={{ zIndex: "10" }}
                onClick={handleLoginClick}
                aria-label="Login"
              >
                Login
              </button>
            )}
            <button
              className="btn btn-light"
              onClick={() => router.push("/property/fav")}
            >
              <FaHeart size={20} aria-label="Favorites" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
