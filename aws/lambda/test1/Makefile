.PHONY: build test run clean stop check-style fix-style run-unit emojis help package-ci storybook build-storybook update-dependencies

check-style: node_modules ## Checks JS file for ESLint confirmity
	@echo Checking for style guide compliance

	npm run check

fix-style: node_modules ## Fix JS file ESLint issues
	@echo Fixing lint issues to follow style guide

	npm run fix

check-types: node_modules ## Checks TS file for TypeScript confirmity
	@echo Checking for TypeScript compliance

	npm run check-types

test: node_modules ## Runs tests
	@echo Running jest unit/component testing

	npm run test

node_modules: package.json package-lock.json
	@echo Getting dependencies using npm

	npm install
	touch $@

package: build ## Packages app
	@echo Packaging webapp

	mkdir tmp
	mv dist tmp/client
	tar -C tmp -czf mattermost-webapp.tar.gz client
	mv tmp/client dist
	rmdir tmp

build: node_modules ## Builds the app
	@echo Building mattermost Webapp

	rm -rf dist

	npm run build

run: node_modules ## Runs app
	@echo Running mattermost Webapp for development

	npm run run &

dev: node_modules ## Runs webpack-dev-server
	npm run dev-server

clean: ## Clears cached; deletes node_modules and dist directories
	@echo Cleaning Webapp

	rm -rf dist
	rm -rf node_modules

## Help documentatin à la https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

update-dependencies: # Updates the dependencies
	npm update --depth 9999
	npm audit fix
	@echo Automatic dependency update complete.
	@echo You should manually inspect changes to package.json and pin exact versions of packages where appropriate.

