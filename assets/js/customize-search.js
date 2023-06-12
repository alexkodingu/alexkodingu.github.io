const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(reshape_page);
targetNode = document.getElementById("new-results");
observer.observe(targetNode, config);

function reshape_page(){
    list = ["project", "resume", "post"];
    list.forEach(clean_div);

    jsdata = refactor_result();

    trigger404(jsdata.length)

    for (let i = 0; i < jsdata.length; i++) {
        const obj = jsdata[i];
        if(obj.category == "post"){
            create_post(obj);            
        }else if(obj.category == "resume") {
            create_li(obj);
        }else if(obj.category == "project") {
            create_project(obj);
        }
      }
    
    list.forEach(check_visibility)
}

function trigger404(entry){
    const div = document.getElementById("404");
    if (entry == 0){
        div.style.display = "unset";
    }else{
        div.style.display = "none";
    }
}

function create_li(info){
    const ul = document.getElementById("results-"+info.category);
    const li = document.createElement('li');
    const a =  document.createElement('a');
    ul.classList.add("resume")
    a.textContent = "[" + info.title + "] " + info.desc;
    a.href= "/" + info.category + "#" + info.title
    li.appendChild(a);
    ul.appendChild(li)
}

function create_project(info){
    const ul = document.getElementById("results-"+info.category);
    
    // duplicate template hidden in html
    const templateDiv = document.getElementById("template");
    templateProject = templateDiv.querySelector(".col");
    const newDiv = templateProject.cloneNode(true);

    // edit title & url
    const title = newDiv.querySelector('.card-body h5');
    if(info.url == "{url}"){
        title.textContent = info.title;
    }else{
        const anchor = newDiv.querySelector('.card-body h5 a');
        anchor.href = info.url;
 
        //title.outerHTML = title.outerHTML.replace("{url}",info.url);
        title.outerHTML = title.outerHTML.replace("{title}",info.title);
    }

    // edit description
    const desc = newDiv.querySelector('.card-body .card-text');
    desc.textContent = info.desc;

    // edit tags
    const tagTemplate = newDiv.querySelector('.card-body .card-text a');
    tags = info.tags.split(',');

    const tagParent = tagTemplate.parentNode;
    for (x in tags){
        value=tags[x].trim()
        const newtag = tagTemplate.cloneNode(true);
        newtag.href = "/search?q=" + value
        //newtag.classList = "badge rounded-pill text-light bg-primary border-primary ms-1"
        newtag.textContent = value
        tagParent.appendChild(newtag);
    }
    tagParent.removeChild(tagTemplate);

    // add project to the view
    ul.appendChild(newDiv)
}

function create_post(info){
    const ul = document.getElementById("results-"+info.category);
    
    // duplicate template hidden in html
    const templateDiv = document.getElementById("template");
    templatePost = templateDiv.querySelector("li");
    const newDiv = templatePost.cloneNode(true);


    // edit date
    const date = newDiv.querySelector('span');
    date.textContent = info.date;

    // edit title & url
    const title = newDiv.querySelector('a');
    title.textContent = info.title;
    title.href = info.url

    // edit tags
    const tagTemplate = newDiv.querySelector('.badge');
    tags = info.tags.split(',');

    const tagParent = tagTemplate.parentNode;
    for (x in tags){
        value=tags[x].trim()
        const newtag = tagTemplate.cloneNode(true);
        newtag.href = "/search?q=" + value
        newtag.textContent = value
        tagParent.appendChild(newtag);
    }
    tagParent.removeChild(tagTemplate);

    // add post to the view
    ul.appendChild(newDiv)
}

function clean_div(divname){
    const div = document.getElementById("results-"+divname);
    div.replaceChildren([]);
}

function check_visibility(divname){
    const ul = document.getElementById("results-"+divname);
    const div = document.getElementById(divname);
    if (ul.childElementCount != 0 ) {
        div.style.display = "unset";
    } else {
        div.style.display = "none";
    }
}

function refactor_result(){
    try{
        data = document.getElementById('new-results').textContent;
        data = data.substr(0,data.length-1);
        data = data.replace(/\(/g, "{");
        data = data.replace(/\)/g,"}");
        data = "[" + data + "]";
        return JSON.parse(data) ;
    }catch(err){
        return JSON.parse("[]");
    }
}

const sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('new-results'),
  json: '/pages/search.json',
  searchResultTemplate: '("title":"{title}","category":"{category}","tags":"{tags}","url":"{url}","date":"{date}","desc":"{desc}"),',
  noResultsText: '{{ site.search.no_results}}'
})

setTimeout(() => {
  // manage parameters pass in url
  let params = new URLSearchParams(document.location.search);
  sstring=params.get("q")
  if (sstring != ""){
    let field = document.getElementById('search-input')
    field.value = sstring
    sjs.search(sstring)
  }
}, 500)