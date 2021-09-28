set -e

VERSION=$(cat version | awk '{$1=$1;print}')
echo "publish version ${VERSION}"

sudo npm install -g @abtnode/cli

echo "bundling..."
echo "SKIP_PREFLIGHT_CHECK=true" > .env
npm run bundle

echo "publishing to blocklet registry..."
blocklet config registry ${BLOCKLET_REGISTRY}
blocklet publish --developer-sk ${BLOCKLET_REGISTRY_SK}

make release
