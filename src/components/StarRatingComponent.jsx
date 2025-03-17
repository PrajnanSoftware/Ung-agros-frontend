import React from "react";
import { Star as StarOutline } from "lucide-react";
import '../assets/css/starRating.css'

export default function StarRating({ rating }) {
  const full_stars = Math.floor(rating); // Full stars count
  const partial_star_percentage = (rating - full_stars) * 100; // Decimal part in percentage
  const empty_stars = 5 - full_stars - (partial_star_percentage > 0 ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array(full_stars)
        .fill(0)
        .map((_, i) => (
          <StarOutline key={`full-${i}`} className="w-5 h-5 text-yellow-500 star-fill" />
        ))}

      {/* Partial star */}
      {partial_star_percentage > 0 && (
        <div className="relative w-5 h-5">
          <StarOutline className="w-5 h-5 text-gray-400 absolute " />
          <StarOutline
            className="w-5 h-5 text-yellow-500  absolute star-fill"
            style={{
              clipPath: `inset(0 ${100 - partial_star_percentage}% 0 0)`, 
            }}
          />
        </div>
      )}

      {/* Empty stars */}
      {Array(empty_stars)
        .fill(0)
        .map((_, i) => (
          <StarOutline key={`empty-${i}`} className="w-5 h-5 text-gray-400" />
        ))}
    </div>
  );
}
