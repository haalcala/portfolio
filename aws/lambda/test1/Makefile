include build/setup.mk

ZIP_FILE ?= $(PLUGIN_ID)-$(PLUGIN_VERSION).zip

FUNCTION=${PLUGIN_ID}

BUCKET=tv3commas

AWS_REGION=us-east-2

AWS_PROFILE=harold_g14

AWS=aws --region ${AWS_REGION} --profile ${AWS_PROFILE}

.PHONY: build test run clean stop check-style fix-style run-unit emojis help package-ci storybook build-storybook update-dependencies

check-style: node_modules ## Checks JS file for ESLint confirmity
	@echo Checking for style guide compliance

	npm run check

fix-style: node_modules ## Fix JS file ESLint issues
	@echo Fixing lint issues to follow style guide

	npm run fix

check-types: node_modules ## Checks TS file for TypeScript confirmity
	@echo Checking for TypeScript compliance

	npm run check

test: node_modules ## Runs tests
	@echo Running jest unit/component testing

	npm run test

node_modules: package.json package-lock.json
	@echo Getting dependencies using npm

	npm install
	touch $@

package: build ## Packages app
	@echo Packaging webapp

	npm run build:clean 
	cd dist && zip -r9 ${ZIP_FILE} .

build: node_modules ## Builds the app
	@echo Building Webapp

	npm run build

run: node_modules ## Runs app
	@echo Running Webapp for development

	npm run run &

dev: node_modules ## Runs webpack-dev-server
	npm run dev-server

clean: ## Clears cached; deletes node_modules and dist directories
	@echo Cleaning Webapp

	@echo ${PLUGIN_ID}

	rm -rf dist
	rm -rf node_modules

	rm ${PLUGIN_ID}-*.zip

deploy: ## Deploys app to AWS S3
	@echo Deploying Webapp to AWS S3

	$(AWS) s3 cp dist/${ZIP_FILE} s3://tv3commas/${ZIP_FILE}
	$(AWS) lambda update-function-code --function-name ${FUNCTION} --s3-bucket ${BUCKET} --s3-key ${ZIP_FILE}

deploy-alias: deploy
	@echo Deploy and alias to ${PLUGIN_VERSION}

	@sleep 10
	
	@echo Publish new version
	$(AWS) lambda publish-version --function-name ${FUNCTION}
	
	@CURRENT_VERSION=$(shell $(AWS) lambda publish-version --function-name ${FUNCTION} | jq -r '.Version'); \
	echo CURRENT_VERSION=$$CURRENT_VERSION; \
	$(AWS) lambda create-alias --function-name ${FUNCTION} --function-version $$CURRENT_VERSION --name v$(shell echo ${PLUGIN_VERSION} | sed 's/\./_/g') || \
	$(AWS) lambda update-alias --function-name ${FUNCTION} --function-version $$CURRENT_VERSION --name v$(shell echo ${PLUGIN_VERSION} | sed 's/\./_/g')

new-release: test build
	npm run build:patch

	make package

	make deploy-alias

	make git-tag

git-tag:
	git tag v${PLUGIN_VERSION}
	git push origin v${PLUGIN_VERSION}

remove-git-tag:
	git tag -d v${PLUGIN_VERSION}
	git push --delete origin v${PLUGIN_VERSION}

get-aliases:
	@echo Get aliases for ${FUNCTION}
	$(AWS) lambda list-aliases --function-name ${FUNCTION}

## Help documentatin à la https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

update-dependencies: # Updates the dependencies
	npm update --depth 9999
	npm audit fix
	@echo Automatic dependency update complete.
	@echo You should manually inspect changes to package.json and pin exact versions of packages where appropriate.

