const ModeDiv = document.querySelector('.dark-mode');
const mode = document.querySelector('[data-mode]');
const modeIcon = document.querySelector('[data-modeIcon]');
const xmark  = document.querySelector('[data-xmark]');
const profilePic = document.querySelector('[data-profile]');
const username = document.querySelector('[data-name]');
const joined = document.querySelector('[data-joined]');
const github = document.querySelector('[data-github]');
const desc = document.querySelector('[data-desc]');
const repoCount = document.querySelector('[data-repoCount]');
const followingCount = document.querySelector('[data-followingCount]');
const followerCount = document.querySelector('[data-followersCount]');
const loc = document.querySelector('[data-location]');
const bioLink = document.querySelector('[data-bio]');
const twitter = document.querySelector('[data-twitter]');
const org = document.querySelector('[data-org]');
const searchBtn = document.querySelector('.search-btn');
const inpElement = document.querySelector('.inp');
const wrapper = document.querySelector('.wrapper');
const searchBar = document.querySelector('.search-bar');
const content = document.querySelector('.content');
const userDetails = document.querySelector('.user-details');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var modeCheck = "true";
var crossEnabled = false;
searchBtn.addEventListener('click', fetchData);
inpElement.addEventListener('keydown', enableCross);
xmark.addEventListener('click', removeValue);
ModeDiv.addEventListener('click', modeChange);
inpElement.addEventListener('input', (e) => {
   
    xmark.classList.remove('disable-cross');
    //console.log('hey');
});


async function fetchData()
{
    //console.log('inside fetchdata');
    const inpValue = inpElement.value;

    try{
        const res = await fetch(`https://api.github.com/users/${inpValue}`);
       
        if(!res.ok)
           throw new Error('some error is there');

           var data = await res.json();
           //console.log('Response', data);
           renderUI(data);   
    }
    catch(e)
    {
        //console.log(e);
        inpElement.classList.add('animation');

    }

}

function check(value)
{
    if(value === '' || value === null)
      return 'Not_Available';

    else
      return value;
}

function link(value)
{
    if(value === '' || value === null)
      return '#';

    else
     return value;
}

function renderUI(data)
{
    //console.log('inside render');
    profilePic.src = data?.avatar_url;
    username.textContent = data?.name;
    //joined.innerHTML = "Joined  "+ getDate(data?.created_at);
    var datesegments = data?.created_at.split('T').shift().split('-');
    joined.innerHTML = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    github.textContent = '@' + data?.login;
    github.href = `https://github.com/${data?.login}`;
    desc.textContent = data?.bio;
    repoCount.innerHTML = data?.public_repos;
    followerCount.innerHTML = data?.followers;
    followingCount.innerHTML = data?.following;

    bioLink.textContent = check(data?.blog);

    var bioAddress = link(data?.blog);
    bioLink.href = bioAddress === '#' ? '#' : `https://${bioAddress}`;
    
    // var bioText = data?.blog;
    // if(bioText === '')
    //  {
    //     bioLink.textContent = 'Not_Available';
    //     bioLink.href = '#';
    //  }
    // else
    //   {
    //     bioLink.textContent = bioText;
    //     bioLink.href = `https://${bioText}`;
    //   }

    loc.textContent = check(data?.location);

    // var locationDetail = data?.location;
    // if(locationDetail === null)
    //    loc.textContent = 'Not_Available';
    // else
    //   loc.textContent = locationDetail;
    
    twitter.innerHTML = check(data?.twitter_username);

    var twitterDetails = link(data?.twitter_username);
    twitter.href = twitterDetails === '#'? '#' : `https://twitter.com/${twitterDetails}`;

    // if(twitterDetails === null)
    //    twitter.innerHTML = 'Not_Available';
    // else
    // {
    //     twitter.href  = `https://twitter.com/${data?.twitter_username}`;
    //     twitter.textContent = twitterDetails;
    // }

    org.textContent = check(data?.company);

    // var organization = data?.company;
    // if(organization === null)
    //    org.textContent = 'Not_Available';
    // else
    //   org.textContent = organization;
}


function enableCross(e)
{
    //console.log('keydown');

    //console.log('size' , e.target.value.length, 'and value is -> ' , e.target.value);
    
  //  if(e.target.value.length >= 0)
  //  {
  //    xmark.classList.remove('disable-cross');  
  //    if(e.key === 'Enter')  
  //      fetchData();
  //  }

  inpElement.classList.remove('animation');

  if(e.key === 'Enter' && e.target.value !== '')
    fetchData();

  if(e.key === 'Backspace' && e.target.value === '')
  {
    xmark.classList.add('disable-cross');
    // inpElement.classList.remove('animation');
  }
    

  //  else if(e.key === 'Backspace' && e.target.value.length == 1)
  //     xmark.classList.add('disable-cross');

  //  else if(e.key === 'Backspace' && e.target.value.length <= 1)
  //   {
  //     xmark.classList.add('disable-cross');
  //     // inpElement.classList.remove('animation');
  //   }
}

function removeValue(e)
{
    inpElement.value = '';
    inpElement.classList.remove('animation');
    xmark.classList.add('disable-cross');
}

function modeChange()
{
    //console.log('fun ke andar - > ' , modeCheck);

    if(modeCheck === "true")
    {
       //console.log('inside if statement');

        mode.textContent  = 'Light';
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.remove('fa-solid');
        modeIcon.classList.add('fa-lightbulb');
        modeIcon.classList.add('fa-regular');

        wrapper.classList.remove('darkBlue');
        searchBar.classList.remove('lightBlue');
        content.classList.remove('lightBlue');
        userDetails.classList.remove('darkBlue');


        localStorage.setItem("dark-mode", modeCheck);

        modeCheck = "false";
 
    }

    else 
    {
      //console.log('inside else statement');

      mode.textContent  = 'Dark';
      modeIcon.classList.remove('fa-lightbulb');
      modeIcon.classList.remove('fa-regular');
      modeIcon.classList.add('fa-moon');
      modeIcon.classList.add('fa-solid');

        wrapper.classList.add('darkBlue');
        searchBar.classList.add('lightBlue');
        content.classList.add('lightBlue');
        userDetails.classList.add('darkBlue');

        localStorage.setItem("dark-mode", modeCheck);

        modeCheck = "true";
  
    }
}


function init()
{
    inpElement.value = 'kratarthKhare';
    fetchData();
    removeValue();

    const value = localStorage.getItem("dark-mode");

    if(value === null) {
      //console.log("null k andar");
      localStorage.setItem("dark-mode", modeCheck);
      modeChange();
    }
    else if(value === "true") {
      //console.log("truer k andar");
      modeChange();
    }
    else if(value === "false") {
      //console.log("false k andar");
      modeCheck = "false";
      modeChange();
    }

    
}

init();