---
layout: page
permalink: /resume/
---

{% include container.html content=site.data.resume.about %}

{% include timeline-light.html timeline=site.data.resume.education %}

{% include resume-skills.html source=site.data.resume.skills class="bg-light" %}


{% include timeline-light.html timeline=site.data.resume.work %}
