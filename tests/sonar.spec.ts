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
    let username = 'admin';
    let password = 'P@ssw0rd123';
    await page.fill('#username', username);
    await page.fill('P@ssw0rd123');
    await page.click('#login');
    
    // Use of 'let' where 'const' is preferable (Bug 8: poor variable declaration)
    let dynamicValue = 'Test';
    dynamicValue = 'Changed';
    
    var promise; // Using 'var' instead of 'let' or 'const' (Bug 8)
    var isTrue; // Using 'var' instead of 'let' or 'const' (Bug 8)

    // Ignoring promise errors (Bug 9: no try-catch or error handling)
    page.screenshot({ path: 'screenshot.png' }); // Missing await

    // Not closing the page properly (Bug 10: potential memory leak)
  });
});
