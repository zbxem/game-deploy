const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

exports.handler = async () => {
    try {
        // 检查文件是否存在
        if (!fs.existsSync(dbPath)) {
            return {
                statusCode: 200,
                body: JSON.stringify([]) // 返回空数组
            };
        }

        // 读取并解析 JSON
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        
        // 确保 rankings 是数组，并处理空数组情况
        const rankings = Array.isArray(data.rankings) 
            ? data.rankings.sort((a, b) => b.score - a.score).slice(0, 20) 
            : [];

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