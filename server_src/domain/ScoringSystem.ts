import Beach, { BeachData } from "./Beach";

const points = {
  Offshore: 3,
  "Cross/Offshore": 2,
  "Cross-shore": 1,
  "Cross/Onshore": -2,
  Onshore: -3,
};

type Score = {
  name: string,
  score: number
}
type ScoreDay = {
  dawn: Score[]
  midMorning: Score[],
  noon: Score[],
  afternoon: Score[],
  sunset: Score[],
}
type DayData = {
  today: ScoreDay
  tomorrow: ScoreDay
}
class ScoringSystem {
  beachs!: Beach[];
  // TODO: ADD TESTS !!!!
  // TODO: DO a siglenton
  bestBeachsByDayHourhand(beachs : Beach[]): DayData {    
    const today = beachs.flatMap( beach => beach.today)
    const tomorrow = beachs.flatMap( beach => beach.tomorrow)
    
    return {
      today: this.calculateFinalScores(today),
      tomorrow: this.calculateFinalScores(tomorrow),
    };
  }

  calculateFinalScores(scores) {
    return scores.reduce((prev, actual) => {

      const prevHourHand = prev[actual.id];

      if (!prevHourHand) {
        return { ...prev, [actual.id]: [{ ...actual }] };
      }

      if (prevHourHand.find((phh) => phh.score === actual.score)) {
        return { ...prev, [actual.id]: [...prev[actual.id], { ...actual }] };
      }
      const lessValueIndex = prevHourHand.findIndex(
        (phh) => phh.score < actual.score
      );
      if (lessValueIndex === -1) {
        return prev;
      }
      // remove item from array
      prev[actual.id].splice(lessValueIndex, 1);
      return { ...prev, [actual.id]: [...prev[actual.id], { ...actual }] };
    }, {});
  }

  caculateScore(beach: BeachData): number {
    const windPower = this.calculateWindPowerScore(beach.wind);
    const windDirectionScore = points[beach.wind.direction] || 0;
    // TODO: use wind type, gentle, light, moderate
    return beach.averageMeters + beach.period + windDirectionScore + windPower;
  }


  calculateWindPowerScore(wind) {
    if (wind.max <= 10) {
      return 2;
    }

    if (wind.max <= 18) {
      return 1;
    }

    return -1;
  }

}

export default new ScoringSystem();
