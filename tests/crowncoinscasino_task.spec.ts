import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

async function loginToAccount(page: Page) {
  await page.click('button:has-text("Log in")');
  await page.fill('input[type="email"]', 'watchdogstest02+11@sunfltd.com');
  await page.fill('input[type="password"]', '123456');
  await page.locator("form button.button").click();
}

async function handleDialogIfPresent(page: Page) {
  try {
    await page.locator('#onesignal-slidedown-allow-button').click({ timeout: 5000 });
  } catch (error) {
    console.log('Dialog not present or already handled');
  }
}

async function updateProfile(page: Page) {
  const randomString = faker.string.alphanumeric(8);
  const randomNumber = Math.floor(Math.random() * 20);

  await page.locator('._menuToggleWrapper_7jhnn_101 button').click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  await page.locator('div[class="dialog__body"] [data-testid="editAvatar"]').click();

  await page.fill('data-testid=nicknameInput', randomString);
  await page.locator(`[data-testid="avatar-image-${randomNumber}"]`).click();
  await page.getByRole('button', { name: 'Apply' }).click();

  return randomString;
}

async function verifyProfileUpdate(page: Page, expectedNickname: string) {
  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  const updatedString = page.locator('div [data-testid="my-profile-nickname"]');
  await expect(updatedString).toHaveText(expectedNickname, { timeout: 5000 });
  await page.locator('div [data-testid="profileInfoDialog"] button.dialog__header-btn').click();
}

async function closeDialogAndReturnToLobby(page: Page) {
  const boundingBox = await page.locator('div.account__wrapper').boundingBox();
  if (boundingBox) {
    await page.mouse.click(boundingBox.x + boundingBox.width + 10, boundingBox.y - 10);
  } else {
    console.log('Dialog box not found or not visible');
  }
}

async function printCoinAmounts(page: Page) {
  const ccCoinsAmount = await page.locator('#balance').innerText();
  console.log("CC coins amount: " + ccCoinsAmount);
  
  await page.locator('#swicher').click();
  await page.waitForSelector('#balance', { state: 'visible' });
  const scCoinsAmount = await page.locator('#balance').innerText();
  console.log("SC coins amount: " + scCoinsAmount);
}

test('Crown Coins Casino Profile Update and Balance Check', async ({ page }) => {
  await page.goto('https://app.dev.crowncoinscasino.com/');
  await loginToAccount(page);
  await handleDialogIfPresent(page);

  const updatedNickname = await updateProfile(page);
  await verifyProfileUpdate(page, updatedNickname);
  await closeDialogAndReturnToLobby(page);
  await printCoinAmounts(page);
});

