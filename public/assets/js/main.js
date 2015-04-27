(function() {
    // private scripts
    // String.prototype.nl2br = function(){
    //     return this.replace(/\\r\\n/g, "");
    // }



    document.getElementById( "nav-toggle" )
        .addEventListener( "click", function() {
            this.classList.toggle( "active" );
            var body = document.getElementsByTagName('body');

            document.querySelector('header').classList.toggle('active');
            document.getElementById('content-overlay').classList.toggle('active');
            document.querySelector('main').classList.toggle('active');
        });




})();
