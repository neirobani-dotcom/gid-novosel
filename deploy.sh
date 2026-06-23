#!/usr/bin/env bash
set -euo pipefail
# Usage:
# FTP_HOST=ftp.sprinthost.ru FTP_USER=a1269574 FTP_PASS=egadguzaez FTP_PATH=/public_html ./deploy.sh

HOST=${FTP_HOST:-}
USER=${FTP_USER:-}
PASS=${FTP_PASS:-}
REMOTE=${FTP_PATH:-/public_html}
LOCAL_DIR=dist

if [ ! -d "$LOCAL_DIR" ]; then
  echo "Error: $LOCAL_DIR not found. Run npm run build first."
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "Error: lftp not installed. Install it (brew install lftp) or run the included Python uploader."
  exit 1
fi

if [ -z "$HOST" ] || [ -z "$USER" ] || [ -z "$PASS" ]; then
  echo "Please set FTP_HOST, FTP_USER and FTP_PASS environment variables. Example:"
  echo "FTP_HOST=ftp.sprinthost.ru FTP_USER=a1269574 FTP_PASS=egadguzaez FTP_PATH=/public_html ./deploy.sh"
  exit 1
fi

echo "Deploying $LOCAL_DIR -> $HOST:$REMOTE"
lftp -u "$USER","$PASS" "$HOST" -e "mirror -R --delete --verbose $LOCAL_DIR $REMOTE; quit"

echo "Deploy finished"
