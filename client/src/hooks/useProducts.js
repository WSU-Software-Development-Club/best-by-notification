import { useState, useEffect, useCallback } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const userId = sessionStorage.getItem("userId");
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/${userId}/get_products`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setProducts(data || []);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      alert("Failed to fetch products. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, fetchProducts };
};

export default useProducts;
