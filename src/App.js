import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ListRepos from './components/ListRepos';
import suggestions from './suggestions';

const API_BASE = 'https://api.github.com/';

function App() {
	const [userData, setUserData] = useState({});
	const [userRepos, setUserRepos] = useState([]);
	const [username, setUsername] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [suggestedUsers, setSuggestedUsers] = useState([]);

	useEffect(() => {
		getGitHubUser();
		getRepos();
	}, []);

	const getGitHubUser = async () => {
		const response = await axios.get(`${API_BASE}users/${username}`);
		setUserData(response.data);
	};

	const getRepos = async () => {
		const response = await axios.get(`${API_BASE}users/${username}/repos`);
		setUserRepos([...response.data]);
	};

	const handleChange = (e) => {
		setUsername(e.target.value);

		let userData = e.target.value; //user entered data
		let emptyArray = [];
		// if (userData) {
		emptyArray = suggestions.filter((data) => {
			// filtering array value and user char to lowercase and return only the value
			//which starts with user entered word.
			return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
		});
		setSuggestedUsers(emptyArray);
		console.log(suggestedUsers);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		getGitHubUser();
		getRepos();
		setIsVisible(!isVisible);
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			getGitHubUser();
			getRepos();
			setIsVisible(!isVisible);
		}
	};

	// select suggestion in autocomplete box
	const handleSelect = (e) => {
		let selectUserData = e.currentTarget.dataset.id;
		setUsername(e.currentTarget.dataset.id);
		setSuggestedUsers([]);
	};

	return (
		<>
			<div className='wrapper'>
				<div className='search-input'>
					<form onSubmit={handleSubmit} action='submit' id='form'>
						<a href='' target='_blank' hidden></a>
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
						{/* <!-- auto suggestions inserted from javascript --> */}
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
