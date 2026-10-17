const { solarSystemPlanets } = require('./utils/SolarSystem.js');

export default async (req, context) => {

  let name1 = "地球";
  let name2 = "火星";

  // POSTリクエストの場合、ボディ(JSON)から情報を取得する
  if (req.method === "POST") {
    try {
      const body = await req.json(); // 送られてきたJSONを読み込む
      name1 = body.name1 || "地球";
      name2 = body.name2 || "火星";
    } catch (error) {
      console.error("JSONの読み込みエラー:", error);
    }
  }

  // 対象の惑星のデータを取得
  const planet1 = solarSystemPlanets.find(planet => planet.name === name1);
  const planet2 = solarSystemPlanets.find(planet => planet.name === name2);

  // 返却するデータ
  const data = {
    radius1: `${planet1.radiusKm} km`,
    radius2: `${planet2.radiusKm} km`,
    ratio: `${planet2.radiusKm / planet1.radiusKm}`,
    time: new Date().toISOString()
  };

  // JSON形式でレスポンスを返す
  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
