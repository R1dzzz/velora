#!/bin/bash
set -e
echo "Injecting Supabase env vars into index.html..."

SB_URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
SB_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}"

if [ -z "$SB_URL" ] || [ -z "$SB_KEY" ]; then
  echo "Warning: Supabase env vars not set. Auth will be disabled."
fi

# Inject meta tags right after <head>
sed -i "s|<head>|<head>\n<meta name=\"sb-url\" content=\"${SB_URL}\"/>\n<meta name=\"sb-key\" content=\"${SB_KEY}\"/>|" index.html

echo "Build complete."
