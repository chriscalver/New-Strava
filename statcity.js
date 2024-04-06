let AccessCode = "";
let Monday = "";
let SinceMonday = "";

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
    //console.log(Monday());

    const sinceMonday = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode} &after=${Monday()}`
    );
    SinceMonday = await sinceMonday.json(); // activities since monday
    console.log(SinceMonday);

    const last30 = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode}`
    );
    let last30Data = await last30.json(); // activities last 30 days
    console.log(last30Data);

    for (var i = 0; i < last30Data.length; i++) {
      console.log(last30Data[i].id);
    }
    for (var i = 0; i < SinceMonday.length; i++) {
      console.log(SinceMonday[i].distance);
    }

    const result = last30Data.filter(checkComments);

    function checkComments(id) {
      return id.comment_count > 0;
    }
    console.log(result);
  }

  getActivities()
    .then((response) => {
      console.log("Athlete info received");
    })
    .catch((error) => {
      console.log("Failed getting Athlete info");
      // console.error(error);
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

Monday = () => {
  var d = new Date();
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  var newdate = new Date(d.setDate(diff));
  var hour = newdate.getHours();
  var mins = newdate.getMinutes();
  var secs = newdate.getSeconds();
  newdate.setHours(0);
  newdate.setMinutes(0);
  newdate.setSeconds(0);
  var myEpoch = newdate.getTime() / 1000.0;
  let MondayStart = myEpoch.toFixed();
  return MondayStart;
};
