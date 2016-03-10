//do all the d3 in here
d3.xhr("http://localhost:3333/candidates", function (data) {



  var x = data.response;
  x = JSON.parse(x);
  // console.log(x);

  // x.forEach(function(candidates) {
  //   console.log(candidates['first_last_party'])
  // });


  var svg = d3.selectAll('names')
              .append('svg')
              .data(x)
              .enter()
              .append('p')
              .text(function(d) { return d.first_last_party });
});