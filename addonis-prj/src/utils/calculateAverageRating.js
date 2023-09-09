export function calculateAverageRating(ratings) {
  if (!ratings) return 0;
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
  return totalRatings / Object.keys(ratings).length;
}