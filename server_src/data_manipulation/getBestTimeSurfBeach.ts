import Beach from '../domain/Beach';
import ScoringSystem from '../domain/ScoringSystem';

const getBestTimeSurfBeach = (beachs: {name:string, data:any}[]) => {
  const beachObjs: Beach[] = beachs.map(Beach.fromJSON);
  return ScoringSystem.bestBeachsByDayHourhand(beachObjs)
};

export default getBestTimeSurfBeach;
