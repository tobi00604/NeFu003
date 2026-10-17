import { solarSystemPlanets } from './utils/SolarSystem.js';

export default async (req, context) => {
  let name1 = "地球";
  let name2 = "火星";

  if (req.method === "POST") {
    try {
      const body = await req.json();
      name1 = body.name1 || "地球";
      name2 = body.name2 || "火星";
    } catch (error) {
      console.error("JSONの読み込みエラー:", error);
    }
  }

  // 対象の惑星データを検索
  const planet1 = solarSystemPlanets.find(planet => planet.name === name1);
  const planet2 = solarSystemPlanets.find(planet => planet.name === name2);

  // どちらかの惑星が見つからなかった場合のエラー処理
  if (!planet1 || !planet2) {
    return Response.json(
      { error: "指定された惑星が見つかりませんでした。正しい惑星名を入力してください。" },
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }

  // 比率を計算して小数点第2位までに丸める
  const ratio = (planet2.radiusKm / planet1.radiusKm).toFixed(2);

  const data = {
    radius1: `${planet1.radiusKm} km`,
    radius2: `${planet2.radiusKm} km`,
    ratio: ratio,
    time: new Date().toISOString()
  };

  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
