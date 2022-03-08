# A shell script to push the www to S3 using API keys
#!/usr/bin/env bash

# This script can be called from github actions to create a deployment pipeline

DOMAIN="reiblok.com"
WWW_DIR="www/dist/www/browser"

die() {
    local m="$1"
    local e=$2
    echo "$m" && exit $e
}

if [ $# -eq 0 ]; then die "Usage $0 [mvp|dev|stage|prod]" 1; fi

if [ -n "$AWS_PROFILE" ] || [[ -n "$AWS_ACCESS_KEY_ID" && -n "$AWS_SECRET_ACCESS_KEY" ]]; then
    echo "AWS Credentials Found"
else
    die "Error: No AWS Credentials Found" 1
fi

if ! command -v npm &> /dev/null; then die "Error: NPM not found." 1; fi
if ! command -v aws &> /dev/null; then die "Error: AWS not found." 1; fi
if ! command -v git &> /dev/null; then die "Error: GIT not found." 1; fi

if [ $1 != "mvp" ]; then die "Error: mvp only." 1; fi

DIR=$(git rev-parse --show-toplevel)

cd $DIR/www && echo "Installing node_modules"

npm install 2>&1 &&  echo "Building www"

if ! command -v ng &> /dev/null; then die "Error: NG not found." 1; fi

ng build 2>&1 && echo "Pushing to S3"

aws s3 sync $DIR/$WWW_DIR s3://$1.$DOMAIN 2>&1 && echo "Done"
