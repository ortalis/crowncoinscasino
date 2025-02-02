import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Crown Coins Casino Profile Update and Balance Check', async ({ page }) => {
  // Increase timeout for the entire test
  test.setTimeout(120000);

  // Open the URL
  await page.goto('https://app.dev.crowncoinscasino.com/');

  // Log in to the account
  await page.click('button:has-text("Log in")');
  await page.fill('input[type="email"]', 'watchdogstest02+11@sunfltd.com');
  await page.fill('input[type="password"]', '123456');
  await page.locator("form button.button").click();

  // Wait for navigation after login
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // Handle dialog if it appears
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  try {
    await page.locator('#onesignal-slidedown-allow-button').click({ timeout: 5000 });
  } catch (error) {
    console.log('OneSignal dialog not found or already handled');
  }

  // Update the username with a random string and choose a random avatar
  await page.waitForSelector('div._header_7jhnn_27', { state: 'visible' });
  await page.locator('button[data-testid="menuButton"]').click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  await page.locator('[data-testid="editAvatar"]').click();

  const randomString = faker.string.alphanumeric(8);
  await page.fill('[data-testid="nicknameInput"]', randomString);

  const randomNumber = Math.floor(Math.random() * 20);
  await page.locator(`[data-testid="avatar-image-${randomNumber}"]`).click();
  await page.getByRole('button', { name: 'Apply' }).click();

  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  await expect(page.locator('[data-testid="my-profile-nickname"]')).toHaveText(randomString, { timeout: 10000 });
  await page.locator('[data-testid="profileInfoDialog"] button.dialog__header-btn').click();

  // Return to lobby
  const boundingBox = await page.locator('div.account__wrapper').boundingBox();
  if (boundingBox) {
    await page.mouse.click(boundingBox.x + boundingBox.width + 10, boundingBox.y - 10);
  } else {
    console.log('Dialog box not found or not visible');
  }

  // Print the user's coin amount for both coin types
  const ccCoinsAmount = await page.locator('#balance').innerText();
  console.log("CC coins amount: " + ccCoinsAmount);
  await page.locator('#swicher').click();
  await page.waitForSelector('#balance', { state: 'visible', timeout: 10000 });
  const scCoinsAmount = await page.locator('#balance').innerText();
  console.log("SC coins amount: " + scCoinsAmount);
});




