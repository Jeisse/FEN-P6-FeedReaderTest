/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Define some variables that will be used through the tests 
    /* feeds definitions, the allFeeds variable in our application. 
    */ 
    var allFeedsLength = allFeeds.length,
                 $body = $('body'),
                 entries_before,
                 entries_after;

    /* First test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object 
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL and is not empty', function () {
            allFeeds.forEach(function(entry) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            });
        });

        /* loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name and is not empty', function () {
            allFeeds.forEach(function(entry) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            });
        });
    });


    /* Second test suite: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* 'Is hidden by default' ensures the menu element is hidden by default,
         *  looking if the body tag has the class 'menu-hidden'.
         */
        it('Is hidden by default', function () {
            expect($body.hasClass('menu-hidden')).toEqual(true);
        });

        /* 'Changes visibility when menu icon is clicked' ensures that the menu changes visibility
         * when the menu icon is clicked: the menu is displayed when
         * clicked the first time, and is hidden when clicked again.
         */
        it('Changes visibility when menu icon is clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($body.hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Third test suite, about the initial entries */
    describe('Initial Entries', function () {

        /* First we call a function to do an async request.
         * This way we ensure that data is loaded before we can test the results.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* When we have alreaded loaded the function, we test to ensure that
         * the loadFeed function has at least a single .entry elemente within
         * the .feed container, ones completed its work.
         */
        it('has an .entry element after loading', function () {
            var entry = $('.feed .entry')[0];
            expect(entry).toBeGreaterThan('');
        });
    });
    
    /* Fourth test suite for the new feeds loaded */
    describe('New Feed Selection', function () {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         */
        beforeEach(function (done) {
            $('.feed').empty();

            /* First is call the feed and save the titles in the 'entries_before' variable,
             * which will use to compare later with the second loaded feed,
             * then use 'beforeEach' to load this one before starting any comparison.
             * We put done() because it's asyncrhonous, then the entries_before
             * will wait to loadFeed to finish.
             */
            loadFeed(0, function () {
                entries_before = $('.feed').find("h2").text();
                console.log("entries before: " + entries_before);
                done();
            });
        });

        /* Here is load the feed again. This time is save the titles in the
         * 'entries_after' variable, and then we will compare them with 'entries_before'.
         * Since this is the same feed, it is asyncrhonous and we need to use done(),
         * to ensure that the feed has loaded enterily before comparing variables.
         */
        it('changes the content when new feed is loaded', function (done) {
            loadFeed(1, function () {
                entries_after = $('.feed').find("h2").text();
                console.log("entries after: " + entries_after);
                expect(entries_before).not.toEqual(entries_after);
                done();
            });
        });
    });
}());
