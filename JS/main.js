var functionalEvents = function(events) {
    var events = events;
    var concussions = [];
    var  width = [];
    var  marginOffSet = [];
     var calendarHeight = 720;
    var calendarWidth = 600;
    var minutes = 60 * 12;

    var getProperties = function() {    
      for (var i = 0; i < events.length; i++) {
        width.push(0);
        marginOffSet.push(0);
		
      }
	
      concussions.forEach(function(period){
    
        let count = period.reduce(function(a,b) {
          return b ? a + 1 : a;
        })
		
		
        if (count > 1) {
          period.forEach(function(event, id) {
            if (period[id]) {
              if (count > width[id]) {
                width[id] = count;
              }
            }
            if (period[id] && !marginOffSet[id]) {
              marginOffSet[id] = period[id];
            }
          })
        }
      });
    }

    var getConcussions = function() {
      concussions = [];
      for (var i = 0; i < 24; i ++) {
        var time = [];
        for (var j = 0; j < events.length; j++) {
          time.push(0);
        }
		
        concussions.push(time);
      }
      events.forEach(function(event, id){
        let end = event.end;
        let start = event.start;
        let order = 1;
        while (start < end) {
          timeIndex = Math.floor(start/30);
          while (order < events.length) {
            if (concussions[timeIndex].indexOf(order) === -1) {
              break;
            }
            order ++;
          }
          concussions[timeIndex][id] = order;
          start = start + 30;
        }
        concussions[Math.floor((end-1)/30)][id] = order;
      });
    }
  
    var showEvent = function(height, top, left, units) {
      let manager = document.createElement("div");
      manager.className = "event";
      manager.innerHTML = 
      "<span class='title'> Sample Item </span> \
      <br><span class='location'> Sample Location </span>";
      manager.style.width = (calendarWidth/units) + "px";
      manager.style.height = height + "px";
      manager.style.top =  top + "px";
      manager.style.left = 120 + left + "px";
	  
	  
	  
    
      document.getElementById("events").appendChild(manager);
    }
	
  
    this.render = function() {
      
      var myManager = document.getElementById("events");
      myManager.innerHTML = '';
  
      getConcussions();
      getProperties();
  
      events.forEach(function(event, id) {
        let height = (event.end - event.start) / minutes * calendarHeight;
        let top = event.start /minutes * calendarHeight;
        let end = event.end;
        let start = event.start;
        let units = width[id];
        if (!units) {units = 1};
        let left = (calendarWidth / width[id]) * (marginOffSet[id] - 1) + 10;
        if (!left || left < 0) {left = 10};
        showEvent(height, top, left, units);
      });
    }
  }
  
  window.layOutDay = function(events) {
    let obj = new functionalEvents(events);
    obj.render();
  }

      window.onload = function() { 
                        layOutDay([ {start: 30, end: 150},{start: 540, end: 600},{start: 560, end: 620}, {start: 610, end: 670} ])
                        }