import getBestTimeSurfBeach from "../data_manipulation/getBestTimeSurfBeach";
import generateBeachReport from "./specificBeachScrap";

const mockData = [
  {
    "name": "Chapa",
    "data": {
      "today": {
        "tide": {
          "firstLow": {
            "time": "4:02AM",
            "value": "0.43m"
          },
          "firstHigh": {
            "time": "9:14AM",
            "value": "1.25m"
          },
          "secondLow": {
            "time": "4:13PM",
            "value": "0.26m"
          },
          "secondHigh": {
            "time": "9:52PM",
            "value": "1.29m"
          }
        },
        "hourHands": [
          {
            "id": "dawn",
            "status": "success",
            "meters": "0.4-0.6m",
            "activeStars": 1,
            "inactiveStars": 0,
            "averageMeters": "  0.5m  ",
            "period": "  10s  ",
            "swellDirection": "E - 101°",
            "wind": {
              "direction": "Gentle, Offshore NNW - 335°",
              "min": " 16 ",
              "max": "    21  kph "
            }
          },
          {
            "id": "midMorning",
            "status": "success",
            "meters": "0.4-0.6m",
            "activeStars": 1,
            "inactiveStars": 0,
            "averageMeters": "  0.5m  ",
            "period": "  10s  ",
            "swellDirection": "E - 101°",
            "wind": {
              "direction": "Light, Offshore N - 359°",
              "min": " 7 ",
              "max": "    10  kph "
            }
          },
          {
            "id": "noon",
            "status": "success",
            "meters": "0.4-0.7m",
            "activeStars": 1,
            "inactiveStars": 0,
            "averageMeters": "  0.6m  ",
            "period": "  8s  ",
            "swellDirection": "S - 181°",
            "wind": {
              "direction": "Gentle, Cross/Onshore ENE - 79°",
              "min": " 13 ",
              "max": "    14  kph "
            }
          },
          {
            "id": "afternoon",
            "status": "warning",
            "meters": "0.4-0.7m",
            "activeStars": 0,
            "inactiveStars": 1,
            "averageMeters": "  0.6m  ",
            "period": "  8s  ",
            "swellDirection": "S - 188°",
            "wind": {
              "direction": "Fresh, Cross/Onshore ENE - 61°",
              "min": " 28 ",
              "max": "    28  kph "
            }
          },
          {
            "id": "sunset",
            "status": "warning",
            "meters": "0.4-0.6m",
            "activeStars": 0,
            "inactiveStars": 1,
            "averageMeters": "  0.5m  ",
            "period": "  8s  ",
            "swellDirection": "S - 189°",
            "wind": {
              "direction": "Fresh, Cross/Offshore NE - 44°",
              "min": " 28 ",
              "max": "    40  kph "
            }
          }
        ]
      },
      "tomorrow": {
        "tide": {
          "firstLow": {
            "time": "4:02AM",
            "value": "0.43m"
          },
          "firstHigh": {
            "time": "9:14AM",
            "value": "1.25m"
          },
          "secondLow": {
            "time": "4:13PM",
            "value": "0.26m"
          },
          "secondHigh": {
            "time": "9:52PM",
            "value": "1.29m"
          }
        },
        "hourHands": [
          {
            "id": "dawn",
            "status": "success",
            "meters": "0.3-0.5m",
            "activeStars": 0,
            "inactiveStars": 0,
            "averageMeters": "  0.4m  ",
            "period": "  8s  ",
            "swellDirection": "S - 191°",
            "wind": {
              "direction": "Moderate, Offshore N - 5°",
              "min": " 17 ",
              "max": "    27  kph "
            }
          },
          {
            "id": "midMorning",
            "status": "success",
            "meters": "0.3-0.4m",
            "activeStars": 0,
            "inactiveStars": 0,
            "averageMeters": "  0.3m  ",
            "period": "  9s  ",
            "swellDirection": "ESE - 106°",
            "wind": {
              "direction": "Moderate, Offshore NNE - 16°",
              "min": " 18 ",
              "max": "    24  kph "
            }
          },
          {
            "id": "noon",
            "status": "success",
            "meters": "0.3-0.4m",
            "activeStars": 0,
            "inactiveStars": 0,
            "averageMeters": "  0.3m  ",
            "period": "  9s  ",
            "swellDirection": "ESE - 107°",
            "wind": {
              "direction": "Gentle, Cross/Offshore NE - 47°",
              "min": " 17 ",
              "max": "    20  kph "
            }
          },
          {
            "id": "afternoon",
            "status": "warning",
            "meters": "0.3-0.4m",
            "activeStars": 0,
            "inactiveStars": 0,
            "averageMeters": "  0.2m  ",
            "period": "  13s  ",
            "swellDirection": "SSE - 164°",
            "wind": {
              "direction": "Moderate, Cross/Onshore ENE - 60°",
              "min": " 26 ",
              "max": "    26  kph "
            }
          },
          {
            "id": "sunset",
            "status": "warning",
            "meters": "0.3-0.5m",
            "activeStars": 0,
            "inactiveStars": 1,
            "averageMeters": "  0.3m  ",
            "period": "  12s  ",
            "swellDirection": "SSE - 164°",
            "wind": {
              "direction": "Fresh, Cross/Offshore NE - 49°",
              "min": " 27 ",
              "max": "    39  kph "
            }
          }
        ]
      }
    }
  }
]

const beachs = [
  {
    name: "Chapa",
    url: "https://magicseaweed.com/Las-Cuevas-La-Popular-Surf-Report/1159/",
  },
  { name: "Serena", url: "https://magicseaweed.com/Serena-Surf-Report/1287/" },
  {
    name: "Cardiel",
    url: "https://magicseaweed.com/La-Pepita-Surf-Report/2707/",
  },
];
const main = () => {
  // return getBestTimeSurfBeach(mockData); // MOCKING
  return Promise.all(
    beachs.map(async (beach) => {
      const data = await generateBeachReport(beach);
      return { name: beach.name, data};
    })
  ).then((beachsResponse) => {
    return getBestTimeSurfBeach(beachsResponse);
  });
};

export default main;
