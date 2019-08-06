SHELL:=/bin/bash

PYTHON := $(shell command -v python3 2> /dev/null)
ifndef PYTHON
    $(error Python3 is not available in your system, please install python3)
endif

NPM := $(shell command -v npm 2> /dev/null)
ifndef NPM
    $(error npm is not installed in your system, please install npm)
endif

NPX := $(shell command -v npx 2> /dev/null)
ifndef NPM
    $(error npx is not installed in your system, please install npx using npm install -g npx)
endif

MONGO := $(shell command -v mongo --version 2> /dev/null)
ifndef MONGO
   $(error mongo is not installed in your system, please install mongo)
endif

.DEFAULT_GOAL := help
COLOR=\x1b[36m
NO_COLOR=\x1b[m]

.PHONY: setup
## Setup the project 
setup: 
	@cp -nv env.example .env
	@cp -nv env.production ansible/.env.production
	@npm install
	@npx webpack
	@echo 'Create admin user using make createuser'

.PHONY: remote_update
## Update the remote with master code
remote_update:
	@ansible-playbook ansible/playbook.yml -i ansible/inventory.yml

.PHONY: remote_setup
## Setup the remote server 
remote_setup:
	@ansible-playbook ansible/setup.yml -i ansible/inventory.yml --ask-become-pass
	@echo "Setup certbot and user account"

.PHONY: install
## Install npm packages
install: 
	@echo "Installing Node dependencies"
	@npm install

.PHONY: run
## Run webpack server and nodemon 
run: run_nodemon run_webpack run_docs

.PHONY: run_nodemon
## Run nodemon package
run_nodemon: 
	@echo "Running nodemon"
	@npx nodemon

.PHONY: run_webpack
## Run webpack
run_webpack:  
	@webpack "Running webpack"
	@npx webpack --watch

.PHONY: run_docs
## Run docs server
run_docs:
	$(MAKE) -C docs html

.PHONY: build
## Build npm package and docs
build: build_webpack build_docs

.PHONY: build_webpack
## Build webpack package
build_webpack: 
	@npx webpack

.PHONY: build_docs
## Build docs
build_docs:
	@sphinx-build  -M html docs/source docs/build 
	xdg-open docs/build/html/index.html

.PHONY: test
## Test the lint and test script
test:
	@npm run jshint
	@npm run test


.DEFAULT_GOAL := help

# Inspired by <http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html>
# sed script explained:
# /^##/:
# 	* save line in hold space
# 	* purge line
# 	* Loop:
# 		* append newline + line to hold space
# 		* go to next line
# 		* if line starts with doc comment, strip comment character off and loop
# 	* remove target prerequisites
# 	* append hold space (+ newline) to line
# 	* replace newline plus comments by `---`
# 	* print line
# Separate expressions are necessary because labels cannot be delimited by
# semicolon; see <http://stackoverflow.com/a/11799865/1968>
.PHONY: help
## Show this help message
help:
	@echo -e "Usage:\n\tmake <target>\n"
	@echo "$$(tput bold)Available targets:$$(tput sgr0)"
	@echo
	@sed -n -e "/^## / { \
		h; \
		s/.*//; \
		:doc" \
		-e "H; \
		n; \
		s/^## //; \
		t doc" \
		-e "s/:.*//; \
		G; \
		s/\\n## /---/; \
		s/\\n/ /g; \
		p; \
	}" ${MAKEFILE_LIST} \
	| LC_ALL='C' sort --ignore-case \
	| awk -F '---' \
		-v ncol=$$(tput cols) \
		-v indent=19 \
		-v col_on="$$(tput setaf 6)" \
		-v col_off="$$(tput sgr0)" \
	'{ \
		printf "%s%*s%s ", col_on, -indent, $$1, col_off; \
		n = split($$2, words, " "); \
		line_length = ncol - indent; \
		for (i = 1; i <= n; i++) { \
			line_length -= length(words[i]) + 1; \
			if (line_length <= 0) { \
				line_length = ncol - indent - length(words[i]) - 1; \
				printf "\n%*s ", -indent, " "; \
			} \
			printf "%s ", words[i]; \
		} \
		printf "\n"; \
	}' \
	| more $(shell test $(shell uname) = Darwin && echo '--no-init --raw-control-chars')
	@echo -e $$(echo "version commit@" && git rev-parse --short HEAD)
