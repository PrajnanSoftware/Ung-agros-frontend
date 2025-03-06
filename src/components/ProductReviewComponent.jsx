import React, { useState } from "react";
import { Star, StarHalf, Star as StarOutline, ThumbsDown, ThumbsUp } from "lucide-react";
import StarRating from "./StarRatingComponent";

// Dummy reviews for example
const reviews_data = [
  {
    username: "John Doe",
    review: "This product is amazing! It works exactly as advertised.",
    rating: 5,
    upvotes: 10,
    downvotes: 0,
  },
  {
    username: "Jane Smith",
    review: "Pretty good product. I like the quality, but shipping was delayed.",
    rating: 4,
    upvotes: 5,
    downvotes: 33,
  },
  {
    username: "Alex Johnson",
    review: "Not bad, but it could use some improvements in durability.",
    rating: 3,
    upvotes: 7,
    downvotes: 3,
  },
  {
    username: "Emily Clark",
    review: "Loved it! Definitely worth the price.",
    rating: 4,
    upvotes: 8,
    downvotes: 13,
  },
  {
    username: "Robert Lee",
    review: "Decent product, but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee1",
    review: "Decent product,test2 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee2",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee3",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee4",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee5",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 13,
  },
  {
    username: "Robert Lee6",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  {
    username: "Robert Lee7",
    review: "Decent product, 3 but packaging was damaged.",
    rating: 3,
    upvotes: 4,
    downvotes: 3,
  },
  // Additional dummy reviews can be added here
];


const ProductReview = () => {
  const [showMore, setShowMore] = useState(false);
  const [current_shown_review_count, setCurrentShownReviewCount] = useState(5);
  
  const [reviews, setReviews] = useState(reviews_data.slice(0, 5)); // Initially show 5 reviews
  const [upvote_counts, setUpvoteCounts] = useState(
    reviews_data.map((review) => review.upvotes)
  );
  const [downvote_counts, setDownvoteCounts] = useState(
    reviews_data.map((review) => review.downvotes)
  );
  const per_request_review_load = 5;

  const handleShowMore = () => {
   
     if(reviews.length != reviews_data.length)
     {
        setReviews(reviews_data.slice(0, reviews.length + per_request_review_load)); 
     }
          
  };

  const handleShowLess = () => {
   
    if(reviews.length != per_request_review_load)
    {
       setReviews(reviews_data.slice(0,per_request_review_load)); 
    }
         
 };

  const handleUpvote = (index) => {

    const new_upvote_counts = [...upvote_counts];
    new_upvote_counts[index] += 1;
    setUpvoteCounts(new_upvote_counts);
  };

  const handleDownvote = (index) => {
    const new_downvote_counts = [...downvote_counts];
    new_downvote_counts[index] += 1;
    setDownvoteCounts(new_downvote_counts);
  };

  return (
    <div className="mt-4 p-5 " style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      {reviews.map((review, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">{review.username}</h4>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-600 mb-2">{review.review}</p>
          <div style={{     display: "flex",
    gap: "10px", }}>
            <button
                onClick={() => handleUpvote(index)}
                className="flex items-center text-blue-500 text-sm"
            >
                <ThumbsUp className="w-4 h-4 mr-1" /> Upvote ({upvote_counts[index]})
            </button>
            <button
                onClick={() => handleDownvote(index)}
                className="flex items-center text-blue-500 text-sm"
            >
                <ThumbsDown className="w-4 h-4 mr-1" /> Downvote ({downvote_counts[index]})
            </button>
          </div>
        </div>
      ))}

    {reviews.length < reviews_data.length && (
        <button
          onClick={handleShowMore}
          className="text-blue-500 text-sm mt-4 underline"
        >
          Load More Reviews
        </button>
      )}

    {reviews.length != per_request_review_load && (
        <button
          onClick={handleShowLess}
          className="ml-2 text-blue-500 text-sm mt-4 underline"
        >
          Show Less
        </button>
      )}

    </div>
  );
};

export default ProductReview;
