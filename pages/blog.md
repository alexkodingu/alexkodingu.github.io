---
layout: page
title: Blog
text: I write to share with others, and remembering details that I could forget
weight: 2
permalink: /blog/
---

<ul class="posts">
    {% for post in site.posts %}
        <li><span class="text-muted">{{ post.date | date_to_string }}</span> &raquo;
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {%- for tag in post.tags -%}
            <span class="badge rounded-pill text-light bg-primary border-primary ms-1">
                {{ tag }}
            </span>
        {%- endfor -%}
        </li>
    {% endfor %}
</ul>