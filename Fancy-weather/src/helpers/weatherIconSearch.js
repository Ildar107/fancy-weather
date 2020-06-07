import weatherConditions from '../constants/weatherCondions';

export default function weatherIconSearch(weatherId, dt) {
  const weatherCondition = Object
    .values(weatherConditions.WEATHERCONDITIONS)
    .filter((x) => x.idMin <= weatherId && x.idMax >= weatherId)[0];
  const hour = dt.getHours();
  if (hour >= 5 && hour <= 21) {
    return weatherCondition.imgDaySrc;
  }

  return weatherCondition.imgNightSrc;
}
