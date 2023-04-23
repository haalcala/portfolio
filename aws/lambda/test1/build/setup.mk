# Extract the plugin id from the manifest.
PLUGIN_ID ?= $(shell jq -r '.name' package.json)
ifeq ($(PLUGIN_ID),)
    $(error "Cannot parse id from $(MANIFEST_FILE)")
endif