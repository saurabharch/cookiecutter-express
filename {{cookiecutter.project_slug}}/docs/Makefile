# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?= --open-browser
SPHINXBUILD   ?= sphinx-autobuild
SOURCEDIR     = source
BUILDDIR      = build
SPHINX := $(shell command -v sphinx-autobuild 2> /dev/null)
ifndef SPHINX
    $(error sphinx autobuild is not installed in your system, please install it using pip install sphinx-autobuild)
endif


# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -h "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -b $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
