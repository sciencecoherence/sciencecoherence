# Science Coherence publishing repository

This repository holds the owner's approved copy of the Science Coherence website. The live website is currently hosted on Hostinger. GitHub Pages is a later migration, planned for when the Hostinger subscription ends in November 2026.

## The three layers

1. **Editing copy:** `C:\cohera\sciencecoherence.com`. Changes and previews happen here.
2. **Approved Git copy:** `C:\cohera\sciencecoherence.com\sciencecoherence.com`. Only the owner copies chosen site files into this nested folder. This folder is the local checkout of `sciencecoherence/sciencecoherence.com`; its `main` branch is the reviewed source.
3. **Hostinger release:** The GitHub workflow builds a `hostinger` branch from the approved copy. Hostinger should deploy this branch to the website's `public_html` directory.

The workflow does not copy anything from the outer editing folder. A local edit is not published merely because it was saved.

## Prepare a release

1. The owner copies the chosen public files from the editing copy into the approved Git copy.
2. In the approved Git copy, check `git status` and `git diff`. Include the files chosen for the public site and online Writing Room. Do not add private database settings, local drafts, tokens, backups, or test output.
3. Commit and push the approved changes to `main`.
4. In GitHub **Actions**, open **Prepare approved site for Hostinger**. A successful run updates the `hostinger` branch. A failed check leaves the previous release branch untouched.
5. In Hostinger, verify the deployment history and the live site.

The workflow checks for the website entry page and the online Writing Room entry files. It also rejects tracked private or local runtime data. It omits Git metadata, workflow files, documentation, local Python tools, SQL other than the Writing Room's required `schema.sql`, tests, drafts, and other local runtime files from the release branch. It retains the PHP and browser files for the online Writing Room. The owner decides which site assets belong in the approved copy; the workflow does not make that editorial decision.

## Connect Hostinger

In Hostinger, go to **Websites → this website → Dashboard → Advanced → Git**. Connect the GitHub repository `sciencecoherence/sciencecoherence.com`, choose the **`hostinger` branch**, and set the destination to the correct website root, normally `public_html`. Enable auto deployment and check the deployment history after a release. Do not connect production to `main`: doing so bypasses the workflow checks. Changing Hostinger's connected repository or branch can overwrite files in the destination, so compare the release with the live site before the first deployment.

Hostinger's current Git instructions: https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/

## Online Writing Room and private data

The online Writing Room can modify site content on the Hostinger server. Before any later Git deployment, bring any newer server-side `content.js` and `collections.js` changes back into the editing copy, then have the owner approve and copy them into this repository. Otherwise, a Git deployment can replace those online edits.

Database credentials remain outside the public web directory and outside Git. Do not commit `writingroom/data/`, `writingroom/inc/database.php`, `.env`, or token files. The Writing Room needs PHP and MySQL on Hostinger; GitHub Pages cannot run that server-side part when the hosting migration happens.
