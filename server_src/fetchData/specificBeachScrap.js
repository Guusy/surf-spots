let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}


// TODO: get tides
const generateBeachReport = async ( browser, beach) => {
  console.log(`Generando reporte de la playa ${beach.name}...`);
 
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
  });
  page.setDefaultNavigationTimeout(9000000);
  await page.goto(beach.url);
  const data = await page.evaluate(() => {
    // functions
    const getDataOfDayMoment = (dayMoment, name) => {
      try {
        const meters = dayMoment.querySelector(
          ".table-forecast-breaking-wave > span"
        ).textContent;
        const activeStars = dayMoment.querySelectorAll(".active").length;
        const inactiveStars = dayMoment.querySelectorAll(".inactive").length;
        const [, , , averageMetersElement, periodElement] =
          dayMoment.querySelectorAll("td");
        const [, swellDirectionElement] =
          dayMoment.querySelectorAll(".msw-js-tooltip");
        const [minWindElement, maxWindElement] = dayMoment.querySelectorAll(
          ".table-forecast-wind > .stacked-text"
        );
        const windDirectionElement = dayMoment.querySelector(".last");
        const averageMeters =
          averageMetersElement.querySelector("h4").textContent;
        const period = periodElement.querySelector("h4").textContent;

        // TODO: get tide

        let status;
        if (dayMoment.querySelector(".background-success")) {
          status = "success";
        }
        if (dayMoment.querySelector(".background-warning")) {
          status = "warning";
        }
        if (dayMoment.querySelector(".background-danger")) {
          status = "danger";
        }

        const swellDirection = swellDirectionElement.getAttribute(
          "data-original-title"
        );
        return {
          id: name,
          status,
          meters,
          activeStars,
          inactiveStars,
          averageMeters,
          period,
          swellDirection,
          wind: {
            direction: windDirectionElement.getAttribute("data-original-title"),
            min: minWindElement.textContent,
            max: maxWindElement.textContent,
          },
        };
      } catch (error) {
        console.log("el error", error);
        throw error;
      }
    };
    const buildResponse = (container) => {
      const [, , , dawn, midMorning, noon, afternoon, sunset] =
        container.querySelectorAll("tr");
      return [
        getDataOfDayMoment(dawn, "dawn"),
        getDataOfDayMoment(midMorning, "midMorning"),
        getDataOfDayMoment(noon, "noon"),
        getDataOfDayMoment(afternoon, "afternoon"),
        getDataOfDayMoment(sunset, "sunset"),
      ];
    };
    const getTide = (container) => {
      const [tide] = container.querySelectorAll(".table-tide");
      // TODO: get times
      const [firstLow, firstHigh, secondLow, secondHigh] =
        tide.querySelectorAll("tr");
      const [, firstLowTime, firstLowValue] = firstLow.querySelectorAll("td");
      const [, firstHighTime, firstHighValue] =
        firstHigh.querySelectorAll("td");
      const [, secondLowTime, secondLowValue] =
        secondLow.querySelectorAll("td");
      const [, secondHighime, secondHighValue] =
        secondHigh.querySelectorAll("td");
      return {
        firstLow: { time: firstLowTime.innerText, value: firstLowValue.innerText },
        firstHigh: { time: firstHighTime.innerText, value: firstHighValue.innerText },
        secondLow: { time: secondLowTime.innerText, value: secondLowValue.innerText },
        secondHigh: { time: secondHighime.innerText, value: secondHighValue.innerText },
      };
    };
    // end functions

    const [todayForecast, tomorrowForecast] = document.querySelectorAll(
      ".table-forecast > tbody"
    );
    const [todayTideContainer, tomorrowTideContainer] =
      document.querySelectorAll(".msw-tide-tables");
    const todayTide = getTide(todayTideContainer);
    const tomorrowTide = getTide(todayTideContainer);
    return {
      today: { tide: todayTide, hourHands: buildResponse(todayForecast) },
      tomorrow: {
        tide: tomorrowTide,
        hourHands: buildResponse(tomorrowForecast),
      },
    };
  });

  await browser.close();
  return data;
};

generateBeachReport({
  name: "Cardiel",
  url: "https://magicseaweed.com/La-Pepita-Surf-Report/2707/",
});
module.exports = generateBeachReport;
