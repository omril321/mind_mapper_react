# History Mind Mapper (HMM)

A cool utility which lets you visually explore the connections of your web searches.  

![](./HMM_demo.gif)

### Description
Every developer knows the following pattern:
1. Stumble a problem in subject `X`.
2. Query for `X` in the web.
3. Realize that `X'` should be queried instead.
4. (Optional) repeat steps 2-3 a few more times.
5. Find a solution for the problem. Enjoy happiness.
6. Forget the specific solution a few months later. Stumble the same problem. 
7. Repeat steps 2-6. 

My vision was building a tool which lets you visually explore the knowledge you have collected while querying the web.  
The tool will scan your browsing history, analyze the searches you've made, and build a model for all the things you've searched.  
If certain entities has strong connection (e.g. `React` and `Jest`), the tool will find it.   

### This project has discontinued 😢
As for writing these lines, the tool is able to do almost everything I've said (finding a connection between entities is not quite ready).  
Also, the "History Exploration Mode" is not ready.
The main algorithm for this tool is complicated, and a lot of work is required in order to finish this project.  
I have discontinued the work on this project for now, since I have other interesting projects which will make quicker progress than this one.  

In the unlikely scenario where I'll get requests for finishing this project, I'll do it.  
In the meanwhile, you are more than welcome to read the rest of this file, forking the repo and do a PR. 

### A bit about how it works 
When launched, the application starts a worker service which analyzes the user's history in the background.  
Google searches are detected, and words are extracted from each query.  
Entities that have common words are linked together, even if there were other Google searches between them.  
Words that appear the most will be processed first, since they are most likely more interesting for the user.  
Each update message is being sent to a React component, which displays the current data.  


### Terminology
#### `PossibleSearchGroup`
A group of history visits, which starts with a Google search visit for a certain query.  
It is possible that the history visits that come after the Google search are not related to the query that was searched.
An example for `PossibleSearchGroup` can contain: 
* A Google search for `React Jest`
* 3 different visits for a related result to `React Jest`
* YouTube video for funny cats
   

#### `SearchGroup`
Similar to `PossibleSearchGroup`, however the history visits after filtered:  
All history visits in a `PossibleSearchGroup` are "related" to the Google query.  
For now, two phrases are "related" if they have at least one common word. This is not enough, but it seems to work.  
Continuing the example from `PossibleSearchGroup`, a `SearchGroup` can contain:
* A Google search for `React Jest`
* 3 different visits for a related result to `React Jest`

(The Youtube videos were filtered out, since they have no common words with `React` and `Jest`)

#### `SearchSession`
A collection of sequential `SearchGroup`s, which their searches are related.  
For example, a valid `SearchSession` can contain the following:
* A `SearchGroup` for `React`, and the visits that come afterwards and contain `React`.
* A `SearchGroup` for `React Jest`, and the visits that come afterwards and contain `React` or `Jest`.
* A `SearchGroup` for `React Jest stuck`, and the visits that come afterwards and contain `React`, `Jest` or `Stuck`.

This structure enables us finding multiple searches that span over a larger number of searches, or took several hours / days.

### Running locally
#### Chrome extension
1. Clone the repo
2. Run `npm run webpack`. This will create a bundle under `dist/compiled`, along with a few more files that are related to the service workers.
3. Install the extension as a [private Chrome app](https://support.google.com/chrome/a/answer/2714278?hl=en).  
**PLEASE NOTE** that this will replace your default history viewer until disabled.
4. Open the history viewer (in Mac, CMD + Y)

#### Tests
Run `Jest` tests + lint using `npm test`
 
#### Developing
After installing the Chrome extension locally, run `npm run watch`.  
This will run npm in watch mode. After each change, refresh the application.  
For now, `webpack-dev-server` is not supported.

#### Storybook
`npm run storybook`

