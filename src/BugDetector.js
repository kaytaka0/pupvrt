import puppeteer from 'puppeteer';
import LLMClient from './LLMClient.js';

class BugDetector {
    constructor(debug = false) {
        this.llmClient = new LLMClient();
        this.browser = null;
        this.debug = debug;
    }

    logDebug(message, data = null) {
        if (this.debug) {
            console.log(`[DEBUG] ${message}`);
            if (data) {
                console.log(JSON.stringify(data, null, 2));
            }
        }
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async scan(url) {
        if (!this.browser) await this.init();

        this.logDebug(`Scanning URL: ${url}`);

        const page = await this.browser.newPage();
        const errors = [];
        const networkErrors = [];

        // 1. Technical Error Detection (Console & Network)
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text();
                errors.push(`Console Error: ${text}`);
                this.logDebug(`Console Error detected: ${text}`);
            }
        });

        page.on('response', response => {
            if (!response.ok()) {
                const errorMsg = `Network Error: ${response.status()} ${response.url()}`;
                networkErrors.push(errorMsg);
                this.logDebug(errorMsg);
            }
        });

        try {
            await page.goto(url, { waitUntil: 'networkidle0' });
        } catch (e) {
            return { error: `Failed to load page: ${e.message}` };
        }

        // 2. Capture State
        const screenshotBuffer = await page.screenshot({ fullPage: true, encoding: 'base64' });
        const bodyText = await page.evaluate(() => document.body.innerText);

        this.logDebug('State captured. Screenshot size: ' + screenshotBuffer.length + ' bytes');

        // 3. AI Analysis
        const visualAnalysis = await this.detectVisualBugs(screenshotBuffer);
        this.logDebug('Visual Analysis Result:', visualAnalysis);

        const semanticAnalysis = await this.detectSemanticBugs(bodyText);
        this.logDebug('Semantic Analysis Result:', semanticAnalysis);

        await page.close();

        return {
            url,
            technicalErrors: [...errors, ...networkErrors],
            visualAnalysis,
            semanticAnalysis,
            bugProbability: this.calculateBugProbability(errors, networkErrors, visualAnalysis, semanticAnalysis)
        };
    }

    async detectVisualBugs(screenshotBase64) {
        const prompt = `
        このWebページのスクリーンショットを分析し、視覚的な不具合（バグ）を見つけてください。
        以下の点に注目してください：
        1. レイアウトの崩れ（重なり、ズレなど）。
        2. 画像の欠落や壊れたアイコン。
        3. テキストが見切れている、または読み取れない。
        4. 明らかに間違いと思われるスタイル（フォント、色）の不統一。
        
        以下の形式のJSONで回答してください：
        - "hasVisualBugs": boolean (不具合がある場合はtrue)
        - "description": string (見つかった不具合の簡潔な説明。日本語で記述してください)
        - "confidence": number (確信度 0-1)
        `;

        try {
            const response = await this.llmClient.generateContent(prompt, screenshotBase64);
            return response;
        } catch (e) {
            this.logDebug('Visual analysis failed', e);
            return { error: `Visual analysis failed: ${e.message}` };
        }
    }

    async detectSemanticBugs(text) {
        const prompt = `
        このWebページのテキストコンテンツを分析し、意味的または論理的な不具合（バグ）を見つけてください。
        以下の点に注目してください：
        1. プレースホルダーテキスト（Lorem Ipsum、「ここにテキストを入力」など）。
        2. 矛盾する情報（例：「送料無料」とあるのに「送料：1000円」と記載されている）。
        3. 明らかなデータの誤り（例：Tシャツの価格が100万円）。
        4. 信頼性を損なう文法的な誤り。

        ページテキスト:
        ${text.substring(0, 2000)}... (truncated)

        以下の形式のJSONで回答してください：
        - "hasSemanticBugs": boolean (不具合がある場合はtrue)
        - "description": string (見つかった不具合の簡潔な説明。日本語で記述してください)
        - "confidence": number (確信度 0-1)
        `;

        try {
            const response = await this.llmClient.generateContent(prompt);
            return response;
        } catch (e) {
            this.logDebug('Semantic analysis failed', e);
            return { error: `Semantic analysis failed: ${e.message}` };
        }
    }

    calculateBugProbability(techErrors, netErrors, visual, semantic) {
        let score = 0;

        if (techErrors.length > 0) score += 0.8;
        if (netErrors.length > 0) score += 0.8;

        // Naive parsing of LLM string response if it's not pure JSON
        // Ideally we'd parse the JSON object.
        if (visual && typeof visual === 'string' && visual.toLowerCase().includes('"hasvisualbugs": true')) score += 0.7;
        if (semantic && typeof semantic === 'string' && semantic.toLowerCase().includes('"hassemanticbugs": true')) score += 0.6;

        return Math.min(score, 1.0);
    }
}

export default BugDetector;
