# Git Commands Cheatsheet

## Quick Reference for Essential Git Commands

---

## 📋 Basic Configuration

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Check configuration
git config --list
```

---

## 🆕 Creating Repositories

```bash
# Initialize new repository
git init

# Clone existing repository
git clone <repository-url>

# Clone to specific directory
git clone <repository-url> <directory-name>
```

---

## 📝 Basic Workflow

```bash
# Check status
git status

# Add file to staging
git add <filename>

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Add and commit in one step
git commit -am "Your commit message"
```

---

## 🔍 Viewing Changes

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# View commit history
git log

# View compact history
git log --oneline

# View last n commits
git log -n 5
```

---

## 🌿 Branching

```bash
# List branches
git branch

# Create new branch
git branch <branch-name>

# Switch to branch
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <branch-name>

# Delete branch
git branch -d <branch-name>

# Force delete branch
git branch -D <branch-name>
```

---

## 🔄 Syncing with Remote

```bash
# Add remote repository
git remote add origin <repository-url>

# View remotes
git remote -v

# Fetch changes from remote
git fetch origin

# Pull changes from remote
git pull origin <branch-name>

# Push changes to remote
git push origin <branch-name>

# Push and set upstream
git push -u origin <branch-name>
```

---

## 🔀 Merging

```bash
# Merge branch into current branch
git merge <branch-name>

# Abort merge
git merge --abort
```

---

## ↩️ Undoing Changes

```bash
# Discard changes in working directory
git checkout -- <filename>

# Unstage file
git reset HEAD <filename>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>
```

---

## 🏷️ Tagging

```bash
# Create lightweight tag
git tag <tag-name>

# Create annotated tag
git tag -a <tag-name> -m "Tag message"

# List tags
git tag

# Push tags to remote
git push origin --tags
```

---

## 🔍 Useful Commands

```bash
# Show commit details
git show <commit-hash>

# Search commit messages
git log --grep="search term"

# Show who changed each line
git blame <filename>

#Temporary save changes
git stash

# Apply stashed changes
git stash apply

# List stashes
git stash list
```

---

## 🚨 Common Scenarios

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Change Last Commit Message
```bash
git commit --amend -m "New message"
```

### Pull Latest Changes
```bash
git pull origin main
```

### Create Feature Branch
```bash
git checkout -b feature/new-feature
```

### Merge Feature into Main
```bash
git checkout main
git merge feature/new-feature
git push origin main
```

---

**[← Back to Resources](../README.md)**
