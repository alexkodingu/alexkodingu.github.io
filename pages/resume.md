---
layout: page
permalink: /resume/
---

{% include section.html content=site.data.resume.about %}

{% include resume-skills.html source=site.data.resume.skills class="bg-light" %}

{% include timeline-light.html timeline=site.data.resume.certification %}

{% include timeline-light.html timeline=site.data.resume.education %}

{% include timeline-light.html timeline=site.data.resume.work class="bg-light" %}
