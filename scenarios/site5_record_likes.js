import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import ffmpeg from 'ffmpeg-static';
import path from 'path';

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const recorder = new PuppeteerScreenRecorder(page, {
        followNewTab: true,
        fps: 25,
        ffmpeg_Path: ffmpeg || 'ffmpeg',
        videoFrame: {
            width: 1280,
            height: 800,
        },
        aspectRatio: '16:9',
    });

    const savePath = path.resolve('likes_recording.mp4');
    await recorder.start(savePath);
    console.log('Recording started...');

    await page.goto('http://localhost:8080/site5/', { waitUntil: 'networkidle2' });
    console.log('Navigated to site5');

    // Find all "Add to favorites" buttons (いいねボタン)
    // Based on snapshot, they are buttons with description "お気に入りに追加"
    const buttons = await page.$$('button[aria-label="お気に入りに追加"]');
    console.log(`Found ${buttons.length} like buttons.`);

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        
        // Scroll to button
        await button.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        await new Promise(r => setTimeout(r, 500)); // wait for scroll

        // Click button
        console.log(`Clicking button ${i + 1}/${buttons.length}...`);
        await button.click();
        
        // Brief wait to see the reaction
        await new Promise(r => setTimeout(r, 300));
    }

    console.log('All buttons clicked. Waiting a bit before finishing...');
    await new Promise(r => setTimeout(r, 2000));

    await recorder.stop();
    console.log(`Recording finished. Saved to ${savePath}`);

    await browser.close();
})();
