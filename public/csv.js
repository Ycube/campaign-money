// Who are the top 10 candidates and their donation amounts, sorted by donation amount?
// What are the top 10 states and their donation amounts, sorted by donation amount?
// What is the total amount donated to each party?
// Allow the user to toggle between different election cycles (2012, 2014) and have #1,2,3 update with data for that cycle 
// Allow the user to enter a new campaign contribution for 2016 and have #1,2,3 update with the newly entered data
d3.csv('cand.csv', function (candData) {
  d3.csv('contrib.csv', function (contribData) {
    console.log(candData[0])
    console.log(contribData[0])

    d3.select('body')
      .data(candData)
      .enter()
      .append('p')
      .text(function(d) { return d.first_last_party; });

    // d3.select('bar')
    //   .data(contribData)
    //   .enter()
    //   .append('div')
    //   .attr('class', 'bar')
    //   .style('height', function(d) {
    //     var barHeight = d.amount / 1000;
    //     return barHeight + 'px';
    //   });

  });
});

