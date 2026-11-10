const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
fs.mkdirSync(screenshotsDir, { recursive: true });

async function takeScreenshot(page, filename) {
  const destination = path.join(screenshotsDir, filename);
  await page.screenshot({ path: destination, fullPage: true });
  console.log(`Screenshot salvo em: ${destination}`);
}

async function login(page) {
  await page.goto('/');
  await page.getByTestId('username').fill('aluno');
  await page.getByTestId('password').fill('playwright123');
  await page.getByTestId('login-button').click();
  await page.getByRole('heading', { name: 'Minhas tarefas' }).waitFor();
}

module.exports = { takeScreenshot, login };