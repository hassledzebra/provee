function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        var value = data.getValue(selectedItem.row, 0);
        alert('The user selected ' + value);
      }