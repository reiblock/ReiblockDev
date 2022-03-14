# A shell script to use python packaging tools to deploy a python package to S3 for use by terraform to deploy a lambda
#!/usr/bin/env bash

set -x
# This script can be called from github actions to create a deployment pipeline

BUCKET="$DOMAIN-lambda-functions"
BUILDDIR=".build"
DOMAIN="reiblok.com"

die() {
    local m="$1"
    local e=$2
    echo "$m" && exit $e
}

if [ $# -eq 0 ]; then die "Usage $0 [LAMBDA_DIR]" 1; fi

DIR=$(git rev-parse --show-toplevel)

LAMBDADIR="$DIR/$1"

if [ -d ${LAMBDADIR}/${BUILDDIR} ]; then
	die "Build directory already exists. Please delete and rerun." 1
fi

if ! [ -f "${LAMBDADIR}/setup.py" ]; then die "Error: setup.py not found" 1; fi

if [ -n "$AWS_PROFILE" ] || [[ -n "$AWS_ACCESS_KEY_ID" && -n "$AWS_SECRET_ACCESS_KEY" ]]; then
    echo "AWS Credentials Found"
else
    die "Error: No AWS Credentials Found" 1
fi

if ! command -v aws &> /dev/null; then die "Error: AWS not found." 1; fi
if ! command -v git &> /dev/null; then die "Error: GIT not found." 1; fi
if ! command -v python &> /dev/null; then die "Error: PYTHON not found." 1; fi

LAMBDANAME=$(basename "${LAMBDADIR}")

python -m venv ${LAMBDADIR}/${BUILDDIR}/virtualenv
${LAMBDADIR}/${BUILDDIR}/virtualenv/bin/python ${LAMBDADIR}/setup.py install
${LAMBDADIR}/${BUILDDIR}/virtualenv/bin/python ${LAMBDADIR}/setup.py sdist --formats=zip --dist-dir ${LAMBDADIR}/${BUILDDIR}

if ! [ -f "${LAMBDADIR}/$BUILDDIR/$LAMBDANAME.zip" ]; then die "Error: zip file not found" 1; fi

aws s3 cp $LAMBDADIR/$BUILDDIR/$LAMBDANAME.zip s3://$BUCKET
