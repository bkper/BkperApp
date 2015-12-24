var BalancesService_ = {

  getBalances: function(bookId, query) {
    var params =
        {
          "query" : query,
          "time" : Date.now()
        };
    var responseJSON = API.call_("get", "balances", bookId, params);
    var report = JSON.parse(responseJSON);
    return report;
  }
}
