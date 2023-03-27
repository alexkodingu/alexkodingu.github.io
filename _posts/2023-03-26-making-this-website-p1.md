---
title: Making this website (part-1)
tags: [web, Jekyll, GitHub Pages]
---

As I need a subject to inaugurate this blog section, talking about this website seams a perfect one.

## Technology choice

We have nowadays a lot of way to do a website. Of course the famous wordpress, but it's usually overweight for a static website as it's require a db and compute running to run the chunky wordpress (and the many security issues that can come with it).

To avoid this unnecessary stuff there is the static website solution. The idea is to generate all the webpage and put them somewhere to be serve on internet. Since [Jekyll](https://jekyllrb.com/) started this trend, a lot of other solution exist now: [Eleventy](https://www.11ty.dev/), [Hugo](https://gohugo.io/), [Next.js](https://nextjs.org/), [MkDocs](https://www.mkdocs.org/), [Hexo](https://hexo.io/), etc.

All of them work mostly the same:

- A way to use parameters/variable during the website generation
- Template of code: page, snippets, layout, js, css, etc. Can be created by you, or can be find all done with themes or modules.
- The content, usually in markdown, with some parameters for the generation.
- The builder that will generate the website with all of above.

At the generation of the website, you need more resources, then you can put the website anywhere. It's also help the security as you only have webpage no software, you just need to secure the way to serve them. Part of the issues with Wordpress is the security of the product and also how to secure the server under (ie: apache2, nginx, etc.), and it's happen that you cannot harden the server because the app on top couldn't run otherwise.

To know which one you want, you will need to look for their features, or look for techno you are the most familiar with, or see the variety of theme that they propose and one that include all you want so you spend less time setting it up.

As you already read with the article tags, I've chosen Jekyll. I already used it aside Hugo and MkDocs. But my choice was influence by the hosting option.

> small note about Hexo, I've crossed it 5years ago and seams really nice, but at that time, most of the documentation was in chinese. I always wondered if it was same than nginx, it took years to come to our references as the documentation was only in Russian. Hexo documentation is really better now, unfortunately a lot of module and theme are still only in Chinese.

## Hosting choice

After the webpages generation, there is many place to put them:

- Serve it with the generator: Usually only for testing purpose during the creation.
- On a server or a container with a web server like apache2 or nginx: Classic way, but we can avoid running compute for static website if we want.
- All major object storage service provide static website hosting with custom domain name configuration ( [aws s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html), [azure storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website), [gcp cloud storage](https://cloud.google.com/storage/docs/hosting-static-website)). If the site don't get a lot of audience, it should feet inside their free-tier. The only draw back: a bit of configuration is required and some checking during month if you don't want to go beyond the free-tier.
- Distribute the website with your favorite git hosting service (github, gitlab, bitbucket). They will provide you with a domain looking like ```<yourname>.<service>.io```, and you can also put your own. For most of the techno, you will have to generate the website in CI (usually you just have to copy/past the code). This solution seams the best by far as you have few things to do and cost nothing. You should use such service anyway to store your codebase, and it also reduce the complexity.

I went -like many others- to Github as using Jekyll only take few clicks in the parameter's repository (and don't require CI). I'm happy with it for now, but the Github choice of staying in version 3.X rather than upgrading to version 4, could make me change in the future.

## The limit of the themes

The themes are packing everything you need for generate the website. You usually just need to change few parameters and create or modify the content.

I already used one theme easily in the past for a travel blog. As the need was simple, I found a theme in the first page of the library, and went running quickly.

This time, it was more complicated as I wanted to display advanced data for my resume. I found [portfolYOU](https://github.com/YoussefRaafatNasry/portfolYOU) that having many things I want. After testing, I couldn't customize with ease. The complexity was caused by the load of features integrated. So I tried to reduce the complexity by removing some features. I finally gave up to use it, as I also saw it was integrated many modules that I couldn't understand (which many were not even used too). I finally got a simple theme [agency](https://github.com/raviriley/agency-jekyll-theme), and started to mix both.

With the hindsight, I was a bit rusty to start directly by customizing the first theme. But I still don't understand why it use more than what you need. I know there is the expression "Who can do more, can do less", but ... it's bad one. I can go to the bakery at 100m by car, but walk will do it great enough in a most cost efficient way!

## Enjoying front end technologies evolution

As I couldn't find my perfect theme, I had to watch under the hood to customized them. Gave me the opportunity to learn many new things. It was even more interesting as I was doing front end 10+years ago and the technologies have greatly improve to make it really more fun to build.

#### Sass & SCSS

This change the way to create the css. The disadvantage is that it need to be processed, as we already generate the website, it's just another small step to do during it. It's become funny to use more advanced mechanism like variables, nesting and mixins

Nesting example from [sass-lang guide](https://sass-lang.com/guide)

```scss
//scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css
//CSS Output
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

#### Bootstrap

This one is crazy good to create responsive website. I remember having multiple phone at my desk and testing the layout. My experience of front was hell at that time. And seeing how they packed this in bootstrap is incredible. My WOW effect was when I used the layout [grid](https://getbootstrap.com/docs/5.3/layout/grid/) for the first time.

#### Fontawesome

This is an icon library where you have everything you need. I remember getting a lot of icon, and putting location somewhere etc. Here you just have to set the class on the element and you are good to go, impressive stuff.

## Many to do

As I'm getting fun to use these tech, I want to keep learning and tweak things a bit more:

- Removing unnecessary module. It should improve the performance and reduce the leak of data.
- Cleaning up the code. I did many copy/past and remove many things already, maybe 10-30% of my codebase isn't useful.
- Packaging this as a new theme.
- Upgrading Jekyll and/or changing the hosting solution
