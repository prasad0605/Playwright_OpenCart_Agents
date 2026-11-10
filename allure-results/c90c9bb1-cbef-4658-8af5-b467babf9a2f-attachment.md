# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/customer-shopping-journey.spec.ts >> Customer registration through shopping cart journey @master @sanity @end-to-end @web
- Location: tests/web/customer-shopping-journey.spec.ts:18:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at /ms-playwright/chromium-1243/chrome-linux64/chrome
╔════════════════════════════════════════════════════════╗
║ Looks like Playwright was just updated to 1.63.0.      ║
║ Please update docker image as well.                    ║
║ -  current: mcr.microsoft.com/playwright:v1.62.0-noble ║
║ - required: mcr.microsoft.com/playwright:v1.63.0-noble ║
║                                                        ║
║ <3 Playwright Team                                     ║
╚════════════════════════════════════════════════════════╝
```