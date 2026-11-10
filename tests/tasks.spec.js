const { test, expect } = require('@playwright/test');
const { takeScreenshot, login } = require('./helpers');

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('cadastra uma tarefa', async ({ page }) => {
  await page.getByTestId('task-title').fill('Estudar Playwright');
  await page.getByTestId('task-description').fill('Aprender locators e assertions');
  await page.getByTestId('task-priority').selectOption('Alta');
  await page.getByTestId('save-task-button').click();

  await expect(page.getByTestId('task-name')).toHaveText('Estudar Playwright');
  await expect(page.getByTestId('total-count')).toHaveText('1');
  await takeScreenshot(page, '03-tarefa-cadastrada.png');
});

test('valida título obrigatório', async ({ page }) => {
  await page.getByTestId('task-title').fill('   ');
  await page.getByTestId('save-task-button').click();

  await expect(page.getByTestId('formError')).toBeVisible();
  await expect(page.getByTestId('total-count')).toHaveText('0');
  await takeScreenshot(page, '04-validacao-titulo.png');
});

test('edita uma tarefa', async ({ page }) => {
  await page.getByTestId('task-title').fill('Tarefa antiga');
  await page.getByTestId('save-task-button').click();
  await page.getByTestId('task-item').getByRole('button', { name: 'Editar' }).click();

  await page.getByTestId('task-title').fill('Tarefa atualizada');
  await page.getByTestId('save-task-button').click();

  await expect(page.getByTestId('task-name')).toHaveText('Tarefa atualizada');
  await expect(page.getByTestId('total-count')).toHaveText('1');
  await takeScreenshot(page, '05-tarefa-editada.png');
});

test('marca uma tarefa como concluída e filtra', async ({ page }) => {
  await page.getByTestId('task-title').fill('Finalizar atividade');
  await page.getByTestId('save-task-button').click();
  await page.getByTestId('task-item').getByRole('button', { name: 'Concluir' }).click();

  await expect(page.getByTestId('completed-count')).toHaveText('1');
  await page.getByTestId('status-filter').selectOption('Concluída');
  await expect(page.getByTestId('task-item')).toHaveCount(1);
  await takeScreenshot(page, '06-tarefa-concluida.png');
});

test('exclui uma tarefa', async ({ page }) => {
  await page.getByTestId('task-title').fill('Tarefa para excluir');
  await page.getByTestId('save-task-button').click();
  await page.getByTestId('task-item').getByRole('button', { name: 'Excluir' }).click();

  await expect(page.getByTestId('task-item')).toHaveCount(0);
  await expect(page.getByTestId('empty-state')).toBeVisible();
  await takeScreenshot(page, '07-tarefa-excluida.png');
});