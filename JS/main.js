var layOutDay = function(events) {
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
	 // console.log("hello due");
  
  //console.log(concussions);
  
  // for eeach
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
  
      
	
  
    this.render = function() {
      
      var myManager = document.getElementById("events");
      //
  
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
        
		console.log("top:"+top+"end:"+end+"start:"+start);
    }
	
	
  }
  
  

    
 var obj = new  layOutDay([ {start: 30, end: 150},{start: 540, end: 600},{start: 560, end: 620}, {start: 610, end: 670} ]);
                        
  obj.render();
  