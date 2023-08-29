import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";

export default function StarRating({ count, size }) {
  // count:  number of stars you want, pass as props
  //size: size of star that you want

  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
//   console.log(rating)
  return (
    <HStack spacing={"2px"}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
          onClick={(e) => {console.log(e.target)}}
            as="label"
            rating = {index+1}
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              d="none"
            ></Radio>
            <FaStar
            rating = {index+1}
              cursor={"pointer"}
              size={size || 20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}
