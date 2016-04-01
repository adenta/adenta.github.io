# plainMaterial
Bare bones Jekyll template, built with [materialize.css](materializecss.com)

# Templates
I have two seperate templates. 'Projects' & 'Gallery'.

## Project
Projects have special attributes for a link to the project, a mobile screen-shot of the project, and a project logo.

Post about a project should have YAML that looks like:

    ---
    layout: project
    title:  "Page Title"
    date:   2015-08-20 8:45:31 -0500
    categories: list of categories for your project separated by spaces
    link: https://example.com/my-project
    screenshot: screen.png
    logo: logo.png
    ---


## Gallery
Galleries can also have a logo, but also have a folder attached to them. This folder is where the gallery images are stored. The folder of images should be stored in the assets directory, for consistency.

YAML:

    ---
    layout: gallery
    title:  "My Awsome gallery"
    date:   2016-03-11 2:45:31 -0600
    categories: post catagories
    folder: myfolder
    logo: logo.png
    ---
