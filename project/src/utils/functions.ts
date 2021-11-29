export const ratingToString = (rating: number): string => {
  // от 0 до 3 — Bad.
  // от 3 до 5 — Normal.
  // от 5 до 8 — Good.
  // от 8 до 10 — Very good.
  // 10 — Awesome.
  if (rating === 10) {
    return 'Awesome';
  }
  if (rating > 8) {
    return 'Very good';
  }
  if (rating > 5) {
    return 'Good';
  }
  if (rating > 3) {
    return 'Normal';
  }

  return 'Bad';
};

export const runtimeToString = (runtime: number): string => {
  let runtimeString = '';

  const hours = Math.floor(runtime / 60);
  const minutes = (runtime % 60);

  if (hours !== 0) {
    runtimeString += `${hours}h`;
  }

  runtimeString += ` ${minutes}m`;

  return runtimeString;
};
