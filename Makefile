#!/usr/bin/env bash

dep:
	@echo "Install dependencies required for this repo..."
	@yarn

test:
	@echo "Running test suites..."

build:
	@echo "Building the software..."

bundle:
	@echo "Bundling the software..."
	@yarn bundle

setenv:
	@echo "Setup .env file..."
	@echo "SKIP_PREFLIGHT_CHECK=true" > .env

github-init:
	@make setenv
	@make dep

include .makefiles/*.mk
