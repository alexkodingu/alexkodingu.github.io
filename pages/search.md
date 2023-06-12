---
layout: page
permalink: /search
---

<section class="page-section {{ include.class }}" id="{{ include.content.title | downcase }}">
  <div class="container">

    <div id="404" style="display: none;">
      <h4 class="section-heading text-uppercase">{{ site.search.no_results }}</h4>
    </div>

    <div id="post" style="display: none;">
      <h4 class="section-heading text-uppercase">Blog</h4>
      <ul id="results-post" class="posts"> </ul>    
    </div>

    <div id="project" style="display: none;">
      <h4 class="section-heading text-uppercase">Project</h4>
      <ul class="row row-cols-1 row-cols-md-2 row-cols-md-3 g-4" id="results-project">
      </ul>
    </div>

    <div id="resume" style="display: none;">
      <h4 class="section-heading text-uppercase">Resume</h4>
      <ul id="results-resume"> </ul>    
    </div>

    <div class="card-columns" id="new-results" style="display: none;"></div>

    <div id="template" style="display: none;">

      {%- assign title         = "{title}" -%}
      {%- assign desc          = "{desc}" -%}
      {%- assign date          = "{date}" -%}
      {%- assign tags          = "{tags}"-%}
      {%- assign url           = "{url}" -%}
      {%- assign urltype       = "fas fa-external-link-alt" -%}
      {% include project-card.html %}
      
      {%- assign title       = "{title}" -%}
      {%- assign date        = "2012" -%}
      {%- assign tags        = "{tags}" -%}
      {%- assign url         = "{url}" -%}
      {% include post-list-element.html %}

    </div>
  </div>

<script src="/assets/js/simple-jekyll-search.min.js"></script>
<!-- Configuration -->
<script src="/assets/js/customize-search.js"></script>

{% comment %}
event="fixcard()">
{% endcomment %}
