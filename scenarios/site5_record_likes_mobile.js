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
    
    // Set viewport to a mobile size (iPhone X: 375x812)
    await page.setViewport({ 
        width: 375, 
        height: 812,
        isMobile: true,
        hasTouch: true
    });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/04.1');

    const recorder = new PuppeteerScreenRecorder(page, {
        followNewTab: true,
        fps: 25,
        ffmpeg_Path: ffmpeg || 'ffmpeg',
        videoFrame: {
            width: 375,
            height: 812,
        },
        aspectRatio: '9:19',
    });

    const savePath = path.resolve('likes_recording_mobile.mp4');
    await recorder.start(savePath);
    console.log('Mobile Recording started...');

    await page.goto('http://localhost:8080/site5/', { waitUntil: 'networkidle2' });
    console.log('Navigated to site5 (Mobile)');

    // Inject visual feedback for clicks
    await page.evaluateOnNewDocument(() => {
        document.addEventListener('mousedown', (e) => {
            const circle = document.createElement('div');
            circle.style.position = 'fixed';
            circle.style.width = '40px';
            circle.style.height = '40px';
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            circle.style.left = `${e.clientX - 20}px`;
            circle.style.top = `${e.clientY - 20}px`;
            circle.style.pointerEvents = 'none';
            circle.style.zIndex = '9999';
            circle.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(circle);
            
            setTimeout(() => {
                circle.style.transform = 'scale(2)';
                circle.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                document.body.removeChild(circle);
            }, 600);
        }, true);
    });

    // Re-navigation to ensure script injection if needed, but evaluateOnNewDocument works on current page too if injected before goto.
    // However, for immediate effect on the current page:
    await page.evaluate(() => {
        document.addEventListener('mousedown', (e) => {
            const circle = document.createElement('div');
            circle.style.position = 'fixed';
            circle.style.width = '40px';
            circle.style.height = '40px';
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            circle.style.left = `${e.clientX - 20}px`;
            circle.style.top = `${e.clientY - 20}px`;
            circle.style.pointerEvents = 'none';
            circle.style.zIndex = '9999';
            circle.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(circle);
            
            setTimeout(() => {
                circle.style.transform = 'scale(2)';
                circle.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                document.body.removeChild(circle);
            }, 600);
        }, true);
    });

    // Find all "Add to favorites" buttons
    const buttons = await page.$$('button[aria-label="お気に入りに追加"]');
    console.log(`Found ${buttons.length} like buttons on mobile.`);

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        
        // Scroll to button
        await button.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        await new Promise(r => setTimeout(r, 800)); // wait for scroll (mobile scroll might take more time)

        // Click button
        console.log(`Tapping button ${i + 1}/${buttons.length}...`);
        await button.click();
        
        // Brief wait to see the reaction and visual indicator
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('All buttons tapped. Waiting a bit before finishing...');
    await new Promise(r => setTimeout(r, 2000));

    await recorder.stop();
    console.log(`Mobile Recording finished. Saved to ${savePath}`);

    await browser.close();
})();
