let AccessCode = "";

async function getAccessTokens() {
  const request = await fetch(
    "https://www.strava.com/oauth/token?client_id=105639&client_secret=7189c307da8243d844c6baa42687e07b6bf2602f&refresh_token=12e9e2963c28b90e2c2da47839f26875c76952f1&grant_type=refresh_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  const response = await request.json();
  AccessCode = response.access_token;
  console.log("Access Code " + AccessCode);

  async function getActivities() {
    const sinceMonday = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode}`
    );
    const last30 = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode}`
    );
    let sinceMondayData = await sinceMonday.json(); // activities since monday
    let last30Data = await last30.json(); // all activities
    console.log(sinceMondayData);
    console.log(last30Data);
  }

  getActivities()
    .then((response) => {
      console.log("Athlete info received");
    })
    .catch((error) => {
      console.log("Failed getting Athlete info");
      console.error(error);
    });
}

getAccessTokens()
  .then((response) => {
    console.log("New ATs Succesful");
  })
  .catch((error) => {
    console.log("Failed getting ATs");
    // console.error(error);
  });
