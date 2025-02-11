﻿# Crown Coins Casino Automation Test (Playwright & Typescript)

This repository contains an automated test script for validating the user profile update functionality and coin balance retrieval in the Crown Coins Casino application.

## Test Purpose

This test aims to validate the user profile update functionality and the ability to retrieve user coin balances in the Crown Coins Casino application.

## Preconditions

- Valid user credentials (Email: watchdogstest02+11@sunfltd.com, Password: 123456)
- Node.js and npm installed
- Playwright and TypeScript set up in the project

## Steps to Execute

1. Navigate to the application URL
2. Log in with provided credentials
3. Access the user profile through the menu
4. Update the username and avatar
5. Verify the profile changes
6. Return to the lobby
7. Retrieve and display coin balances for both coin types

## Post-Conditions

- Log out of the application
- Reset the user profile to its original state (if required)

## Validation Criteria

- Successful login
- Profile update (username and avatar) is reflected correctly
- Ability to switch between coin types and retrieve balances


