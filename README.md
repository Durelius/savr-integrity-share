# Savr – Portfolio Sharing Feature

Built a clone of the Savr app in React TypeScript and added a new feature: sharing your portfolio with friends.

## What I built

### The app
Cloned the core Savr UI — home screen with market indices (OMXS30, NASDAQ, Bitcoin, Brent), weekly portfolio performance, market news, and the holdings screen with a full portfolio chart and fund breakdown. All running locally with dummy JSON data.

### Portfolio sharing
You can share your portfolio with friends via a link. When someone opens a shared portfolio they see everything in percentages — total return, fund allocation, performance over time — but zero actual amounts. No total value, no purchase price, no returns in SEK. Just the strategy and the percentages.

The share flow lives in the holdings screen. Tap "Dela din portfölj", get a privacy summary of exactly what the recipient can and can't see, copy the link or preview the shared view directly in the app.

### Privacy mode
Added a toggle in Shortcuts called "Integritetsläge". When it's on, all SEK amounts across the entire app blur out — your own portfolio value, fund values, returns in kr, everything. Percentages stay visible. Useful if you're showing someone your phone and don't want them clocking your numbers.

## Stack
- React + TypeScript
- Vite
- All data is local JSON files, no backend

## Running it

```bash
npm install
npm run dev
```
