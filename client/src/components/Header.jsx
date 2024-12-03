import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light-theme");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if user data exists in localStorage
    
  }, []);

  
  

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user data
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light-theme" ? "dark-theme" : "light-theme"));
  };

  const category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];
  const country = [
    "India",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "China",
    "Colombia",
    "Cuba",
    "Czech Republic",
    "Egypt",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Latvia",
    "Lithuania",
    "Malaysia",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "UAE",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="header">
      <nav
        className={
          theme === "light-theme"
            ? "fixed top-0 left-0 w-full h-auto bg-[#000] z-10 flex items-center justify-around"
            : "fixed top-0 left-0 w-full h-auto z-10 flex items-center justify-around bg-[#000]"
        }
      >
        <Link to="/">
          <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5 h3">
            InfoGlobe
          </h3>
        </Link>

        <ul
          className={
            active
              ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active"
              : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end none"
          }
        >
          <li className="all">
            <Link
              className="no-underline font-semibold"
              to="/"
              onClick={() => {
                setActive(!active);
              }}
            >
              All News
            </Link>
          </li>
          <li className="dropdown-li all">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines{" "}
              <FontAwesomeIcon
                className={
                  showCategoryDropdown
                    ? "down-arrow-icon down-arrow-icon-active"
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                  }}
                >
                  <Link
                    to={`/top-headlines/${element}`}
                    className="flex gap-3 capitalize"
                    onClick={() => {
                      setActive(!active);
                    }}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="dropdown-li all">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country{" "}
              <FontAwesomeIcon
                className={
                  showCountryDropdown
                    ? "down-arrow-icon down-arrow-icon-active"
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {country.map((element, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setShowCountryDropdown(!showCountryDropdown);
                  }}
                >
                  <Link
                    to={`/country/${element}`}
                    className="flex gap-3"
                    onClick={() => {
                      setActive(!active);
                    }}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-white-500 focus:pl-16 focus:pr-4 color"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-white-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}

<li className="flex justify-center items-center search-icon big-toggle">
            <Link
              className="no-underline font-semibold "
              to="#"
              onClick={() => {
                toggleTheme();
              }}
            >
              <input type="checkbox" className="checkbox " id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
       </li>



        </div>
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>           <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
         </div>

      </nav>
    </header>
  );
}

export default Header;






