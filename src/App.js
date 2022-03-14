import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ListRepos from './components/ListRepos';
import suggestions from './suggestions';

function App() {
	const API_BASE = 'https://api.github.com/';
	//const accessToken = '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';

	const [userData, setUserData] = useState({});
	const [userRepos, setUserRepos] = useState([]);
	const [username, setUsername] = useState('junejanean');
	const [isVisible, setIsVisible] = useState(false);
	const [suggestedUsers, setSuggestedUsers] = useState([]);

	useEffect(() => {
		getGitHubUser();
		getGitHubUserRepos();
		setUsername('');
	}, []);

	//API GET function using Axios accesssing github usernames
	const getGitHubUser = async () => {
		const response = await axios.get(`${API_BASE}users/${username}`);
		setUserData(response.data);
	};

	//API GET function using Axios accesssing github usernames' repos
	const getGitHubUserRepos = async () => {
		const response = await axios.get(`${API_BASE}users/${username}/repos`);
		setUserRepos([...response.data]);
	};

	const handleChange = (e) => {
		let userData = e.target.value; //user entered data
		let emptyArray = [];
		emptyArray = suggestions.filter((data) => {
			// filtering array value and user char to lowercase and return only the value
			//which starts with user entered word.
			return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
		});

		setUsername(e.target.value); //grab user from search field
		setSuggestedUsers(emptyArray); // empty array after
	};

	// submit event to grab username and repo, show user info div and hide suggestedUsers array
	const handleSubmit = (e) => {
		e.preventDefault();
		getGitHubUser();
		getGitHubUserRepos();
		setIsVisible(true);
		setSuggestedUsers([]);
		setUsername('');
	};

	// using 'Enter' key as submit, pass handleSubmit()
	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	// select suggestion in autocomplete box
	const handleSelect = (e) => {
		setUsername(e.currentTarget.dataset.id);
		setSuggestedUsers([]);
	};

	return (
		<>
			<div className='wrapper'>
				<div className='search-input'>
					<form onSubmit={handleSubmit} action='submit' id='form'>
						<a href='#' target='_blank' hidden></a>
						<input
							onChange={handleChange}
							type='text'
							placeholder='find a github user'
							id='search'
							required
							autoComplete='off'
							value={username}
							onKeyDown={handleEnter}
						/>
						<button type='submit' className='icon'>
							<i className='fa fa-search'></i>
						</button>
					</form>
					<div className='autocom-box'>
						{suggestedUsers.length > 0 &&
							suggestedUsers.map((data, index) => {
								return (
									<li onClick={handleSelect} key={index} data-id={data}>
										<div>{data}</div>
									</li>
								);
							})}
					</div>
				</div>
			</div>
			<div id='main' className={`${!isVisible ? '' : 'active'}`}>
				<div className='card'>
					<div>
						<a href={userData.html_url} target='_blank'>
							<img className='avatar' src={userData.avatar_url} />
						</a>
					</div>
					<div className='user-info'>
						<h2>{userData.name}</h2>
						<h5>{userData.login}</h5>
						<p>{userData.bio}</p>
						<ul className='info'>
							<li>Followers: {userData.followers}</li>
							<li>Following: {userData.following}</li>
							<li>Repos: {userData.public_repos}</li>
							<li>Location: {userData.location}</li>
						</ul>
						<div id='repos'>
							{userRepos.map((repos, index) => {
								return (
									<ListRepos
										key={index}
										name={repos.name}
										url={repos.html_url}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
