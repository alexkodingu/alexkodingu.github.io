---
layout: page
title: Blog
text: I write to share, and remembering details that I could forget
weight: 2
permalink: /blog/
---

<ul class="posts">
    {% for post in site.posts %}
        {%- assign title  = post.title -%}
        {%- assign date   = post.date -%}
        {%- assign tags   = post.tags -%}
        {%- assign url    = post.url -%}
        {% include post-list-element.html %}
    {% endfor %}
</ul>