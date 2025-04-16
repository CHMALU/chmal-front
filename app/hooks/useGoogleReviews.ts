import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number;
}

interface GoogleReviewsData {
  name: string;
  rating: number;
  reviews: Review[];
}

const useGoogleReviews = () => {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/google-reviews");
        setData(res.data);
        console.log("Fetched Google Reviews:", res.data);
      } catch (err: any) {
        setError(err.message || "Coś poszło nie tak...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGoogleReviews;
