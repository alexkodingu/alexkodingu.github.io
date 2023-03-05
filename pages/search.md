---
layout: page
permalink: /search
---

{% capture result_elem %} 
  <div class="project card">
      <div class="card-body">
          <h5 class="card-title text-center">
                <a href="{url}" target="_blank"><i class="fas fa-external-link-alt"></i></a> |&nbsp;
                {title}
          </h5>
          <p class="card-text">{desc}</p>
          <p class="card-text">
             <a href="" class="badge badge-pill text-light bg-primary border-primary ml-">
                {tags}
            </a>
          </p>
      </div>
  </div>
{% endcapture %}

<section class="page-section {{ include.class }}" id="{{ include.content.title | downcase }}">
  <div class="container">
    <div class="card-columns" id="results-container" event="fixcard()">

    </div>
    <div class="card-columns" id="new-results">

    </div>
  </div>
</section>
<script src="/assets/js/simple-jekyll-search.min.js"></script>

<!-- Configuration -->
<script>

  function fixcard(){//dirty
    // fix tags display
    //class of tag miss 1 on purpose to find them and make good class for new one
    const collection = document.getElementsByClassName("badge badge-pill text-light bg-primary border-primary ml-")
    while(collection.length > 0){
      tags = collection[0].innerText.split(",")
      parent = collection[0].parentElement
      for ( let x in tags){
        newa =  document.createElement('a')
        newa.href = "{{site.search.perma}}?{{site.search.key}}="+tags[x].trim()
        newa.classList = "badge badge-pill text-light bg-primary border-primary ml-1"
        newa.textContent = tags[x].trim()
        parent.appendChild(newa);
      }
      collection[0].remove()
    }
    //fix url display
    const titlescollection = document.getElementsByClassName("card-title text-center")
    for ( let i in titlescollection){
      if (titlescollection[i].children[0].pathname == "/%7Burl%7D"){ //too much dirty
        titlescollection[i].textContent = titlescollection[i].textContent.slice(20)
      }
    }
  }
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver(fixcard);
  targetNode = document.getElementById("results-container");
  observer.observe(targetNode, config);

  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/pages/search.json',
    searchResultTemplate: '{{ result_elem | strip_newlines }}',
    noResultsText: '{{ site.search.no_results}}'
  })
  setTimeout(() => {
    let params = new URLSearchParams(document.location.search);
    sstring=params.get("q")
    if (sstring != ""){
      let field = document.getElementById('search-input')
      field.value = sstring
      sjs.search(sstring)
    }
  }, 500)

</script>