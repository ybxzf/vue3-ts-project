
# 搭建属于自己的免费网站

**GitHub Pages** ：https://pages.github.com/，Websites for you and your projects. GitHub Pages 允许您将 GitHub 仓库转换为网站，展示您的简历、项目、文档或您想要与世界共享的任何其他内容。访问 https://pages.github.com 可以了解更多信息。  

**不是服务器买不起，而是免费的更有性价比！！！**

**我的需求：** 想要将自己的**前端**项目部署到github pages上，通过：https://username.github.io 来访问。  

# 创建github.io库  

1. 首先在gthub上新建repository，名字很重要，必须是："username.github.io"。  
2. 并设置权限为Public。 

# 基本配置

1. 进入"username.github.io"库。  
2. 新增或选择想要用于部署为网页的分支。  
3. 进入**Settings -> Pages**，在"**Build and deployment**"的"**Branch**"下设置需要部署的分支和文件路径。我设置的是test分支，/root根路径。 

# 部署项目

### 1. 部署单个项目

   1. 在库中新建**index.html**文件，在文件中写代码就行。  
   2. 或者将含**index.html**的文件或者项目打包之后的dist文件push到"username.github.io"这个库中。  
   3. **简单讲解：** github会自动执行Actions构建和部署页面（**pages build and deployment**）。因为github会去你设置的分支和路径解析index.html文件或者README.md文件。
   4. **访问：** 等待Actions构建和部署页面（**pages build and deployment**）执行完成，即可通过https://ybxzf.github.io/ 访问页面。  

### 2. 部署多个项目（以子文件夹形式）
   1. 想要部署多个不同的项目到**github.io** 库中，可以在库中创建相对应的文件夹。  
   2. 以**Vue**项目为例，在**github.io** 库中创建**vue-project1** 和**vue-project2** 两个文件夹。  
   3. 因为在**GitHub Pages** 中，都是通过URL访问数据的，所以我们在对应的Vue项目中就需要给项目路由添加默认路由前缀。如果不添加的话，**Actions** 可能成功，但是访问页面时会出现相关文件找不到的问题。
      1. Vue2项目的话，则在vue.config.js中添加```publicPath`: '/vue-project1'```；Vue3项目需要在vite.config.ts中添加```base: '/vue-project1'```，因为Vue3的defineConfig中没有**publicPath**属性，改为**base**属性了。
        ```sh
            module.exports = defineConfig({
                publicPath: '/vue-project1',
            })
        ```
        ```sh
            export default defineConfig({
                base: '/vue-project2',
            })
        ```  
      2. 并在路由文件中配置对应的**history**。
        ```sh
            const router = createRouter({
                //import.meta.env: config中配置的基本信息
                history: createWebHistory(import.meta.env.BASE_URL),
                // history: createWebHistory('/vue-project1'),
                routes:[
                    {
                        path: '/home',
                        name: 'home',
                        component: HomeView
                    },
                ]
            })
        ```
   4. **项目打包：** 将第一个Vue项目打包为dist文件，并将dist文件夹内的所有文件**push**到**github.io** 库的子文件夹**vue-project1** 中，对应的第二个Vue项目**push**到**vue-project2** 中。
   5. **访问：** 等待**Actions** 执行成功，即可通过https://ybxzf.github.io/vue-project1/ 和 https://ybxzf.github.io/vue-project2/ 正常访问到对应的部署页面。  
