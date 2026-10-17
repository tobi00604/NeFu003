import { solarSystemPlanets } from './utils/SolarSystem.js';

export default async (req, context) => {

  // 惑星名の一覧を抽出
  const planets = solarSystemPlanets.map(planet => ({
    name: planet.name,
    englishName: planet.englishName
  }));

  return Response.json(planets, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
