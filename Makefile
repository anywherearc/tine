
.PHONY: bundle_main
bundle_main:
	mkdir -p ./dist/main/
	npx esbuild src/main/main.js --platform=node --packages=external --minify --bundle --outfile=./dist/main/main.js

.PHONY: main
main: bundle_main
	npx bytenode -e -c ./dist/main/main.js
	node scripts/loader.js main.jsc ./dist/main/index.js
	@rm ./dist/main/main.js

PRELOAD_SRC := ./src/preload
PRELOAD_OUT := ./dist/preload

# Find all .js files in the source directory
SOURCES := $(wildcard $(PRELOAD_SRC)/*.js)

# Define the target files by replacing .js with .jsc in the list of source files
TARGETS := $(SOURCES:$(PRELOAD_SRC)/%.js=$(PRELOAD_OUT)/%.jsc)

# Ensure the output directory exists
$(PRELOAD_OUT):
	mkdir -p $@

# Pattern rule for building .jsc from .js
$(PRELOAD_OUT)/%.jsc: $(PRELOAD_SRC)/%.js | $(PRELOAD_OUT)
	npx bytenode -e -c $<
	mv $(PRELOAD_SRC)/$(notdir $<)c $@
	node scripts/loader.js $(notdir $<)c $(PRELOAD_OUT)/$(notdir $<)

# Phony target for preload
.PHONY: preload
preload: $(TARGETS)

# Clean target for removing generated files
.PHONY: clean
clean:
	rm -rf dist/*

.PHONY: renderer
renderer:
	npx vite build 

.PHONY: pack
pack:
	npx electron-builder build --config electron-builder.config.js --dir

release: renderer preload main

preview: release
	npx electron ./dist/main/index.js