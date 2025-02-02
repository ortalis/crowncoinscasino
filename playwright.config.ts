import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 120000, // Increased timeout for CI environments
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // Reduced workers for CI to avoid resource contention
  reporter: process.env.CI ? 'github' : 'html', // Use GitHub reporter for CI
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }, // Set a fixed viewport for consistency
    launchOptions: {
      args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
