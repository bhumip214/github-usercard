/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cardsElement = document.querySelector(".cards");

function fetchGithubProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`);
}

function renderGithubProfile(data) {
  const cardElement = githubUserComponent(data);
  cardsElement.appendChild(cardElement);
}

async function main() {
  try {
    const res = await fetchGithubProfile("bhumip214");
    console.log(res.data);
    renderGithubProfile(res.data);

    const followerRes = await axios.get(res.data.followers_url);
    console.log(followerRes);
    showFollowers(followerRes.data);
  } catch (error) {
    console.log("Error:", error);
  }
}

main();

// fetchGithubProfile("bhumip214")
//   .then(response => {
//     console.log(response.data);
//     renderGithubProfile(response.data);
//     return axios.get(response.data.followers_url);
//   })
//   .then(res => {
//     showFollowers(res.data);
//     console.log(res.data);
//   })

//   .catch(err => {
//     console.log("Error:", err);
//   });

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

async function showFollowers(followers) {
  try {
    // Promise<GitHubUsers[]>
    const followerPromises = followers.map(follower => {
      return fetchGithubProfile(follower.login);
    });

    const res = await Promise.all(followerPromises);
    res.map(followerResponse => {
      renderGithubProfile(followerResponse.data);
    });
  } catch (error) {
    console.log("Error:", error);
  }

  // const followersArray = [
  //   "tetondan",
  //   "dustinmyers",
  //   "justsml",
  //   "luishrd",
  //   "bigknell"
  // ];

  // // Promise<GitHubUsers[]>
  // const followerPromises = followersArray.map(follower => {
  //   return fetchGithubProfile(follower);
  // });

  // Promise.all(followerPromises)
  //   .then(res => {
  //     res.map(followerResponse => {
  //       renderGithubProfile(followerResponse.data);
  //     });
  //   })
  //   .catch(err => {
  //     console.error("Error:", err);
  //   });
}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubUserComponent(obj) {
  let mainDiv = createElement("div", "card");

  let img = createElement("img", "", mainDiv);
  img.src = obj.avatar_url;

  let cardInfo = createElement("div", "card-info", mainDiv);

  let name = createElement("h3", "name", cardInfo);
  name.textContent = obj.name;

  let username = createElement("p", "username", cardInfo);
  username.textContent = obj.login;

  let location = createElement("p", "", cardInfo);
  location.textContent = "Location:" + " " + obj.location;

  let profile = createElement("p", "", cardInfo);

  let anchor = createElement("a", "", profile);
  anchor.href = obj.html_url;
  anchor.textContent = obj.html_url;

  let followers = createElement("p", "", cardInfo);
  followers.textContent = "Followers:" + " " + obj.followers;

  let following = createElement("p", "", cardInfo);
  following.textContent = "Following:" + " " + obj.following;

  let bio = createElement("p", "", cardInfo);
  bio.textContent = "Bio:" + " " + obj.bio;

  return mainDiv;
}

function createElement(type, className, parent) {
  const el = document.createElement(type);
  if (className) {
    el.classList.add(className);
  }
  if (parent) {
    parent.appendChild(el);
  }

  return el;
}
