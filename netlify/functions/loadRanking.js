const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

exports.handler = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const rankings = data.rankings.sort((a, b) => b.score - a.score).slice(0, 20);
        return {
            statusCode: 200,
            body: JSON.stringify(rankings)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};