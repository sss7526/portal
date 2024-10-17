# portal

iykyk

## Dependencies

1. Install node

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

source ~/.bashrc

# download and install Node.js
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.18.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

2. Install node packages

```bash
npm install node-pty express ws @xterm/xterm 
```

## Installation

1. Clone it

```bash
git clone https://github.com/sss7526/portal.git
cd portal
```

2. Run it

```bash
node portal.js
```

## Use it

Navigate to http://localhost:5000

(change the port number in portal/portal.js and in portal/public/index.html if you want to use another port)

Set up nginx reverse proxy to point to it like the wizard you are (secure it though for serious)