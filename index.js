const browser = await puppeteer.launch();

const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', (req) => {
    if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
        req.abort();
    }
    else {
        req.continue();
    }
});
/*await page.setViewport({
width: 1920,
height: 1080,
deviceScaleFactor: 1,
})*/
let pp = ['correr','cantar','saltar'];
let sa = [];
for (let i in pp) {
    const e = pp[i].split(" ");
    const valor = e.join('%20')

    await page.goto('https://www.deepl.com/es/translator#en/es/' + valor);
    await page.waitFor(1000);
    let h = await page.evaluate((valor) => {
        let are = [];
        //let jio= document.querySelectorAll('a.dictLink.featured');
        let jio = document.querySelectorAll('textarea')[1]
        /*jio.forEach(ele => are.push(ele.innerText))*/
        if (jio === null) { return valor }
        //return are
        return jio.value;
    }, valor);

    sa.push(h);
}

for (let i in sa) {
    console.log(sa[i]);
}
await browser.close();