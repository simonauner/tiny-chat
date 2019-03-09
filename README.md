# tiny-chat

A tiny chat project with Firebase Realtime database

## Getting started

1. `npm install`
2. If you don't have the firebase tools: `npm i -S firebase-tools`
3. Create a `firebase.config.js` file:
    ```
    export default {
        apiKey: <string>,
        authDomain: <string>,
        databaseURL: <string>,
        projectId: <string>,
        storageBucket: <string>,
        messagingSenderId: <string>,
    };
    ```

### Dev environment

Use two terminals, one for the web server and one for the frontend watcher.

-   `npm run start:dev` for server nodemon
-   `npm run dev` for frontend parcel watch

### Production build

1. `npm run build` to build frontend code
2. `firebase deploy` to deploy to firebase

## TODO

-   ✅ Sort chat channels after updated or per alphabetical name
-   ✅ Service for date formatting
-   Add Web share API
-   ✅ Service for getting and setting user info in localstorage
-   ✅ Shrink the JS size!
-   ✅ Keep global state if user has added username
-   ✅ Styling

## Left out of scope for now

-   Send Firebase data through the server to get one-way data direction (plus: permissions)
-   Auth
-   Checking if chat rooms/usernames are already in use

## Performance enhancements

I started out choosing Preact over React because of its small JS footprint and increased performance. However, adding the Firebase JS library really ruins that performance increase. Could we possibly try to find some performance improvements?

For reference, file size in falling order:

1. Firebase: 232 kb
2. React router: 24 kb
3. History polyfill: 17 kb
4. Preact-redux: 14 kb
5. Preact compat: 10 kb
6. Preact: 9 kb
7. Redux: 7 kb

Plus some smaller libs.. Total: 360 kb (92.5 kb gzipped).

Performance measurement (Disable cache, 6x CPU slowdown, "Fast 3g" simulated in Chrome):

### "Starting position"

1. CSS and JS files start to download at about 680 ms.
1. CSS (PAM) finishes in about 700 ms. (1 390 ms elapsed)
1. JS finished in 1.1 s (1.7 s elapsed)
1. First contentful paint 2.5 s
1. First meaningful paint 2.5 s (same as above)

#### Could this be made faster?

On my local machine the first paint occurs at around 2.3 s

Let's see what we can improve from the waterfall here.

![alt text](assets/readme/waterfall-1.png 'Logo Title Text 1')

My first idea was to split up the Firebase JS code and use Google's CDN to get some kind of parallell downloads going. It seems that this single idea wouldn't make anything better though, actually worse! The browser queues up the download instead and the time it takes to get something meaningful on the screen actually increases!

![alt text](assets/readme/waterfall-2.png 'Logo Title Text 1')

However, could that be optimised by removing the fonts? It seems that those calls are what's causing the queues. After messing around some time with PAM and thinking about switching to another CSS framework (headache!!!), I decided to just rip the styles I needed from PAM and ditch the fonts entirely.

So, to compare before and after:

|                                           | PAM   |  Own CSS | Fonts    |  Total   |
| ----------------------------------------- | ----- | -------- | -------- | -------- |
| With PAM                                  | 11 kb |  658 b   |  ~ 33 kb |  44.1 kb |
|  Heartlessly ripping out just what I need |  0    |  2.8 kb  |  0       |  2.8 kb  |

And as the rule goes, if you can inline your CSS in the HTML file and still get under 14 kb you do it.
So, with these changes:

1. Rip out the parts of PAM that are needed (manual tree-shaking, ey!)
2. Inline the CSS
3. Bundle the firebase scripts again

![alt text](assets/readme/waterfall-3.png 'Logo Title Text 1')

-   We're now down from around 3 s for the "name box" to paint to 1.7 s. That's 44% shorter time!
-   For complete rendering we're down from 3.66 s at best to 2.38, a 35% improvement!

Now then, could we go back to separating the Firebase scripts from the app scripts to see if we can cut the time to rendering complete even more?

As it turns out, it doesn't change much. And we still have to wait for Firebase scripts before the app script can be run since it refers to a lot of global `firebase` objects... What if we could wrap that in some kind of promise?

I wrapped the `firebase` global in a `Promise` and then I could load the app script before the Firebase scripts. But once again, it didn't change the timing. And since it introduced an unneccessary complexity, I removed it. Ventures in performance land can lead you to a dead end sometimes. I think for now I have to stop chasing the possible improvements and continue with something else.
