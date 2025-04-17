#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
  pnpm install
  pnpm prisma migrate dev
  pnpm run dev
else
  echo "Installing production dependencies..."
  pnpm install
  pnpm prisma generate
  pnpm prisma migrate deploy
  pnpm run build
  pnpm run start
fi