import axios from 'axios';
import Contest from '../models/contest.model.js';

const fetchContests = async () => {
    try {
        let contests = [];

        // Fetching Codeforces contests
        const cfRes = await axios.get('https://codeforces.com/api/contest.list');
        const cfContests = cfRes.data.result.filter((contest) => contest.phase === 'BEFORE').map((contest) => ({
            name: contest.name,
            platform: 'Codeforces',
            date: new Date(contest.startTimeSeconds * 1000),
            url: `https://codeforces.com/contest/${contest.id}`,
            isPast: false
        }));

        contests = contests.concat(cfContests);

        // Fetching Codechef contests
        // const ccRes = await axios.get('https://www.kontests.net/api/v1/code_chef');
        // const ccContests = ccRes.data.map((contest) => ({
        //     name: contest.name,
        //     platform: 'Codechef',
        //     date: new Date(contest.start_time),
        //     url: contest.url,
        //     isPast: false
        // }));

        // contests = contests.concat(ccContests);

        // // Fetching Leetcode contests
        // const lcRes = await axios.get('https://www.kontests.net/api/v1/leet_code');
        // const lcContests = lcRes.data.map((contest) => ({
        //     name: contest.name,
        //     platform: 'Leetcode',
        //     date: new Date(contest.start_time),
        //     url: contest.url,
        //     isPast: false
        // }));

        // contests = contests.concat(lcContests);

        // Clear previous contests and insert new ones
        await Contest.deleteMany({});
        await Contest.insertMany(contests);

        console.log('Contests updated successfully');
    } catch (error) {
        console.error(`Error fetching contests: ${error.message}`);
    }
}

export default fetchContests;