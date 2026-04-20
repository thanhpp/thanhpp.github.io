document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.tag-btn');
    var items = document.querySelectorAll('.sq-item');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            buttons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var tag = btn.getAttribute('data-tag');

            items.forEach(function (item) {
                if (tag === 'all' || item.getAttribute('data-tag') === tag) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
