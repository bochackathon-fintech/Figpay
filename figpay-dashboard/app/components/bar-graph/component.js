import Ember from 'ember';

export default Ember.Component.extend({
  chartOptions: {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Month Breakdown'
    },
    xAxis: {
      categories: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December']
    },
    yAxis: {
      title: {
        text: 'Money spent'
      }
    }
  },
  
  chartData: [
    {
      
      data: [320,400,203,549,293,548,391,567,129,200,390,450]
    },
  ],
});
