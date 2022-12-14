import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div className="search">
        <input
          value={search}
          type="search"
          placeholder="Search Comics"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="container">
        {data.results.map((results, index) => {
          return (
            <div key={results._id} className="comics-card">
              <h2>{results.title}</h2>
              {results.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                <img
                  src="https://i.pinimg.com/originals/95/68/10/956810e88df05b6d7a028376df4e6b34.jpg"
                  alt="comics-notFound"
                />
              ) : (
                <img
                  src={
                    results.thumbnail.path + "." + results.thumbnail.extension
                  }
                  alt="comics"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
