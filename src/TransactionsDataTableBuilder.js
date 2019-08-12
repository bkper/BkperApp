/**
@class
A TransactionsDataTableBuilder is used to setup and build two-dimensional arrays containing transactions.
*/
function TransactionsDataTableBuilder(transactionIterator) {
  this.transactionIterator = transactionIterator;
  this.shouldFormatDate = false;
  this.shouldFormatValue = false;
  this.shouldAddUrls = false;

  /**
  Defines whether the dates should be formatted based on {@link Book#getDatePattern|date pattern of book}
  @returns {@link TransactionsDataTableBuilder|TransactionsDataTableBuilder} the builder with respective formatting option.
  */
  TransactionsDataTableBuilder.prototype.formatDate = function() {
    this.shouldFormatDate = true;
    return this;
  }
  /**
  Defines whether the value should be formatted based on {@link Book#getDecimalSeparator|decimal separator of book}
  @returns {@link TransactionsDataTableBuilder|TransactionsDataTableBuilder} the builder with respective formatting option.
  */
  TransactionsDataTableBuilder.prototype.formatValue = function() {
    this.shouldFormatValue = true;
    return this;
  }
  
  /**
  Defines whether the value should add Attachments links
  @returns {@link TransactionsDataTableBuilder|TransactionsDataTableBuilder} the builder with respective add attachment option.
  */
  TransactionsDataTableBuilder.prototype.addUrls = function() {
    this.shouldAddUrls = true;
    return this;
  }  
  
  /**
  @returns {Array} an two-dimensional array containing all {@link Transaction|transactions}.
  */
  TransactionsDataTableBuilder.prototype.build = function() {
    var filteredByAccount = transactionIterator.getFilteredByAccount();

    var header = new Array();
    var transactions = new Array();
    var finalArray = new Array();
    var headerLine = new Array();

    if (filteredByAccount != null) {

      headerLine.push("Date");
      headerLine.push("Account");
      headerLine.push("Description");
      headerLine.push("Debit");
      headerLine.push("Credit");

      transactions = this.getExtract2DArray_(transactionIterator, filteredByAccount);
      if (filteredByAccount.isPermanent()) {
        headerLine.push("Balance");
      }
      
      headerLine.push("Recorded at");
      if (this.shouldAddUrls) {
        headerLine.push("Attachment");
      }
      header.push(headerLine);
    } else {
      headerLine.push("Date");
      headerLine.push("Origin");
      headerLine.push("Destination");
      headerLine.push("Description");
      headerLine.push("Amount");
      headerLine.push("Recorded at");
      
      if (this.shouldAddUrls) {
        headerLine.push("Attachment");
      }
      transactions = this.get2DArray_(transactionIterator);
      header.push(headerLine);
    }

    if (transactions.length > 0) {
      transactions.splice(0, 0, headerLine);
      transactions = BkperUtils.convertInMatrix(transactions);
      return transactions;
    } else {
      return [headerLine];
    }
  }

  TransactionsDataTableBuilder.prototype.get2DArray_ = function(iterator) {
    var transactions = new Array();

    while (iterator.hasNext()) {
      var transaction = iterator.next();

      var line = new Array();

      if (this.shouldFormatDate) {
        line.push(transaction.getInformedDateText());
      } else {
        line.push(transaction.getInformedDate());
      }

      line.push(transaction.getCreditAccountName());
      line.push(transaction.getDebitAccountName());

      if (transaction.getDescription() != null) {
        line.push(transaction.getDescription());
      } else{
        line.push("");
      }
      if (transaction.getAmount() != null) {
        if (this.shouldFormatValue) {
          var decimalSeparator = iterator.book.getDecimalSeparator();
          var fractionDigits = iterator.book.getFractionDigits();
          line.push(Utils_.formatValue_(transaction.getAmount(), decimalSeparator, fractionDigits));
        } else {
          line.push(transaction.getAmount());
        }
      } else {
        line.push("");
      }
      
      if (this.shouldFormatDate) {
        line.push(transaction.getPostDateText());
      } else {
        line.push(transaction.getPostDate());      
      }
      
      var urls = transaction.getUrls();
      
      if (this.shouldAddUrls && urls != null && urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
          line.push(urls[i]);
        }
      } else if (this.shouldAddUrls) {
        line.push("");
      }      

      transactions.push(line);
    }

    return transactions;
  }

  TransactionsDataTableBuilder.prototype.getExtract2DArray_ = function(iterator, account) {
    var transactions = new Array();

    while (iterator.hasNext()) {
      var transaction = iterator.next();
      var line = new Array();

      if (this.shouldFormatDate) {
        line.push(transaction.getInformedDateText());
      } else {
        line.push(transaction.getInformedDate());
      }

      if (transaction.getCreditAccount() != null && transaction.getDebitAccount() != null) {

        if (this.isCreditOnTransaction_(transaction, account)) {
          line.push(transaction.getDebitAccount().getName());
        } else {
          line.push(transaction.getCreditAccount().getName());
        }

      } else{
        line.push("");
      }
      if (transaction.getDescription() != null) {
        line.push(transaction.getDescription());
      } else{
        line.push("");
      }


      if (transaction.getAmount() != null) {

        var amount = transaction.getAmount();

        if (this.shouldFormatValue) {
          amount = Utils_.formatValue_(transaction.getAmount(), iterator.book.getDecimalSeparator(), iterator.book.getFractionDigits());
        };

        if (this.isCreditOnTransaction_(transaction, account)) {
          line.push("");
          line.push(amount);
        } else {
          line.push(amount);
          line.push("");
        }
      } else{
        line.push("");
        line.push("");
      }

      if (account.isPermanent()) {
        if (transaction.getAccountBalance() != null) {
          var balance = transaction.getAccountBalance();
          if (this.shouldFormatValue) {
            balance = Utils_.formatValue_(balance, iterator.book.getDecimalSeparator(), iterator.book.getFractionDigits());
          };
          line.push(balance);
        } else{
          line.push("");
        }
      }
      
      if (this.shouldFormatDate) {
        line.push(transaction.getPostDateText());
      } else {
        line.push(transaction.getPostDate());      
      }

      var urls = transaction.getUrls();
      if (this.shouldAddUrls && urls != null && urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
          line.push(urls[i]);
        }
      } else if (this.shouldAddUrls){
        line.push("");
      }      
      
      transactions.push(line);
    }
    return transactions;
  }

  TransactionsDataTableBuilder.prototype.isCreditOnTransaction_ = function(transaction, account) {
    if (transaction.getCreditAccount() == null) {
      return false;
    }
    return transaction.getCreditAccount().getId() == account.getId();
  }

}
