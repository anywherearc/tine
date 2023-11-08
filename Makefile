
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

# Find all .js files in the source preload directory
SOURCES := $(wildcard $(PRELOAD_SRC)/*.js)

# Define the target files by replacing .js with .jsc in the list of source files
TARGETS := $(SOURCES:$(PRELOAD_SRC)/%.js=$(PRELOAD_OUT)/%.jsc)
.PHONY: $(PRELOAD_OUT)/%.jsc

$(PRELOAD_OUT):
	mkdir -p $@

# Pattern rule for building bytecode from .js
$(PRELOAD_OUT)/%.jsc: $(PRELOAD_SRC)/%.js | $(PRELOAD_OUT)
	npx bytenode -e -c $<
	mv $(PRELOAD_SRC)/$(notdir $@) $@
	node scripts/loader.js $(notdir $@) $(PRELOAD_OUT)/$(notdir $<)

preload: $(TARGETS)

# Clean target for removing all generated files
clean:
	rm -rf dist/* out/*

.PHONY: renderer
renderer:
	npx vite build 

.PHONY: pack
pack:
	npx electron-builder build --config electron-builder.config.js --dir

.PHONY: release
release: renderer preload main 

preview: 
	npx electron ./dist/main/index.js