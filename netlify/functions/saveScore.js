const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

exports.handler = async (event) => {
    try {
        const { player, score, time } = JSON.parse(event.body);
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        data.rankings.push({ player, score, time });
        data.rankings.sort((a, b) => b.score - a.score);
        data.rankings = data.rankings.slice(0, 20);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: '成绩已保存！' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};