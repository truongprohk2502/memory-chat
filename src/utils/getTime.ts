export const getTimeAgo = (
  time: number,
): {
  quantity: number;
  unit: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
} => {
  const duration = (Date.now() - time) / 1000;

  const minuteSeconds = 60;
  const hourSeconds = 60 * minuteSeconds;
  const daySeconds = 12 * hourSeconds;
  const weekSeconds = 7 * daySeconds;
  const monthSeconds = 30 * daySeconds;
  const yearSeconds = 365 * daySeconds;

  if (duration < 0) throw new Error('invalid_time');
  else if (duration < minuteSeconds) return { quantity: 1, unit: 'minute' };
  else if (duration < hourSeconds)
    return { quantity: Math.floor(duration / minuteSeconds), unit: 'minute' };
  else if (duration < daySeconds)
    return { quantity: Math.floor(duration / hourSeconds), unit: 'hour' };
  else if (duration < weekSeconds)
    return { quantity: Math.floor(duration / daySeconds), unit: 'day' };
  else if (duration < monthSeconds)
    return { quantity: Math.floor(duration / weekSeconds), unit: 'week' };
  else if (duration < yearSeconds)
    return { quantity: Math.floor(duration / monthSeconds), unit: 'month' };
  else return { quantity: Math.floor(duration / yearSeconds), unit: 'year' };
};
