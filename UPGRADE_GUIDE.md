# Upgrade Instructions

## Node.js Upgrade (Required)

Your current Node.js version: **v18.20.8**  
Required version: **v20.9.0 or higher**

### Option 1: Using Homebrew (Recommended for Mac)

```bash
# Update Homebrew
brew update

# Upgrade Node.js to latest LTS
brew upgrade node

# Verify installation
node --version  # Should show v20.x.x or higher
npm --version
```

### Option 2: Using NVM (Node Version Manager)

```bash
# Install NVM if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version
```

### Option 3: Direct Download

Download from: https://nodejs.org/en/download/  
Choose the LTS version (v20.x.x)

## After Upgrading Node.js

```bash
cd "/Users/mac/NIPA potal"

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run the development server
npm run dev
```

## Note

This project uses Next.js (JavaScript/TypeScript), not Java. If you actually need Java for another project, let me know and I can help with that separately.
