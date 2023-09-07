# BubbleFetcher &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/toss/slash/blob/main/.github/CONTRIBUTING.md)


 BubbleFetcher is a library designed to simplify communication with Bubble.io, a no-code tool.

With BubbleFetcher, developers can easily integrate Bubble applications with their own stack and accelerate the development process. 

BubbleFetcher provides a wrapper over the Bubble API, providing easy-to-use methods for common tasks such as CRUD operations, authentication, and accessing data.


<br/>
<br/>


# Installation

Install bubbleFetcher with NPM or Yarn

```bash
  npm i bubblefetcher
  
  or

  yarn add bubblefetcher
```
     
<br/>
<br/>

# How to Use ?

1. Import bubbleFetcher
```js
import { bubbleFetcher } from "bubblefetcher";
```

2. Configure variables
```js
bubbleFetcher.init({
  apiKey : "your-bubble-api-key",
  domain : "your-bubble-domain",
  isDev : true || false
})

```
Example
```js
const BUBBLE_API_KEY = process.env.BUBBLE_API_KEY
bubbleFetcher.init({
  apiKey : BUBBLE_API_KEY,
  domain : "edu.todomall.kr",
  isDev : process.env.NODE_ENV === "development"
})

```

3. Request
    
  - #### bubbleFetcher.get(objectName[, sortOption[, constrains]])
    ```js
        // getAll
        const users = await bubbleFetcher.get("/user")

        // getAllWithSort
        const users = await bubbleFetcher.get("/user", {
          sortOption: {
            sort_field: "name_text",
            descending: true || false,
          },
        });

        // getAllWithConstarint
        const users = await bubbleFetcher.get("/user", {
          constraints: {
            key: "name_text",
            constraint_type: "equals",
            value: "target value",
          },
        });
    
        // getAllWithPage
        const users = await bubbleFetcher.get("/user", {
            pageOption: {
              cursor: 0,
              limit: 10,
            },   
        })


        // get with Sort and Constarint and Page
        const users = await bubbleFetcher.get("/user", {
         sortOption: {
           sort_field: "name_text",
           descending: true || false, 
         },
         constraints: {
           key: "name_text",
           constraint_type: "equals",
           value: "target value",
         },
         pageOption: {
           cursor: 0,
           limit: 10,
         },
       });
    ```

  - #### bubbleFetcher.patch(objectName[, body]) && bubbleFetcher.put(objectName[, body])
    ```js
      await bubbleFetcher.patch("/user" , {
        name_text : "Sangkun-svg",
        age_number: 23
      })
      
      await bubbleFetcher.put("/user" , {
        name_text : "Sangkun-svg",
        age_number: 23
      })
    ```

  - #### bubbleFetcher.delete(objectName)
    ```js
      await bubbleFetcher.delete("/user")
    ```


<br/>
<br/>

# Used By
This project is used by the following companies:

 - [TodoMall](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [GrowingPeople](https://www.growingpeople.site/)



<br/>
<br/>

# Contributing

Contributions are always welcome!

<br/>
<br/>


# Reference
- https://bugfender.com/blog/how-to-create-a-javascript-library/
- https://www.tsmean.com/articles/how-to-write-a-typescript-library/


