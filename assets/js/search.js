---
---

// builds lunr
let index = lunr(function () {
  this.field('title')
  this.field('content', {boost: 10})
  this.field('category')
  this.field('tags')
  this.ref('id')

  {% assign count = 0 %}{% for post in site.posts %}

    this.add({
    title: {{post.title | jsonify}},
    category: {{post.categories[0] | jsonify}},
    content: {{post.content | strip_html | jsonify}},
    tags: {{post.tags | jsonify}},
    id: {{count}}
    });

    {% assign count = count | plus: 1 %}{% endfor %}


});


// builds reference data
let store = [{% for post in site.posts %}{
  "title": {{post.title | jsonify}},
  "link": {{ post.url | jsonify }},
  "image": {{ post.image | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "category": {{ post.categories[0] | jsonify }},
  "excerpt": {{ post.content | strip_html | truncatewords: 30 | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endfor %}]


// builds search
$(document).ready(function() {
  $('input#search').on('keyup', function () {

    let resultdiv = $('#results');

    // Get query
    let query = $(this).val();

    // Search for it
    let result = index.search(query);

    // Show results
    resultdiv.empty();

    // Add status
    resultdiv.prepend('<p class="">'+result.length+' résultat(s) trouvé(s)</p>');

    // Loop through, match, and add results
    for (let item in result) {
      let ref = result[item].ref;
      let searchitem = `
            <li class="result">
                <a href="${store[ref].link}">
                   <h4>${store[ref].title}</h4>
                </a>
                <p>${store[ref].excerpt}</p>
            </li>
        `;
      resultdiv.append(searchitem);
    }

  });
});