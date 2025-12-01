/**
 * Dada una URL de una página, devuelve la última URL
 * que comience por "https://static.zara.net/assets/" y termine en ".jpg".
 *
 */
async function extractLastZaraJpg(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al cargar ${url}: ${response.status}`);
    }
    const html = await response.text();

    const regex = /https:\/\/static\.zara\.net\/assets\/[^\s"'<>]+\.jpg/g;
    const matches = html.match(regex);

    return matches ? matches[matches.length - 1] : null;
}

(async () => {
    try {
        const img = await extractLastZaraJpg( // example
            'https://www.zara.com/es/en/soft-button-coat-p05070660.html'
        );
        console.log('Última imagen .jpg de Zara:', img);
    } catch (err) {
        console.error(err);
    }
})();
