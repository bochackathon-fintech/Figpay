import Ember from 'ember';
import defaultTheme from '../../themes/default-theme';
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
  theme:defaultTheme,
  chartData: [
    {
      
      data: [30,30,40]
    },
  ],
});
