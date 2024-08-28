#!/usr/bin/env node

const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: github-activity <username>')
  .demandCommand(1)
  .argv;

const username = argv._[0];

const fetchGitHubActivity = async(username) => {
    const url = `https://api.github.com/users/${username}/events`;
    try {
        const response = await axios.get(url);
        const events = response.data;

        if(events.length === 0){
            console.log(`No recent activity found for user ${username}`)
            return;
        }

        console.log(`Recent Activity for ${username}:`);
        
        events.slice(0, 10).forEach((event) => { 
            const eventType = event.type;
            const repoName = event.repo.name;
            console.log(`- ${eventType} in ${repoName}`);
          })
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`User '${username}' not found.`);
          } else {
            console.error('An error occurred:', error.message);
          }
    }
}


fetchGitHubActivity(username);