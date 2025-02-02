import { test, expect} from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';
import { faker } from '@faker-js/faker';
import { time } from 'console';


test('Crown Coins Casino Profile Update and Balance Check', async ({ page }) => {
  // Open the URL
  await page.goto('https://app.dev.crowncoinscasino.com/');
 // Log in to the account
  await page.click('button:has-text("Log in")'); 
  await page.fill('input[type="email"]', 'watchdogstest02+11@sunfltd.com');
  await page.fill('input[type="password"]', '123456');
  await page.locator("form button.button").click()
  
  // Check if the dialog box is visible and close it
  let dialogAppeared = false;
  page.on('dialog', async (dialog) => {
    dialogAppeared = true;
    await dialog.accept();
  });

  try {
    await page.locator('#onesignal-slidedown-allow-button').click({ timeout: 5000 });
  } catch  {
  }

  // Update the username with a random string and choose a random avatar
  await page.locator('data-testid=menuButton').click()
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  await page.locator('div[class="dialog__body"] [data-testid="editAvatar"]').click();

  const randomString = faker.string.alphanumeric(8);
  await page.fill('data-testid=nicknameInput', randomString);

  const randomNumber = Math.floor(Math.random() * 20);
  const randomAvatar = page.locator(`[data-testid="avatar-image-${randomNumber}"]`);  
  await randomAvatar.click();
  await page.getByRole('button', { name: 'Apply' }).click();

  await page.getByRole('button', { name: 'MY PROFILE' }).click();
  const updatedString = await page.locator('div [data-testid="my-profile-nickname"]');
  await expect(updatedString).toHaveText(randomString, { timeout: 5000 });
  await page.locator('div [data-testid="profileInfoDialog"] button.dialog__header-btn').click();
 
  /**
 * Due to a bug where the 'close' button in the account dialog is not responsive,
 * this function implements an alternative method to return to the lobby.
 * It simulates clicking on the background outside the dialog box, which effectively
 * closes the dialog and returns the user to the lobby.
 */
  const boundingBox = await page.locator('div.account__wrapper').boundingBox();
  if (boundingBox) {
    await page.mouse.click(boundingBox.x + boundingBox.width + 10, boundingBox.y - 10);
  } else {
    console.log('Dialog box not found or not visible');
  }

  // Print the user’s coin amount for both coin types
  const ccCoinsAmount = await page.locator('#balance').innerText();
  console.log("CC coins amount: " + ccCoinsAmount);
  await page.locator('#swicher').click();
  await page.waitForTimeout(3000);
  const scCoinsAmount = await page.locator('#balance').innerText();
  console.log("SC coins amount: " + scCoinsAmount);
  
  await page.close();

});


