# parcelLab FE task
First of all you need to have node 18+ and then

    npm install
    OR
    yarn install
    OR
    whatever-package-manager install

After that run

    npm run dev:mocked
 
## Realisation
Mostly it's lookalike from the initial mockups but with usage of the raw MUI component library.
There are several views:

 - Order form
 - Order view
 - Fallback error page

## Technical part

 - bootstrapped with vite
 - mui for UI components
 - react queries for async state management
 - react-hook-form for forms
 - vitest + testing-library for tests
 - msw for mocking

## Some other information

In order not to spend a lot of time on this task and move some topics to a possible later discussion some things are consciously omitted:
 - I wrote only part of tests just to make an understanding how other tests will look like. I hope that it's clear from the code structure how tests will look like for ArticlesTile, UpdatesTile
 - I decided to keep the same idea of UX that was in the mockups because I'm sure that designing new ones it is the 4 hours task itself :) So just some slight changes were added
