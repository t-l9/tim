(function() {
    // private scripts
    String.prototype.nl2br = function(){
        return this.replace(/\\r\\n/g, "");
    }

})();
