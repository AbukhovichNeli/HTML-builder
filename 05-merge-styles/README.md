## Building the CSS Bundle
In the index.js file of the 05-merge-styles directory, develop a script that compiles the contents of the styles folder into a single file. The output file should be named bundle.css and located inside the project-dist folder.

### Folder Contents

Note that inside `05-merge-styles`, there is a `test-files` folder designed for checking the task, and no interaction with it is expected during the task solution.

### Description

Possible steps to complete the task:

1. Import all required modules.
2. Read the contents of the `styles` folder.
3. Check if an object in the folder is a file and has the correct file extension.
4. Read the style file.
5. Write the read data to an array.
6. Write the array of styles to the `bundle.css` file.

### Tips

For a visual demonstration of your script's execution, I recommend installing the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in vscode and launching the `index.html` file located in the `project-dist` directory using it.
