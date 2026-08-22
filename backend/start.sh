#!/bin/sh
# Apply Prisma schema to the database
npx prisma db push
# Seed the database with initial data
npx prisma db seed
# Start the backend application
npm start
