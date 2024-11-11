const data = [    
    {   
        id: 1,
        title: "My Portfolio",
        thumbnail: "thumbnail",
        model: "gltf path",
        description: [
            "I built my portfolio using the React JS framework along with PMNDRS's React THREE Fiber (R3F) Library. R3F is a react library which facilitates using the Three JS library with React, allowing WebGL elements to be directly rendered in parallel with React's declarative paradigm.",
            "The centerpiece of this project is the particle system that is scene on the landing page - a system of about 200,000 particles. This is actually a relatively small system.",
            "The technique behind this type of rendering consists of GPGPU (General Purpose computing on the Graphics Processing Unit), and Ping-pong buffering via a Frame Buffer Object. The particle positions are taken from a base model, and stored into a texture as RGBA coordinates, which we can manipulates to utilize as the X, Y, and Z coordinates of each particle in space. The alpha component is used to determine the lifetime of each particle.",
            "The 'ping-pong' effect (i.e. the Frame Buffer Object's functionality) occurs such that this original texture stores the previous RGB/XYZ coordinates of each particle, which we use to calculate the next position that is stored in an entirely separate texture. This entirely separate texture then feeds it's current data back into the original, and the process repeats itself. The GPGPU computation render offers the advantage of processing this on all 200,000 particles in parallel, offering incredibly fluid animations with minimal overhead in storage, as the positions are overwritten almost as quickly as they are calculated.",
            "With a good 3D model which contains plenty of well-spread out vertices, we can have 1 million+ particles with minimal impact on performance. Here's a great example of a project that I created which uses about 2 million particles: https://particlephysics.netlify.app/",
            "Aside from the WebGL rendering, I used the GSAP library to implement a horizontal scroll rig for my Projects section, as well as to handle some small animations throughout the portfolio. I also utilized CSS media queries to follow responsive, mobile-first design principles.",
            "Moving forward, I would love to implement a fluid simulation as a layer on top of the rendered scene (which is essentially just a texture) - and in this case, I would probably move to a Vanilla JS setup. Stay tuned for updates!"
        ],
        links: {github: 'https://github.com/Raamtaro/Readme-For-Recruiters', live: 'https://rsanghani.netlify.app/'},
        skills: ['javascript', 'react', 'three js', 'webGL']
    },
    {
        id: 2,
        title: "Messenger",
        thumbnail: "thumbnail",
        model: "gltf path",
        description: [
            "This project is my take on a messenger chat app. The server has been completed using Node/Express JS, which communicates with a pSQL database that is managed through the Prisma ORM.",
            "The schema of the database consists of the User, Profile, Conversation, and Messages models. The simplest relationship is between the User and Profile models - which is just 1:1. But things get a bit more tricky when we account for Conversations.",
            "On one hand, a Conversation can only be authored by one User. However, a Conversation can also contain 'Many' participants - and so there is a 1:1 relationship from Author to Conversation, but a Many:Many relationship between Users and Conversations as 'Many' users may participant in as 'Many' conversations as the author deems fit (as the author would be the one controlling this aspect of the conversation).",
            "As far as Messages are concerned, a Conversation can contain Many messages, i.e. a 1:Many relationship between Conversations and Messages. On the other hand, a Message can only be authored by one User, therefore having a 1:1 relationship with that User.",
            "The Prisma ORM comes in incredibly handy. Were this being created using raw SQL, we would need to account for intermediary tables to handle the Many:Many relationship between Users (specifically participants) and Conversations. However, Prisma allows us to implicitly (or explicitly, depending on the needs of the developer) define these types of relationships. Should we define this implicitly, as in this project, Prisma will create the temporary table in the background when handling the appropriate queries. On the other hand, were we to explicitly define the relationship, we would have to create a separate model in the Schema file - however, this is still MUCH easier than doing this via Raw SQL.",
            "While building the controllers for separate routes, It was important to account for the way in which results were returned - i.e. filtering and sorting. For example, it would be quite a lot for the React frontend to retrieve a list of the User's current conversations, and then sort them in descending order from when the most recent Message was added to each Conversation.",
            "To ensure smooth UX/UI, it's much better to handle this on the server-side. Prisma's Transaction API comes in incredibly handy for this, allowing us to update a custom field in the Conversation Model whenever a Message is sent to a particular conversation. From there, when we query the Conversation endpoint to retrieve all of the User's current conversations, we can simply sort by the custom field and return our results in the proper order.",
            "Currently, I am building the frontend in React. Please stay tuned for live links and updates."
        ],
        links: {github: 'https://github.com/Raamtaro/RaamtaroMessengerServer', live: ''},
        skills: ['javascript', 'react', 'node js', 'express', 'pSQL', 'prisma']
    },
    {
        id: 3,
        title: "WebGL Project Showcase",
        thumbnail: "thumbnail",
        model: "gltf path",
        description: ["This project is my Three JS portfolio. This is a work in progress, so keep an eye out for updates!"],
        links: {github: '', live: ''},
        skills: ['javascript', 'three js', 'webGL']
    },
    {
        id: 4,
        title: "Photo Gallery",
        thumbnail: "thumbnail",
        model: "gltf path",
        description: [
            "The core functionality of this project is to give photographers/artists a platform in which they can display their pieces and organize them into different collections. WebGL is used to give these photos cool effects to make the exhibits/collections feel a bit more interactive and immersive.",
            "The server of this project is a pSQL database managed through the Prisma ORM, which is queried to and from via an Express and Node JS backend. The server follows a RESTful architecture, and utilizes JWT and Local strategies for authorization and authentication, respectively.",
            "The models that make up my pSQL tables are Users, Images and Collections. The relationships in this are fairly straightforward - Users can own many Collections and many Images, and Collections can also own many Images.",
            "The frontend is separated from the backend (and thus is Client-Side Rendered) and built with the React JS framework. This project also utilizes React THREE Fiber and WebGL effects.",
            "The biggest challenge in this project certainly had to be mapping DOM elements to their respective WebGL counterparts. This is a very non-trivial task, as the Three JS world coordinates are not the same as DOM pixel coordinates - and so a lot of tricky math is involved with converting to and from one another and making sure that WebGL planes are put into the same place as the DOM iamges. Additionally, there are some tricks within the Shader programs themselves with calculating the correct Aspect Ratios and UV coordinates to make sure that the WebGL elements are not rendered with the incorrect sizing, nor are they sacrificing the resolution of the applied texture (which is the webGL equivalent of images, but as a sampler2D).",
            "Moving forward, I would love to implement a wider variety of shader effects as well as customization options for the exhibits themselves. It would be cool if the end user could upload GLTF files so that they may display 3D models as well as images, or entirely change the style of the way that the images are displayed. Stay tuned!"

        ],
        links: {github: 'https://github.com/Raamtaro/PhotoExhibitor', live: ''},
        skills: ['javascript', 'three js', 'webGL', 'react', 'node js', 'express', 'pSQL', 'prisma']
    }
]
    


export default data