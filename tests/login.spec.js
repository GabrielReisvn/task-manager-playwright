const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('./helpers');

test('carrega a aplicação e captura a tela inicial', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Task Manager' })).toBeVisible();
  await takeScreenshot(page, '01-tela-login.png');
});

test('faz login com os dados corretos', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('aluno');
  await page.getByTestId('password').fill('playwright123');
  await page.getByTestId('login-button').click();

  await expect(page.getByRole('heading', { name: 'Minhas tarefas' })).toBeVisible();
  await expect(page.getByTestId('welcomeName')).toHaveText('aluno');
  await takeScreenshot(page, '02-dashboard.png');
});

test('mostra erro com senha incorreta', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('aluno');
  await page.getByTestId('password').fill('senha-errada');
  await page.getByTestId('login-button').click();

  await expect(page.getByRole('alert')).toHaveText('Usuário ou senha incorretos.');
  await expect(page.getByTestId('login-form')).toBeVisible();
});