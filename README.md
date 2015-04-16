##BkperApp

[bkper](http://about.bkper.com/features.html) provides a data aggregation service for collecting and manage bookkeeping info, to report accounts balances over time, in the Google Apps environment.

It's usually used for financial and accounting management, but it can also be used to count any countable resources over time, like minutes, hours, users, cattle and so on.

BkperApp works the same way your favorite Google Apps Script library works, like CalendarApp, DocumentApp, SpreadsheetApp etc, and it is safely authorized using OAuth2 protocol:

<div style="text-align:center; padding-bottom:15px">
  <img src="http://developers.bkper.com/images/docs/BkperApp-overview.png" alt="BkperApp overview">
</div>

The [Sheets](https://chrome.google.com/webstore/detail/bkper/cgjnibofbefehaeeadeomaffglgfpkfl), [Forms](https://chrome.google.com/webstore/detail/bkper/hfhnjepoehncolldclpdddgccibbpeda) and [Docs](https://chrome.google.com/webstore/detail/bkper/cdialfondjmoflglobnohjcbicdhcaaj) Add-ons were built on top of the BkperApp library.



###Authorization

To authorize the library, you just need to run the OAuth2 flow only once per account. This can be easily done when you install any Add-ons, or by clicking and running this [authorization script](https://script.google.com/macros/s/AKfycbz8F5FGTTW72pQBfDvGjEB4eglVmOfhG_a9Qb3EXYjVo5IICg/exec)



###Setup
To add it to your script, do the following in the Apps Script code editor:

1. Click on the menu item "Resources > Libraries..."
2. In the "Find a Library" text box, enter the project key "**My8jgp9C1MEeWVxuYNppyFgoOxUd2qb-3**" and click the "Select" button.
3. Choose a version in the dropdown box (usually best to pick the latest version).
4. Click the "Save" button.



###Record Transactions

To record your first transaction, after authorizing and setup, copy and paste the function bellow:

      function recordATransaction() {

        var book = BkperApp.openById("agtzfmJrcGVyLWhyZHIOCxIGTGVkZ2VyGNKJAgw");

        book.record("#gas 63.23");

      }

Exchange the parameter of the function **openById** for the id of the book you want to record the transaction. This is the same parameter found on the URL accessed on [bkper.com](https://www.bkper.com):

<div style="text-align:center; padding-bottom:15px">
  <img src="http://developers.bkper.com/images/docs/bookId.png" alt="BkperApp overview">
</div>

Now run the **recordATransaction** function and see the record appearing on the bkper screen:

<div style="text-align:center; padding-bottom:15px">
  <img src="http://developers.bkper.com/images/docs/recording.png" alt="Recording">
</div>


You can also record transactions in batch by passing an Array of strings as the <b>record</b> method parameter:

      function batchRecordTransactions() {

        var book = BkperApp.openById("agtzfmJrcGVyLWhyZHIOCxIGTGVkZ2VyGNKJAgw");

        var transactions = new Array();

        transactions.push("#breakfast 15.40");
        transactions.push("#lunch 27.45");
        transactions.push("#dinner 35.86");

        book.record(transactions);

      }

The above code will send all records in a bulk. Very useful for importing large amount of data without the risk of reaching script limits.





###Query Transactions

Each book is a large database and every interaction is done in terms of queries. Everytime you "select" an Account, by clicking on left menu at [bkper.com](https://www.bkper.com), you are actually filtering transactions by that Account.

Every query is shown in the search box on top of the page:

<div style="text-align:center; padding-bottom:15px">
  <img src="http://developers.bkper.com/images/docs/query.png" alt="Query">
</div>

When you search transactions, the **search** method returns an iterator to let you handle potentially large datasets:

      function queryTransactions() {

        var book = BkperApp.openById("agtzfmJrcGVyLWhyZHITCxIGTGVkZ2VyGICAgKCtg6MLDA");

        //Search returns an interator to deal with potencial large datasets
        var transactionIterator = book.search("acc:'Bank' after:01/04/2014");

        while (transactionIterator.hasNext()) {
          var transaction = transactionIterator.next();
          Logger.log(transaction.getDescription());
        }

      }

Run the **queryTransactions** function, exchanging your bookId, with the same query, check the log output and you will see the same descriptions:


TEST

