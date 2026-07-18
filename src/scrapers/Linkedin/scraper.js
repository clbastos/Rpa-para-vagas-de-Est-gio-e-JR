const { chromium } = require('playwright');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, resolve);
  });
}

(async () => {
  const email = await perguntar('Digite seu e-mail: ');
  const senha = await perguntar('Digite sua senha: ');
  rl.close();



  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'pt-BR',
  });

  const page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(60000);
    
    await page.goto('https://www.linkedin.com');
    await page.waitForTimeout(2000); 

    await page.getByRole('link', { name: 'Entrar', exact: true }).click();
    await page.waitForTimeout(1500); 

    await page.getByRole('textbox', { name: 'E-mail ou telefone' }).click();
    await page.waitForTimeout(1000); 

    await page.getByRole('textbox', { name: 'E-mail ou telefone' }).fill(email);
    await page.waitForTimeout(1000); 

    await page.getByRole('textbox', { name: 'Senha' }).click();
    await page.waitForTimeout(1000); 

    await page.getByRole('textbox', { name: 'Senha' }).fill(senha);
    await page.waitForTimeout(1000); 
    
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await page.waitForTimeout(5000); // Aguarda 5 segundos para login ser processado

    await page.goto('https://www.linkedin.com/jobs/');
    await page.waitForTimeout(2000); // Aguarda 2 segundos para a página de empregos carregar
    

    await page.getByRole('textbox', { name: 'Cargo, competência ou empresa' }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', { name: 'Cargo, competência ou empresa' }).fill('qa tester');
    await page.waitForTimeout(1000);
    
    await page.getByRole('textbox', { name: 'Cidade, estado ou código' }).click();
    await page.waitForTimeout(2000);
    
    await page.getByRole('textbox', { name: 'Cidade, estado ou código' }).fill('brasil');
    await page.waitForTimeout(1000);
    
    await page.getByRole('textbox', { name: 'Cidade, estado ou código' }).press('Enter');
    await page.waitForTimeout(2000);

    await new Promise(resolve => process.stdin.once('data', resolve));
    
        
})();
