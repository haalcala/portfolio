# Extract the plugin id from the manifest.
PLUGIN_ID ?= $(shell jq -r '.name' package.json)
ifeq ($(PLUGIN_ID),)
    $(error "Cannot parse id from $(MANIFEST_FILE)")
endif

PLUGIN_VERSION ?= $(shell jq -r '.version' package.json)
ifeq ($(PLUGIN_VERSION),)
    $(error "Cannot parse id from $(MANIFEST_FILE)")
endif