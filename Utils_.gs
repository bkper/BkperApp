var Utils_ = {
  
  dateFormatPeriodicityMap_: {
    "MM/dd/yyyy": {YEARLY: "yyyy", MONTHLY: "MM/yyyy", DAILY: "MM/dd/yyyy"},
    "MM/dd/yyyy": {YEARLY: "yyyy", MONTHLY: "MM/yyyy", DAILY: "MM/dd/yyyy"},
    "dd/MM/yyyy": {YEARLY: "yyyy", MONTHLY: "MM/yyyy", DAILY: "dd/MM/yyyy"}
  },
  
  round: function(num) {
    if (num == null) {
      return null;
    }
    return Math.round(num*100)/100;
  },
  
  formatValue_: function(value, decimalSeparator) {
    
    if (value == null){
        return "";
    } 
    
    if (typeof value == "string") {
      if (value.trim() == '') {
        return "";
      }
      value = parseFloat(value);
    }
    
    if (value == null){
        return "";
    }     
    
    var formattedValue = (value.toFixed(2)) + "";
    if (decimalSeparator == DecimalSeparator.DOT) {
      return formattedValue.replace(/\,/g, '.');
    } else {
      return formattedValue.replace(/\./g, ',');
    }
    return formattedValue;
  },
  
  formatDate: function(date, pattern, timeZone) {
    if (date == null || !(date instanceof Date)) {
      return date;
    }
    
    if (timeZone == null) {
      timeZone = Session.getScriptTimeZone();
    }    
    
    var formatedDate = Utilities.formatDate(date, timeZone, pattern);
    return formatedDate;
  },

  getDateFormatterPattern: function(datePattern, periodicity) {
    var pattern = datePattern;

    if (periodicity == Periodicity.MONTHLY) {
      pattern = "MM/yyyy"
    }
    if (periodicity == Periodicity.YARLY) {
      pattern = "yyyy"
    }
    return pattern;
  },  
  
  getRepresentativeValue: function(value, credit) {
    
    if (credit != null && !credit) {
      return value *-1;
    }
    return value;
  },  

  wrapObjects: function(wrapper, wrappeds) {
    var newObjects = new Array();
    if (wrappeds != null) {
      for (var i = 0; i < wrappeds.length; i++) {
        var newObject = Utils_.wrapObject(wrapper, wrappeds[i]);
        newObjects.push(newObject);
      }
    }
    return newObjects;
  },
  
  wrapObject: function(wrapper, wrapped) {
    if (wrapped == null) {
      wrapped = new Object();
    }
    var w = Object.create(wrapper);
    w.wrapped = wrapped;
    return w;
  },
  
}

