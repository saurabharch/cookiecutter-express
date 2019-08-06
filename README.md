
Cookiecutter Express
======================


Features
--------

* Testing setup with `mocha` and `supertest`
* CircleCI configuration for build, test and deploy script
* Ansible playbook for remote setup and update
* Sphinx_ docs: Documentation ready for generation with, for example, ReadTheDocs_
* Detailed make file for remote update, build or run nodemon, webpack and other tool
* Webpack, nodemon, handlebarjs, saas compilation, morgan logging preconfigured.
* Sentry error tracking setup
* Preconfigured passport js authentication with login required middleware
* JSHint, csurf, flash, helmet and other standard applied.

See: Cookiecutter: https://github.com/audreyr/cookiecutter


Quickstart
----------

Install the latest Cookiecutter if you haven't installed it yet (this requires
Cookiecutter 1.4.0 or higher)::

    pip install -U cookiecutter

Generate a Python package project::

    cookiecutter https://github.com/amritghimire/cookiecutter-express.git

Or if you prefer ssh version::

    cookiecutter git@github.com:amritghimire/cookiecutter-express.git

Then:

* Create a repo and put it there.
* Add the repo to your CircleCI .
* Run ``make setup`` to setup the required packages and steps.
* Add a private key to circleci from project settings.
* Add the key to authorizedkey in your server.
* Add ANSIBLE_HOST_KEY_CHECKING  =false environment variable in circleci. 
* Update fingerprint in `.circleci/config.yml` to the key you added in circleci
* Install sphinx-autobuild to start building docs.
* Read the generated Readme file for more detail.

Reference
----------
* `project_slug` : It is used as unique slug for the project in many place like apache config.
* `peoject_url` : The production server for the project.
* `project_static_url` : The cdn server for static files, specify same as project_url if otherwise. 
* `app_title`: Title of project 
* `description` : Description of project for package.json file.
* `year` : Current year for LICENSE FILE
* `version` : Version for package.json 
* `secret_key` : Secret key for signing the session cookie
* `remote_server`: The remote server ip or hostname where ansible will be connecting to.
* `remote_user` : The remote user to be logged in as.
* `port` : Specify default port. 
* `git_project` : Git project url where the server will be updated from. 


### Fork This / Create Your Own

If you have differences in your preferred setup, I encourage you to fork this
to create your own version. Or create your own; it doesn't strictly have to
be a fork.

* Once you have your own version working, add it to the Similar Cookiecutter
  Templates list above with a brief description.

* It's up to you whether or not to rename your fork/own version. Do whatever
  you think sounds good.

Or Submit a Pull Request
--------------------------

I also accept pull requests on this, if they're small, atomic, and if they
make my own packaging experience better.
