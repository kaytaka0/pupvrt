import BugDetector from './src/BugDetector.js';
import fs from 'fs';

// Configuration
const BASE_URL = 'http://localhost:8080';
const SITES = ['site1', 'site2', 'site3', 'site4'];

// Parse arguments
const args = process.argv.slice(2);
const debugMode = args.includes('--debug');

// Logging helper
let logBuffer = '';
function log(message) {
    console.log(message);
    logBuffer += message + '\n';
}

function getTimestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
}

async function run() {
    const detector = new BugDetector(debugMode);
    await detector.init();

    log('# バグ検知レポート');
    log(`実行日時: ${new Date().toLocaleString()}`);
    if (debugMode) log('デバッグモード: ON');
    log('================================\n');

    for (const site of SITES) {
        const url = `${BASE_URL}/${site}/`;
        log(`## スキャン対象: ${url}`);

        try {
            const result = await detector.scan(url);

            log(`\n### ${site} の結果`);
            log(`- **バグ発生確率**: ${(result.bugProbability * 100).toFixed(1)}%`);

            if (result.technicalErrors.length > 0) {
                log('\n#### 技術的なエラー');
                result.technicalErrors.forEach(e => log(`- ${e}`));
            }

            log('\n#### 視覚的分析');
            if (typeof result.visualAnalysis === 'string') {
                log(result.visualAnalysis);
            } else {
                log(JSON.stringify(result.visualAnalysis, null, 2));
            }

            log('\n#### 意味的分析');
            if (typeof result.semanticAnalysis === 'string') {
                log(result.semanticAnalysis);
            } else {
                log(JSON.stringify(result.semanticAnalysis, null, 2));
            }

            log('\n--------------------------------\n');

        } catch (e) {
            console.error(`${site} のスキャン中にエラーが発生しました:`, e);
            logBuffer += `Error scanning ${site}: ${e.message}\n`;
        }
    }

    await detector.close();
    log('スキャン完了。');

    const filename = `BUG_REPORT_${getTimestamp()}.md`;
    fs.writeFileSync(filename, logBuffer);
    console.log(`\n結果をファイルに保存しました: ${filename}`);
}

run();
