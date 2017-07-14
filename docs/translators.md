# Translators Guide

This document outlines a workflow for engineers, translators and other collaborators who want to update copy.

## Overview

All of the files containing copy are found in the [locales folder](https://github.com/r1b/news-wires/tree/master/news-wires-ui/locales).
There you will find one `.js` file for each language supported by news-wires. You will edit these files to add / update copy.
Once you are done editing, you will create a [pull request](https://help.github.com/articles/about-pull-requests/) summarizing
your changes. A collaborator will review your changes and eventually approve the request. Your changes will then be merged and
deployed to the site.

## Prerequisites

You must have a GitHub account to edit the copy for news-wires. You can create an account by simply following the sign up flow
on the [GitHub homepage](https://github.com).

Once you have created an account, send your username to `sysop@r1b.solutions`. The maintainer will add you as a collaborator on
the [news-wires repository](https://github.com/r1b/news-wires). You will receive an email confirming that you have been added
as a collaborator.

## Workflow

### Step 1: Identify the file you need to edit

Each file in the [locales folder](https://github.com/r1b/news-wires/tree/master/news-wires-ui/locales) has a
[two-character code](http://www.ietf.org/rfc/rfc3066.txt) indicating which language it targets. You can find the name of your
target language by consulting a [lookup table](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

### Step 2: Open the file in GitHub

Navigate to the target file in the GitHub UI. At the very top of the file, just before the code is displayed, you will see a
number of icons on the right hand side. Click the "pencil" icon to begin editing the file.

### Step 3: Edit the file

Before we get into the details it is important to understand the format we are working with. The copy is stored in a
[JSON](https://en.wikipedia.org/wiki/JSON) file. JSON consists of keys and values in the following format:

```javascript
{
  'key1': 'value1',
  'key2': 'value2',
  'keyn': 'valuen'
}
```

All JSON objects start and end with curly braces. The entries in the object consist of a quoted *key* followed by a
colon & a space, then a quoted *value* followed by a comma.

In news-wires we have a few formatting preferences:

* Use **single** quotes (`'`) for quoting
* Do not append a comma on the last line of the object

In the context of our work, a *key* is a unique identifier for its corresponding *value*. The *value* contains the actual copy.

Now we will detail three possible editing scenarios.

#### Translate existing copy

This is the most likely scenario - the copy that you want to edit is in the [english file](https://github.com/r1b/news-wires/blob/master/news-wires-ui/locales/en.js).

1. Identify the *value* in the english file that contains the copy you want to translate.
2. Note the corresponding *key*
3. Open the file containing the copy in your target language.
4. Identify the *key* you noted earlier.
5. Edit the *value* associated with that key.

If the *key* does not exist in the file for your target language, follow the instructions in [Adding new copy](#adding-new-copy).


#### Adding new copy

You will need to create an entirely new entry in the JSON object.

1. Navigate to the last entry in the object.
2. Append a comma to that entry.
3. Create a new line and align your cursor with the previous entry.
4. Enter a quoted key. Your key can be formatted any way you would like - make the key descriptive enough that one can infer
the content of the value from the key. If the text to be translated is a single word, it is acceptable to use that word as
the key. Keys are **always** written in english. Keys are **unique** - a new key must not conflict with an existing key.
5. Append a colon & space to the key
6. Enter a quoted value.

#### Updating existing copy

In this scenario, the copy you need to edit is already available & translated.

1. Identify the line in your target file that has the copy you want to edit.
2. Edit the quoted value to your liking

### Step 4: Submit your copy for review

Once you are finished with your edits you can submit your changes to a reviewer. At the bottom of the GitHub UI there is a 
bubble with the title **Commit changes**. Select the radio button that says *Create a new branch for this commit and start a 
pull request*. You can edit the generated branch name if you would like - it doesn't matter. Click the green button that 
says *Propose file change*.

### Creating a pull request

You will be navigated to the pull request interface. Modify the title at the top of the bubble if you like - it doesn't 
matter. Add a descriptive comment that summarizes your changes.

On the right hand side there is a column where you can add additional metadata to the pull request. Click the link under
**Reviewers** that says *request one*. Find your reviewer in the list of users - `r1b` is the best reviewer if you have not 
been assigned another. Additionally, click the link under **Assignees** that says *assign yourself*.

Review your changes and the corresponding summary. If everything looks OK click the green button that says *Create pull 
request*.

The reviewer will be notified that you have completed your edits. Shortly they will review your pull request. If everything 
looks OK the reviewer will approve your request and merge the changes. If further editing is required, the reviewer will 
correspond with you in the comments section of the pull request that you created. You should receive email notifications for 
these comments so there is no need to repeatedly check the pull request page.

Congratulations! You are now a news-wires contributor. 🎉

### FAQ

#### I need to enter a single quote in some copy

You must *escape* the quote like this: `\'`.

#### I need to add bullets, links or other HTML in the copy

No problem! You can include any HTML that you would like.

#### I want to save my work as I go along

I'm glad you do! You have many options:

* Create a branch ahead of time and commit changes at your leisure (instructions TODO)
* Periodically copy the entire file to your clipboard
* Edit the JSON in an external editor and paste the final result into the GitHub UI

### Summary

Don't be afraid of making a mistake! Anything that is done can be un-done. Have fun. The maintainer is always available to
assist you at `sysop@r1b.solutions`.
