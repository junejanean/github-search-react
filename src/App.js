import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const API_BASE = "https://api.github.com/";


function App() {
  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  

  useEffect(() => {
    getGitHubUser();
    getRepos();
    //addReposToCard();
  }, []);

  const getGitHubUser = async () => {
    const response = await axios.get(API_BASE + "users/" + "junejanean");
    setUserData(response.data);
  };

  
  let repoList=[];

  const getRepos = async () => {
    const response = await axios.get(API_BASE + "users/" + "junejanean" + "/repos");
    setUserRepos(repos => {
      response.data.forEach((repos, index) => {
        console.log(repos.name);
        repoList.push(<a key={repos.index}>{repos.name}</a>)
    })
  }
      //console.log(repoList);
      //console.log(response.data);
    )};

  
//  // const addReposToCard = (repos) => {
//     const reposElement = document.getElementById("repos");
//     repos.forEach((repo) => {
//         console.log(repo);
//         const repoEl = document.createElement("a");
//         repoEl.classList.add("repo");
//         repoEl.href = repo.html_url;
//         repoEl.target = "_blank";
//         repoEl.innerText = repo.name;
//         reposElement.appendChild(repoEl);
//     })
//  // }


// let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];


//   repos.forEach((repo, index) => {
//   repoList.push( <a key={index}>{userRepos.name}</a>)
//   });

  return (
<>
<div className="wrapper">
        <div className="search-input">
         <form action="submit" id="form">
          <a href="" target="_blank" hidden></a>
          <input type="text" placeholder="find a github user" id="search" required autoComplete="off"/>
          <button type="submit" className="icon"><i className="fa fa-search"></i></button>
        </form>
          <div className="autocom-box">
            {/* <!-- auto suggestions inserted from javascript --> */}
          </div> 
        </div>
      </div>
      <div id="main">

      <div className="card">
             <div>
                <a href={userData.html_url} target="_blank"><img className="avatar" src={userData.avatar_url} /></a>
           </div>
             <div className="user-info">
                  <h2>{userData.name}</h2>
                  <h5>{userData.login}</h5>
                  <p>{userData.bio}</p>
                  <ul className="info">
                     <li>Followers: {userData.followers}</li>
                     <li>Following: {userData.following}</li>
                     <li>Repos: {userData.public_repos}</li>
                     <li>Location: {userData.location}</li>
                     <li>Twitter: <a href={`https://twitter.com/${userData.twitter_username}`} target='_blank'> @{userData.twitter_username}</a></li>
                  </ul>
                  <div id="repos">
                <div>   
                {/* {repoList} */}
               {repoList.forEach((repos, index) => {
                  <repoList
                    key={userRepos.index}
                    name={userRepos.name}
                  />
               })}  
               </div>
            </div>
             </div>
         </div>

      </div>
    </>
  );
}

export default App;
