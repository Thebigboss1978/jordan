#!/bin/bash

# ==========================================
# 🔱 AlArab 777 - Secure GitHub Push
# ==========================================

echo "=========================================="
echo "🚀 Preparing to push to Sovereign AI Repo..."
echo "=========================================="

# 1. Getting current directory
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit

echo "[+] Currently inside: $PROJECT_DIR"
echo "[+] Ensuring junk files (node_modules, cache) are ignored..."

# 2. Add changes in current folder ONLY
echo "[+] Staging files..."
git add .

# 3. Commit
COMMIT_MSG="feat(VoiceSystem): Sovereign integration, UI responsive fixes, Black Book manual (Clean Push)"
echo "[+] Committing with message: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG"

# 4. Push
echo "[+] Pushing to Main..."
git push origin HEAD

echo "=========================================="
echo "✅ Finished! If there are no errors above, the push was successful!"
echo "=========================================="
