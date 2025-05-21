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

// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Review {
//   author_name: string;
//   profile_photo_url: string;
//   rating: number;
//   text: string;
//   time: number;
// }

// interface GoogleReviewsData {
//   name: string;
//   rating: number;
//   reviews: Review[];
// }

// const useGoogleReviews = () => {
//   const [data, setData] = useState<GoogleReviewsData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/api/google-reviews");
//         setData(res.data);
//         console.log("Fetched Google Reviews:", res.data);
//       } catch (err: any) {
//         setError(err.message || "Coś poszło nie tak...");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { data, loading, error };
// };

// export default useGoogleReviews;
