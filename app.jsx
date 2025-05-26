import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const authResponse = await axios.post("http://20.244.56.144/evaluation-service/auth", {
          email: "knikithagoud06@gmail.com",
          name: "k.nikitha",
          rollNo: "22q61a6616",
          accessCode: "dJFufE",
           "clientID": "9a287687-3668-4a6b-a2d9-d3a9fef63741",
                "clientSecret": "bVxBPGWTbFgduPNJ"
        });

        const token = authResponse.data.access_token;

        const stockResponse = await axios.get("http://20.244.56.144/evaluation-service/stocks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStockData(stockResponse.data);
        console.log("✅ Stock Data:", stockResponse.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err.response?.data || err.message);
        setError("Failed to fetch stock data.");
      }
    };

    fetchStockData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📈 Stock Info</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !stockData && <p>Loading...</p>}
      {stockData && (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(stockData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default App;