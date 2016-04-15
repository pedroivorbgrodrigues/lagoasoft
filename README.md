Build a web application using NodeJS, that should:
- use ExpressJS as the web framework;
- render a HTML page when user tries to connect over http://localhost:3000 (any port can be used)
- use the templating language Jade to generate/render the HTML;
- when the page finishes loading, load some data in JSON format using ajax, and apply the data into the HTML using KnockoutJS library;
-- regarding the data, you should use an external source, like facebook api, youtube api or any other public api; instead of implementing the api call yourself, you can always find a node module in npmjs.org repository
-- the call should be proxied by your application, eg: HTTP GET http://localhost:3000/api, meaning, dont use a library in the client-side (browser) to get the data from the external source, implement a route (eg: GET /api) in your node express application
-- we want you to deal with asynchronous control flow; meaning, perform multiple parallel calls to your external source in your node server, get all results and return as one to the user; eg: get friends of userX and friends of userY, when all results are fetched, send results merged to the client; suggested pattern to deal with it: Promise A+ (you can use a library like Bluebird)
- use Bootstrap (css framework) to do the page layout
-- here, as an example, you can retrieve a JSON Array from your web application, and when data is loaded you can render a table with the contents from the array.
- use GIT (distributed version control system) and publish your code into a service like bitbucket or github.


Write a report regarding your activities, in Portuguese, English or German, describing:
- the difficulties during the development of this web app
- what was easy
- what did you like and didn't like
- how long did it take for you to complete each step, and if you already had previous knowledge of those technologies involved
- links of tutorials used to achieve success/failure
