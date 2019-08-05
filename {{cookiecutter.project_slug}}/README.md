Installation Instructions
=========================
1. Clone the repo, preferably using ssh clone instead of https, so that
   it won’t bother for password every time when push or pull -ing.

2. Install ``nodejs``, ``npm`` and ``mongodb`` from the respective package
   repository. ( [`Installing required system packages`](#installing-required-system-packages) 

3. Run the following script to start the setup

        $ make setup
    warning:
      Don’t delete *env.example* though.

4. Add following things to ``.env`` file:
    - Replace ``DB_DEV_CONNECTION`` value if you have changed the mongodb connection settings.
    - Add ``FACEBOOK_APP_ID`` and ``FACEBOOK_APP_SECRET`` ([`Getting Facebook App id and App Secret`](docs/facebook.md) 
    - Add ``GOOGLE_APP_ID`` and ``GOOGLE_APP_SECRET`` ([`Getting Google App id and App Secret`](docs/google.md) 
    - Set the ``BASE_URL`` if changed.
    - Set ``SENTRY_DSN`` from DSN provided when creating project in ([`sentry`](https://docs.sentry.io/error-reporting/quickstart/?platform=node))

5.  Create superuser account 
    
    `npm run createuser -- <FirstName> <LastName> <username> <email@address.com> <password>`

6. Hurray. The setup has come to an end.
   Let’s test that we have setup everything correctly.

        $ make test

   For more details, read [`Running unit tests`](#running-unit-tests)

7. Run server.

        $ make -j3 run
8. You can also use on of the following command to run specific server.

        $ make run_nodemon
        $ make run_webpack
        $ make run_docs

9. Run the following command before committing any change.

        $ make test

## Installing required system packages
-----------------------------------

NodeJs and NPM
~~~~~~
    $ apt-get update
    $ apt-get install nodejs npm
~~~~~~~~~~
Mongodb
~~~~~~
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
$ sudo apt-get update
$ sudo apt-get install mongodb-org
$ sudo systemctl enable mongod
$ sudo systemctl start mongod
~~~~~~

## Running unit tests 

You can run unit tests in various way.
- You can run ``npm run test`` to run all the tests at once.
- You can run ``mocha tests/test-user.js`` for running one single test file where test-user.js is the test file.
- You can run `` mocha tests --grep 'Check View' `` where ``Check View`` is the name of the test.
- You can run the test script by right clicking and selecting run test in ``Webstorm``
- To run mocha tests in browser, append ``?test=1`` at the end of url.


