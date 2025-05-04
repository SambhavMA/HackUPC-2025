const { chromium } = require('playwright');

async function getLastProductImage(url) {
  const browser = await chromium.launch({
    headless: false,   // modo visible para depurar
    slowMo: 1000,      // 1 s de pausa entre cada acción
    devtools: true     // abre DevTools
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });

  const selectorSource = '#main > div > div > ul > li:last-child > button > div > div > picture > source';

  // Pausa para que inspecciones el DOM en el inspector de Playwright
  await page.pause();

  // Esperamos a que el srcset cambie y no sea ya el placeholder
  await page.waitForFunction(
    selector => {
      const el = document.querySelector(selector);
      return el && el.srcset && !el.srcset.includes('transparent-background.png');
    },
    selectorSource,             // <-- aquí pasamos primero el selector
    { timeout: 60_000 }         // <-- y luego las opciones
  );

  // Extraemos el atributo srcset
  const srcset = await page.$eval(selectorSource, el => el.getAttribute('srcset'));
  const urls = srcset
    .split(',')
    .map(part => part.trim().split(' ')[0]);
  const image750 = urls.find(u => u.includes('w=750'));

  console.log('URL de la última imagen 750w:', image750);

  await browser.close();
}

getLastProductImage('https://www.zara.com/es/en/soft-button-coat-p05070660.html');