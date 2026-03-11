Scripting with PowerShell (quite powerful!).,
Using git to create a repository.,
Everytime you want to save changes, use git commit. Setup a free repo on GiHub you can push to, good as a backup. Make it private if needed.,
Create various documents, use markdown format.,
Use Claude or Codex to create detailed plan. Save it as a markdown file in the repository.,
Ask the other model to review the plan. Ask for additional ideas and improvements!,
Start executing the plan, one step at a time, with tests.,

Step 5 can be the hard step here. Make sure to request that all created scripts are testable (I recommend Pester for testing). This is important! Try to begin with a MVP. A kind of proof-of-concept, that can be extended. Start simple. Enter a brainstorming session with the model and discuss your ideas.

If you follow this route, I can provide you with some lessons learned from how to communicate with the APIs. It will save you time as you don't have to go through the same problems.

A typical workflow would be:
You have the state of your complete project saved in markdown files. Maybe binary files also.,
You have instructions for the next iteration. That could be in a markdown file of its own.,
You use a PowerShell script to initiate your next "research". This script will take your instructions, power up one of the CLIs, send over the instructions.,
There are generally two ways to return the result of a session. Either the CLI edits the result files directly, which means it need to be in edit mode, or it just returns the result to the starting script.

e-use ideas or implementations by Karpathy, make sure to say this in your brainstorming session. It depends on how much you want to explore on yourself.

But it sure is interesting to implement this on your own.