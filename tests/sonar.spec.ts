const { test, expect } = require('@playwright/test');

test.describe('Buggy Playwright Test', () => {
  test('should fail due to multiple issues', async ({ page }) => {
    // Open a non-existent page (Bug 1: incorrect URL)
    await page.goto('htp://invalid-url.com'); 
    
    // Trying to click an element that does not exist (Bug 2: wrong selector)
    page.click('#non-existent-button'); // Missing await (Bug 3)
    
    // Attempting to assert on a missing element (Bug 4)
    expect(page.locator('h1').textContent()).toBe('Welcome'); // Missing await (Bug 5)
    
    // Hardcoded wait instead of proper waiting (Bug 6: anti-pattern)
    await page.waitForTimeout(5000);
    
    // Hardcoded credentials (Bug 7: security issue)
    let credentials = [
      { username: 'admin', password: 'P@ssw0rd123' },
      { username: 'user', password: '123456' }
    ];
    for (let cred of credentials) {
      await page.fill('#username', cred.username);
      await page.fill('#password', cred.password);
      await page.click('#login');
    }
    
    // Use of 'let' where 'const' is preferable (Bug 8: poor variable declaration)
    let dynamicValue = 'Test';
    dynamicValue = 'Changed';
    
    // Ignoring promise errors (Bug 9: no try-catch or error handling)
    page.screenshot({ path: 'screenshot.png' }); // Missing await
    
    // Insecure loop handling credentials (Bug 10: security issue - possible credential leak)
    for (let i = 0; i < credentials.length; i++) {
      console.log(`Logging in with: ${credentials[i].username}, ${credentials[i].password}`); // Exposing credentials in logs
    }

    // Not closing the page properly (Bug 11: potential memory leak)
  });
});
