
# AImages 1.0
<p style="img-align:center;"><img alt= "AImage logo" src= "https://github.com/nyxon1/Aimages/blob/523e0a8698c8eb3fafca4779b3dd0f899e72b449/src/logo.png"></p>

AImages 1.0 is a prompt to image generator based on DALLE 2 API model. You can generate image in three diferent ways.

 1. Prompt to image:
    
-just write your text in search section and click "Generate" button.

 2. Suprise me:
    
-click on the "Suprise me" to fill search section with random text and then "generate" button.

 3. Generate variation:
    
-click on the "uploand an image" and choose a .png file from your computer. (image must be a 256 x 256 png file!)

**For now generated images are limited to 1 photo only because of OpenAi fees*



## Demo
<img src= "https://github.com/nyxon1/Aimages/blob/cb0261d705164bd609ce28ecfdacf5fd0e774261/IMG_0958.gif" > 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`=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



## FAQ

#### 1. How many photos can I generate for each query?

For now generated images are limited to 1 photo only because of OpenAi fees.

#### 2. Why uploading image is limited to 256px only? 

This restriction is imposed by OpenAi.

#### 3. Why layout is so ascetic?

Because i am not an Artist :)

## Optimizations

On branch "Typescript" i am working on migration from JS to TS. For now I have some conflict with Typescript versions in this project. For your safety use only the stable version on main branch. 

## Tech Stack

**Client:** React,

**Server:** Node, Express

## Author

- [@KonradNyk](https://www.github.com/nyxon1)

