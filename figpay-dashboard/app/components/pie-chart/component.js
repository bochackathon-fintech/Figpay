import Ember from 'ember';

export default Ember.Component.extend({
  chartOptions: {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Month Breakdown'
    },
    xAxis: {
      categories: ['Utility Bills', 'Leisure', 'Clothing']
    },
    yAxis: {
      title: {
        text: 'Money spent'
      }
    }
  },
  
  chartData: [
    {
      
      data: [320,400,203]
    },
  ],
});
