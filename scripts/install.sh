#!/bin/bash
set -x

# Import SSH deployment key
- openssl aes-256-cbc -K $encrypted_307b6c854fd8_key -iv $encrypted_307b6c854fd8_iv -in deploy-key.enc -out deploy-key -d
rm deploy-key.enc # Don't need it anymore
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa
