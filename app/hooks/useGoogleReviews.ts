"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { google_reviews } from "@prisma/client";

export type GoogleReview = google_reviews;

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/api/get-reviews");
        setReviews(data);
      } catch (err) {
        setError("Nie udało się pobrać opinii.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};
