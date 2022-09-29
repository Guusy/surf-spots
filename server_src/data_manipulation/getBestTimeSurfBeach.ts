import Beach from '../domain/Beach';
import ScoringSystem from '../domain/ScoringSystem';

const getBestTimeSurfBeach = (beachs: any[]) => {
  const beachObjs: Beach[] = beachs.map(Beach.fromJSON);
  return ScoringSystem.bestBeachsByDayHourhand(beachObjs)
};

export default getBestTimeSurfBeach;
