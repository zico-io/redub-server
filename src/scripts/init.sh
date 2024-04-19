#!/bin/sh
echo='/src/scripts/wait-for-it.sh redub-dev.cts004sccc3s.us-east-1.rds.amazonaws.com:5432 -t 30'

sh -c 'npx prisma migrate deploy'
sh -c 'yarn dev'