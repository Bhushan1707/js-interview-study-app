# Deployment Instructions

## Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: JS Interview Study App"
```

## Step 2: Connect to GitHub
```bash
git branch -M main
git remote add origin https://github.com/Bhushan1707/javascript-interview-questions-master.git
git push -u origin main
```

## Step 3: Deploy to GitHub Pages
```bash
npm run deploy
```

## Step 4: Enable GitHub Pages
1. Go to your GitHub repository
2. Click Settings → Pages
3. Source should be set to "Deploy from a branch"
4. Branch should be "gh-pages"
5. Your app will be live at: https://Bhushan1707.github.io/javascript-interview-questions-master

## Troubleshooting
- If `npm run deploy` fails, make sure all changes are committed first
- If the site doesn't load, check that the homepage URL in package.json matches your GitHub Pages URL
- Wait a few minutes after deployment for changes to appear

## Future Updates
To update your deployed app:
1. Make your changes
2. Commit them: `git add . && git commit -m "Update message"`
3. Push to GitHub: `git push`
4. Deploy: `npm run deploy`
