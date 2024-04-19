#!/bin/sh
echo='/src/scripts/wait-for-it.sh db:5432 -t 30'

sh -c 'npx prisma migrate deploy'
sh -c 'yarn dev'