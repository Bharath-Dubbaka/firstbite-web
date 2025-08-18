// src/services/admin/apiClient.js
// This is a generic API client for your admin panel.
// It fetches the admin token from localStorage for authenticated requests.

const getAdminToken = () => {
   if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
   }
   return null;
};

export const adminApiClient = async (endpoint, method = "GET", body = null) => {
   const token = getAdminToken();
   const headers = {
      "Content-Type": "application/json",
   };

   if (token) {
      headers["Authorization"] = `Bearer ${token}`;
   }

   const config = {
      method,
      headers,
   };

   if (body) {
      config.body = JSON.stringify(body);
   }

   try {
      // Make sure you have this environment variable set in .env.local
      // NEXT_PUBLIC_BACKEND_URL=http://localhost:9999
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
         config
      );

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.error || data.message || "An API error occurred");
      }
      return data;
   } catch (error) {
      console.error(`API Client Error (${method} ${endpoint}):`, error);
      throw error;
   }
};
