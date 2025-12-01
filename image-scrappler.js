const { chromium } = require('playwright');

async function getLastProductImage(url) {
    const browser = await chromium.launch({
        headless: true,
        slowMo: 1000,
        devtools: true
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });

    const selectorSource = '#main > div > div > ul > li:last-child > button > div > div > picture > source';

    await page.pause();

    await page.waitForFunction(
        selector => {
            const el = document.querySelector(selector);
            return el && el.srcset && !el.srcset.includes('transparent-background.png');
        },
        selectorSource,
        { timeout: 60_000 }
    );


    const srcset = await page.$eval(selectorSource, el => el.getAttribute('srcset'));
    const urls = srcset
        .split(',')
        .map(part => part.trim().split(' ')[0]);
    const image750 = urls.find(u => u.includes('w=750'));

    console.log('URL de la última imagen 750w:', image750);

    await browser.close();
}

getLastProductImage('https://zara.com/es/en/-P16633510.html?v1=433536738');