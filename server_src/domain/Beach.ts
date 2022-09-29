import ScoringSystem from "./ScoringSystem";

const roundOneDecimal = (value) => Math.round(value * 10) / 10;

const metersCastToNumber = (metersString, units) => {
  const [minMeter, maxMeter] = metersString.split("-");
  let from = Number.parseFloat(minMeter);
  let to = maxMeter ? Number.parseFloat(maxMeter.replace(units, "")) : 0;

  if (units !== "m") {
    from /= 3.2;
    to /= 3.2;
  }
  return {
    from: roundOneDecimal(from),
    to: roundOneDecimal(to),
  };
};
export type BeachData = {
  id: string;
  name: string
  status: string;
  meters: { from: number; to: number };
  activeStars: number;
  inactiveStars: number;
  averageMeters: number;
  period: number;
  swellDirection: string;
  wind: { direction: string; min: number; max: number };
  score: number;
};
class Beach {
  name!: string;
  today!: BeachData[];
  tomorrow!: BeachData[];

  static normalizeData = (data: any[], beachName: string): BeachData[] => {
    //Add type
    return data.map((momentOfDay: any) => {
      const units = momentOfDay.meters.includes("ft") ? "ft" : "m";
      const newMomentOfDay: BeachData = { ...momentOfDay };
      const avgMeterCalculation = metersCastToNumber(
        newMomentOfDay.averageMeters,
        units
      );
      const [, windString] = newMomentOfDay.wind.direction.split(",");
      const [, windType] = windString.split(" ");
      newMomentOfDay.wind = {
        direction: windType,
        min: Number.parseInt(newMomentOfDay.wind.min, 10),
        max: Number.parseInt(
          newMomentOfDay.wind.max.replace("mph", "").replace("kph", ""),
          10
        ),
      };

      newMomentOfDay.period = Number.parseInt(
        newMomentOfDay.period.split("s")[0],
        10
      );
      newMomentOfDay.meters = metersCastToNumber(newMomentOfDay.meters, units);
      newMomentOfDay.averageMeters = avgMeterCalculation.from;
      newMomentOfDay.score = ScoringSystem.caculateScore(newMomentOfDay);
      newMomentOfDay.name = beachName
      return {
        ...newMomentOfDay,
      };
    });
  };
  static fromJSON(json: { name: string; data: { today: any; tomorrow: any } }) {
    console.log(JSON.stringify(json));

    const { name, data } = json;
    const normalizeData = {
      name,
      today: Beach.normalizeData(data.today, name),
      tomorrow: Beach.normalizeData(data.tomorrow, name),
    };
    return Object.assign(new Beach(), normalizeData);
  }
}

export default Beach;
