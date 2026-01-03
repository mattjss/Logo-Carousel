# Setup Instructions

## Step 1: Install Dependencies

Run this command in your terminal from the project directory:

```bash
cd /Users/mattsilverman/Experiments_Logo-Carousel
npm install
```

If you get permission errors, try:
```bash
sudo npm install
```

Or use a node version manager:
```bash
# If using nvm
nvm use 20
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5173` and should automatically open in your browser.

## Step 3: Verify

You should see:
- A page with "Logo Carousel" heading
- 4 logos displayed at a time
- Logos cycling vertically through 3 rows

## Troubleshooting

If you see a blank page:
1. Check the browser console for errors (F12 or Cmd+Option+I)
2. Make sure all SVG files are in `/public/assets/`
3. Verify node_modules exists: `ls node_modules`
4. Try clearing browser cache and hard refresh (Cmd+Shift+R)

