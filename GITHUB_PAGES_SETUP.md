# GitHub Pages Setup Checklist

## ✅ Completed (Already Done)

The following files have been created and configured:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automatic deployment
2. **`public/.nojekyll`** - Tells GitHub Pages to skip Jekyll processing
3. **`public/CNAME`** - Contains custom domain: `jett.io`
4. **`next.config.mjs`** - Already configured with `output: 'export'`
5. **`README.md`** - Updated with GitHub Pages deployment info
6. **`DEPLOYMENT.md`** - Complete deployment guide

## 📋 Next Steps (Do These on GitHub)

### Step 1: Push Changes to GitHub

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
4. Save changes

### Step 3: Configure Custom Domain

1. Still in **Settings** → **Pages**
2. Under "Custom domain", enter: **`jett.io`**
3. Click **Save**
4. GitHub will create a verification check

### Step 4: Update DNS Settings

Go to your domain registrar (where you bought jett.io) and add these DNS records:

**Option A: A Records (Recommended)**
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

**Option B: CNAME Record**
```
Type     Name    Value
CNAME    www     <your-github-username>.github.io
```

**Important**: Replace `<your-github-username>` with your actual GitHub username.

### Step 5: Wait for DNS Propagation

- DNS changes can take up to 24-48 hours
- Check status at: https://www.whatsmydns.net/#A/jett.io
- You'll see the GitHub Pages IPs propagate worldwide

### Step 6: Enable HTTPS

1. Return to **Settings** → **Pages** on GitHub
2. Once DNS is verified, check **"Enforce HTTPS"**
3. Your site will be available at: https://jett.io

## 🔍 Verification

### Check GitHub Actions

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Green checkmark = successful deployment

### Test Your Site

Once DNS propagates and deployment completes:

```bash
# Test if site is live
curl -I https://jett.io

# Should return 200 OK
```

Visit: https://jett.io

## 🐛 Troubleshooting

### Build Fails in Actions

- Check the Actions tab for error logs
- Common issues:
  - Missing dependencies
  - TypeScript/ESLint errors (already ignored in config)
  - Image optimization issues (already disabled)

### 404 Error

- Wait for deployment to complete
- Check that workflow succeeded
- Clear browser cache (Cmd+Shift+R)

### Custom Domain Not Working

- Verify DNS settings are correct
- Check CNAME file exists: `/public/CNAME`
- Wait longer for DNS propagation
- Use DNS checker: https://www.whatsmydns.net

### HTTPS Not Available

- Wait for DNS to fully propagate
- GitHub needs to verify domain ownership first
- Can take a few hours after DNS is set up

## 📊 Monitoring

After setup, monitor your deployments:

- **Actions Tab**: See deployment history and status
- **Insights → Traffic**: View page views (if public repo)
- **Settings → Pages**: See deployment status and custom domain status

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Actions workflow shows green checkmark
2. ✅ Settings → Pages shows "Your site is live at https://jett.io"
3. ✅ DNS checker shows GitHub IPs propagated
4. ✅ https://jett.io loads your site
5. ✅ HTTPS padlock appears in browser

## 🚀 Future Deployments

After initial setup, just push to main:

```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

GitHub Actions automatically builds and deploys. No further action needed!

---

**Questions or Issues?**

Check the detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

