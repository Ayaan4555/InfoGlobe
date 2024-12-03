

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import Card from './Card';

function CountryNews() {
  const params = useParams();
  const navigate = useNavigate(); // To navigate the user to login page
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if the user is logged in (by checking the token in localStorage)
  const isAuthenticated = localStorage.getItem('token');

  // If the user is not authenticated, redirect them to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const pageSize = 6;

  useEffect(() => {
    if (!isAuthenticated) return; // Don't fetch data if not authenticated
    setIsLoading(true);
    setError(null);
    const countryParam = params.country ? `&q=${params.country}` : "";
    
    // Fetch country news with the JWT token in the headers
    fetch(`http://localhost:3000/country?language=en${countryParam}&page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`, // Pass token in the header
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.country, isAuthenticated]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <Card
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            navigate('/login')
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;