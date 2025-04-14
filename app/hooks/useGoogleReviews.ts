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
  name?: string;
  rating?: number;
  reviews?: Review[];
}

interface UseGoogleReviewsOptions {
  fetchRating?: boolean;
  fetchReviews?: boolean;
}

const useGoogleReviews = ({
  fetchRating = true,
  fetchReviews = true,
}: UseGoogleReviewsOptions = {}) => {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/google-reviews");
        // Zakładamy, że backend zwraca obiekt z { rating, reviews }
        const result = res.data;
        const payload: GoogleReviewsData = {};
        if (fetchRating) payload.rating = result.rating;
        if (fetchReviews) payload.reviews = result.reviews;
        setData(payload);
        console.log("Google Reviews Data:", payload);
      } catch (err: any) {
        setError(err.message || "Coś poszło nie tak...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchRating, fetchReviews]);

  return {
    data,
    loading,
    error,
  };
};

export default useGoogleReviews;
