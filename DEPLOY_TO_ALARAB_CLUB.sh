#!/bin/bash

echo "=================================================="
echo "🔱 ALARAB CLUB 777 - SECURE VOICE SYSTEM DEPLOYMENT"
echo "=================================================="

# Directories
SOURCE_DIR="/Users/macos/AlArab777/AlArab777_Unified_Voice_System/seven website/gemini-live-audio-interface 3/dist"
TARGET_DIR="/Users/macos/AlArab777/AlArabClub777.com"

# Step 1: Check if dist folder exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ ERROR: Support files not found!"
    echo "You must run 'npm run build' inside the gemini project first."
    exit 1
fi

echo "✅ Found secure build files."

# Step 2: Copy the assets folder (JS/CSS)
echo "🔄 Transferring encrypted assets to AlArabClub777.com..."
cp -R "$SOURCE_DIR/assets" "$TARGET_DIR/"

# Step 3: Copy index.html, renaming it to voice.html to avoid overwriting the main landing page if desired, 
# OR overwrite index.html directly if the Voice System is meant to be the default homepage.
# Based on the user's previous requests, the voice system IS the main portal now.
echo "🔄 Injecting Voice Interface into the main portal..."
cp "$SOURCE_DIR/index.html" "$TARGET_DIR/index.html"

echo "✅ Transfer Complete!"
echo ""
echo "=================================================="
echo "🎯 NEXT STEPS FOR MASTER SAID:"
echo "1. Open Terminal in: $TARGET_DIR"
echo "2. Run your Git commands to push the live site to Vercel/GitHub:"
echo "   git add ."
echo "   git commit -m 'deploy: Live Obfuscated Voice System v5'"
echo "   git push origin main"
echo "=================================================="
