import Ember from 'ember';
import defaultTheme from '../../themes/default-theme';
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
  theme: defaultTheme,
  chartData: [
    {
      name:"in",
      data: [320,400,203,549,293,548,391,567,129,200,390,450]
    },
    {
      name:"out",
      data: [300,200,200,749,500,548,391,567,29,200,390,350]
    },
  ],
});
