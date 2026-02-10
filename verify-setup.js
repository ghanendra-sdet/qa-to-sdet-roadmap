#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if all required tools are installed and properly configured
 */

const { execSync } = require('child_process');
const os = require('os');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    bold: '\x1b[1m'
};

function checkCommand(command, name, minVersion = null) {
    try {
        const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
        const version = output.trim().split('\n')[0];

        if (minVersion && version.includes(minVersion)) {
            console.log(`${colors.green}✓${colors.reset} ${name}: ${colors.bold}${version}${colors.reset}`);
        } else {
            console.log(`${colors.green}✓${colors.reset} ${name}: ${colors.bold}${version}${colors.reset}`);
        }
        return true;
    } catch (error) {
        console.log(`${colors.red}✗${colors.reset} ${name}: ${colors.red}Not installed${colors.reset}`);
        return false;
    }
}

function printHeader(text) {
    console.log(`\n${colors.blue}${colors.bold}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}${colors.bold}  ${text}${colors.reset}`);
    console.log(`${colors.blue}${colors.bold}═══════════════════════════════════════${colors.reset}\n`);
}

function printSummary(results) {
    console.log(`\n${colors.blue}${colors.bold}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}${colors.bold}  Summary${colors.reset}`);
    console.log(`${colors.blue}${colors.bold}═══════════════════════════════════════${colors.reset}\n`);

    const passed = results.filter(r => r).length;
    const total = results.length;

    if (passed === total) {
        console.log(`${colors.green}${colors.bold}✓ All checks passed! (${passed}/${total})${colors.reset}`);
        console.log(`${colors.green}You're ready to start learning!${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}${colors.bold}⚠ Some tools are missing (${passed}/${total} passed)${colors.reset}`);
        console.log(`${colors.yellow}Please install the missing tools to continue.${colors.reset}\n`);
    }
}

function printInstallationGuide(tool) {
    const guides = {
        'Node.js': 'Visit https://nodejs.org/ to download and install Node.js',
        'Git': 'Visit https://git-scm.com/ to download and install Git',
        'npm': 'npm is installed with Node.js. Install Node.js first.',
        'npx': 'npx is installed with Node.js (v5.2+). Update Node.js if missing.',
        'VS Code': 'Visit https://code.visualstudio.com/ to download VS Code'
    };

    return guides[tool] || `Search for "${tool} installation" online`;
}

console.clear();
console.log(`${colors.bold}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        QA to SDET Roadmap - Setup Verification           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);

console.log(`\nChecking your development environment...\n`);
console.log(`OS: ${colors.bold}${os.platform()} ${os.release()}${colors.reset}\n`);

const results = [];

// Core Tools
printHeader('Core Development Tools');
results.push(checkCommand('node --version', 'Node.js'));
results.push(checkCommand('npm --version', 'npm'));
results.push(checkCommand('npx --version', 'npx'));

// Version Control
printHeader('Version Control');
results.push(checkCommand('git --version', 'Git'));

// Optional Tools
printHeader('Optional Tools (Nice to Have)');
const vscodeCheck = checkCommand('code --version', 'VS Code');

// Playwright (may not be installed yet)
printHeader('Automation Tools');
try {
    execSync('npx playwright --version', { encoding: 'utf8', stdio: 'pipe' });
    console.log(`${colors.green}✓${colors.reset} Playwright: ${colors.bold}Installed${colors.reset}`);
} catch (error) {
    console.log(`${colors.yellow}○${colors.reset} Playwright: ${colors.yellow}Not installed yet (will install in Module 3)${colors.reset}`);
}

// Summary
printSummary(results);

// Installation guidance
const failed = results.filter(r => !r).length;
if (failed > 0) {
    console.log(`${colors.yellow}${colors.bold}Installation Guides:${colors.reset}\n`);

    if (!results[0]) console.log(`• Node.js: ${printInstallationGuide('Node.js')}`);
    if (!results[1]) console.log(`• npm: ${printInstallationGuide('npm')}`);
    if (!results[2]) console.log(`• npx: ${printInstallationGuide('npx')}`);
    if (!results[3]) console.log(`• Git: ${printInstallationGuide('Git')}`);

    console.log(`\n${colors.yellow}After installing missing tools, run this script again.${colors.reset}\n`);
} else {
    console.log(`${colors.green}${colors.bold}Next Steps:${colors.reset}`);
    console.log(`  1. Start with Module 0: Introduction`);
    console.log(`  2. Read the README.md in 0_introduction/`);
    console.log(`  3. Follow the learning path sequentially\n`);
    console.log(`${colors.blue}Happy learning! 🚀${colors.reset}\n`);
}
