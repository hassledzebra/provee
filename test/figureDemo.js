data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 2],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        chart = new google.visualization.PieChart(document.getElementById('defaultOutput'));
        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        var value = data.getValue(selectedItem.row, 0);
        alert('The user selected ' + value);
      }
