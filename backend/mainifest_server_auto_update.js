// backend/manifest_server_auto_updater.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const picocolors = require('picocolors');
const { clearInterval } = require('timers');

picocolors.createColors({ useColor: true });
process.env.FORCE_COLOR = '3';

class AutoUpdater {
  constructor(options = {}) {
    this.checkInterval = options.checkInterval || 300000; // 5 minutes default
    this.branch = options.branch || 'main';
    this.repositoryPath = options.repositoryPath || process.cwd();
    this.autoRestart = options.autoRestart !== false;
    this.lastCommitHash = null;
    this.isUpdating = false;
    this.updateTimer = null;
  }

  /**
   * Execute a shell command and return a promise
   * @param {string} command
   * @returns {Promise<any?>}
   */
  executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, { cwd: this.repositoryPath }, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
          return;
        }
        resolve(stdout.trim());
      });
    });
  }

  /**
   * Get the current commit hash
   */
  async getCurrentCommitHash() {
    try {
      const hash = await this.executeCommand('git rev-parse HEAD');
      return hash;
    } catch (error) {
      console.error(picocolors.red('Error getting current commit hash:'), error);
      return null;
    }
  }

  /**
   * Fetch updates from remote repository
   */
  async fetchUpdates() {
    try {
      console.log(picocolors.cyan('Fetching updates from remote...'));
      await this.executeCommand('git fetch origin');
      return true;
    } catch (error) {
      console.error(picocolors.red('Error fetching updates:'), error.stderr || error);
      return false;
    }
  }

  /**
   * Check if updates are available
   */
  async checkForUpdates() {
    try {
      await this.fetchUpdates();

      const localHash = await this.executeCommand('git rev-parse HEAD');
      const remoteHash = await this.executeCommand(`git rev-parse origin/${this.branch}`);

      return localHash !== remoteHash;
    } catch (error) {
      console.error(picocolors.red('Error checking for updates:'), error);
      return false;
    }
  }

  /**
   * Pull updates from repository
   */
  async pullUpdates() {
    try {
      console.log(picocolors.yellow('Pulling updates...'));
      const result = await this.executeCommand(`git pull origin ${this.branch}`);
      console.log(picocolors.green('✓ Updates pulled successfully'));
      console.log(result);
      return true;
    } catch (error) {
      console.error(picocolors.red('Error pulling updates:'), error.stderr || error);
      return false;
    }
  }

  /**
   * Install/update npm dependencies
   */
  async updateDependencies() {
    try {
      console.log(picocolors.yellow('Updating dependencies...'));

      // Check if package.json was modified
      const status = await this.executeCommand('git diff HEAD@{1} HEAD --name-only');

      if (status.includes('package.json') || status.includes('package-lock.json')) {
        console.log(picocolors.cyan('Package files changed, running npm install...'));
        await this.executeCommand('npm install');
        console.log(picocolors.green('✓ Dependencies updated'));
        return true;
      } else {
        console.log(picocolors.gray('No dependency changes detected'));
        return false;
      }
    } catch (error) {
      console.error(picocolors.red('Error updating dependencies:'), error);
      return false;
    }
  } 

  /**
   * Restart the server
   */
  restartServer() {
    console.log(picocolors.yellow('\n🔄 Restarting server...'));
    console.log(picocolors.cyan('Shutting down current process...\n'));

    // Exit with code 0 - PM2 or nodemon will restart automatically
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  }

  /**
   * Perform full update process
   */
  async performUpdate() {
    if (this.isUpdating) {
      console.log(picocolors.yellow('Update already in progress...'));
      return false;
    }

    this.isUpdating = true;
    console.log(picocolors.bgCyan('\n========================================'));
    console.log(picocolors.bgCyan('     AUTO-UPDATER: Starting Update      '));
    console.log(picocolors.bgCyan('========================================\n'));

    try {
      // Step 1: Pull updates
      const pullSuccess = await this.pullUpdates();
      if (!pullSuccess) {
        throw new Error('Failed to pull updates');
      }

      // Step 2: Update dependencies if needed
      await this.updateDependencies();

      // Step 3: Get new commit info
      const newHash = await this.getCurrentCommitHash();
      console.log(picocolors.green(`\n✓ Updated to commit: ${newHash?.substring(0, 7)}`));

      // Step 4: Restart server if auto-restart is enabled
      if (this.autoRestart) {
        console.log(picocolors.yellow('\nAuto-restart enabled. Server will restart in 3 seconds...'));
        setTimeout(() => {
          this.restartServer();
        }, 3000);
      } else {
        console.log(picocolors.yellow('\n⚠ Auto-restart disabled. Please restart server manually.'));
      }

      this.isUpdating = false;
      return true;
    } catch (error) {
      console.error(picocolors.red('\n❌ Update failed:'), error);
      this.isUpdating = false;
      return false;
    }
  }

  /**
   * Start automatic update checking
   */
  async startAutoUpdate() {
    clearInterval(this.updateTimer);
    console.log(picocolors.green('\nAuto-updater started'));
    console.log(picocolors.gray(`\tChecking for updates every ${this.checkInterval / 1000} seconds`));
    console.log(picocolors.gray(`\tBranch: ${this.branch}\n`));

    // Get initial commit hash
    this.lastCommitHash = await this.getCurrentCommitHash();
    var TimeoutDuration = this.checkInterval || 0;

    (() => {
      // Start periodic checking
      this.updateTimer = setInterval(async () => {
        const hasUpdates = await this.checkForUpdates();

        if (hasUpdates) {
          console.log(picocolors.green('\n✨ New updates available!'));
          await this.performUpdate();
        } else {
          console.log(picocolors.gray(`[${new Date().toLocaleTimeString()}] ✓ No updates found - already up to date`));
        }
      }, this.checkInterval);
      (() => {
        setInterval(() => console.log(`Time till next Update Check ${TimeoutDuration}`), 5000);
      })();
      (() => {
        setInterval(() => TimeoutDuration -= 100, 1000);
      })();
    })();

  }

  /**
   * Stop automatic updates
   */
  stopAutoUpdate() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
      console.log(picocolors.yellow('Auto-updater stopped'));
    }
  }

  /**
   * Manual update trigger
   */
  async triggerUpdate() {
    console.log(picocolors.cyan('\n📥 Manual update triggered...'));
    const hasUpdates = await this.checkForUpdates();

    if (hasUpdates) {
      return await this.performUpdate();
    } else {
      console.log(picocolors.green('✓ Already up to date!'));
      return false;
    }
  }
}

module.exports = AutoUpdater;
