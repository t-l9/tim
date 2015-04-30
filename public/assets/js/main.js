(function() {
    // private scripts
    var body      = document.getElementsByTagName('body');
    var header    = document.querySelector('header');
    var nav       = document.querySelector("nav");
    var hamburger = document.getElementById( "nav-toggle" );
    var mainTag   = document.querySelector('main');
    var overlay   = document.getElementById('content-overlay');

    function removeActive(element) {

        hamburger.classList.remove('active');
        header.classList.remove('active');
        mainTag.classList.remove('active');
        overlay.classList.remove('active');
    };

    hamburger.addEventListener("click", function() {

            this.classList.add( "active" );
            header.classList.add('active');
            overlay.classList.add('active');
            mainTag.classList.add('active');
        });

    nav.addEventListener("click", removeActive);

})();
