import ScoringSystem from "./ScoringSystem";

const roundOneDecimal = (value: number) => Math.round(value * 10) / 10;

const metersCastToNumber = (metersString :string, units: string) => {
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

export type Tides = {
  firstLow: number;
  firstHigh: number;
  secondLow: number;
  secondHigh: number;
};
export type HourHandBeach = {
  id: string;
  name: string;
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

export type DayBeachData = { tides: Tides; hourHands: HourHandBeach[] };
export const beachs = [
  {
    name: "Cardiel",
    url: "https://magicseaweed.com/La-Pepita-Surf-Report/2707/",
  },
  {
    name: "Biologia",
    url: "https://magicseaweed.com/Biologia-Surf-Report/2704/",
  },
  {
    name: "Waikiki",
    url: "https://magicseaweed.com/Waikiki-Mar-del-Plata-Surf-Report/2708/",
  },
  {
    name: "Mariano",
    url: "https://magicseaweed.com/Mariano-Surf-Report/2709/",
  },
  { name: "Serena", url: "https://magicseaweed.com/Serena-Surf-Report/1287/" },
  {
    name: "Chapa",
    url: "https://magicseaweed.com/Las-Cuevas-La-Popular-Surf-Report/1159/",
  },
];

const castToNumber = (aString: string) => {
  return Number.parseInt(aString, 10);
};

const castToFloat = (aString: string) => {
  return Number.parseFloat(aString);
};
const removeString = (aString: string, stringToRemove: string) => {
  return aString.replace(stringToRemove, "");
};
class Beach {
  name!: string;
  today!: DayBeachData;
  tomorrow!: DayBeachData;

  static normalizeData = (
    data: { tide: any; hourHands: any[] },
    beachName: string
  ): DayBeachData => {
    const { tide, hourHands } = data;

    //Add type
    const hourHandsMapped = hourHands.map((momentOfDay: any) => {
      const units = momentOfDay.meters.includes("ft") ? "ft" : "m";
      const newMomentOfDay = { ...momentOfDay };
      const avgMeterCalculation = metersCastToNumber(
        newMomentOfDay.averageMeters,
        units
      );
      const [type, windString] = newMomentOfDay.wind.direction.split(",");
      const [, windDirection] = windString.split(" ");
      newMomentOfDay.wind = {
        type,
        direction: windDirection,
        min: castToNumber(newMomentOfDay.wind.min),
        max: castToNumber(
          removeString(removeString(newMomentOfDay.wind.max, "mph"), "kph")
        ),
      };

      newMomentOfDay.period = castToNumber(newMomentOfDay.period.split("s")[0]);
      newMomentOfDay.meters = metersCastToNumber(newMomentOfDay.meters, units);
      newMomentOfDay.averageMeters = avgMeterCalculation.from;
      newMomentOfDay.score = ScoringSystem.caculateScore(newMomentOfDay);
      newMomentOfDay.name = beachName;
      return {
        ...newMomentOfDay,
      };
    });

    return {
      tides: tide,
      hourHands: hourHandsMapped,
    };
  };
  static fromJSON(json: { name: string; data: { today: any; tomorrow: any } }) {
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
